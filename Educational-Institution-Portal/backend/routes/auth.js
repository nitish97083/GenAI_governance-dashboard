const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { executeQuery } = require('../database/connection');
const config = require('../config');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Login
router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password required' 
      });
    }

    // Query user from database
    const result = await executeQuery(
      'SELECT * FROM users WHERE email = :email',
      { email: email.toLowerCase() }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const user = result.rows[0];

    // Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.ID, email: user.EMAIL, role: user.ROLE },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.ID,
        name: user.NAME,
        email: user.EMAIL,
        role: user.ROLE
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in',
      error: err.message 
    });
  }
});

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('phone').optional().trim(),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
      .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
      .matches(/[0-9]/).withMessage('Password must contain a number')
      .matches(/[^A-Za-z0-9]/).withMessage('Password must contain a special character'),
    body('role').optional().isIn(['student', 'admin', 'faculty']).withMessage('Role must be student, admin, or faculty')
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password required' 
      });
    }

    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT * FROM users WHERE email = :email',
      { email: email.toLowerCase() }
    );

    if (existingUser.rows && existingUser.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user with hashed password
    await executeQuery(
      `INSERT INTO users (id, name, email, phone, password, role, created_at, updated_at)
       VALUES (users_seq.NEXTVAL, :name, :email, :phone, :password, :role, SYSDATE, SYSDATE)`,
      {
        name: name,
        email: email.toLowerCase(),
        phone: phone || null,
        password: hashedPassword,
        role: role || 'student'
      }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error registering',
      error: err.message 
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    
    const result = await executeQuery(
      'SELECT ID, NAME, EMAIL, ROLE FROM users WHERE id = :id',
      { id: decoded.id }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = result.rows[0];
    res.json({
      success: true,
      data: {
        id: user.ID,
        name: user.NAME,
        email: user.EMAIL,
        role: user.ROLE
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user',
      error: err.message 
    });
  }
});

module.exports = router;
