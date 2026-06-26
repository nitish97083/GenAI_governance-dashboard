const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { executeQuery } = require('../database/connection');
const config = require('../config');

// Login
router.post('/login', async (req, res) => {
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

    // Verify password (Note: In production, implement proper password hashing)
    if (user.PASSWORD !== password) {
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
router.post('/register', async (req, res) => {
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

    // Insert new user
    await executeQuery(
      `INSERT INTO users (id, name, email, phone, password, role, created_at, updated_at)
       VALUES (users_seq.NEXTVAL, :name, :email, :phone, :password, :role, SYSDATE, SYSDATE)`,
      {
        name: name,
        email: email.toLowerCase(),
        phone: phone || null,
        password: password,
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
