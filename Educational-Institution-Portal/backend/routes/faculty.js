const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all faculty
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM faculty');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching faculty',
      error: err.message 
    });
  }
});

// Get faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM faculty WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Faculty not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching faculty',
      error: err.message 
    });
  }
});

// Create faculty
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, email, phone, departmentId, specialization, qualification, experience, officeRoom, bio, photo } = req.body;

    await executeQuery(
      `INSERT INTO faculty (id, name, email, phone, department_id, specialization, qualification, experience, office_room, bio, photo, created_at, updated_at)
       VALUES (faculty_seq.NEXTVAL, :name, :email, :phone, :departmentId, :specialization, :qualification, :experience, :officeRoom, :bio, :photo, SYSDATE, SYSDATE)`,
      {
        name: name,
        email: email,
        phone: phone,
        departmentId: departmentId,
        specialization: specialization,
        qualification: qualification,
        experience: experience,
        officeRoom: officeRoom,
        bio: bio,
        photo: photo
      }
    );

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating faculty',
      error: err.message 
    });
  }
});

// Update faculty
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { specialization, qualification, experience, officeRoom, bio } = req.body;

    await executeQuery(
      `UPDATE faculty SET specialization = :specialization, qualification = :qualification, experience = :experience, office_room = :officeRoom, bio = :bio, updated_at = SYSDATE
       WHERE id = :id`,
      {
        specialization: specialization,
        qualification: qualification,
        experience: experience,
        officeRoom: officeRoom,
        bio: bio,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Faculty updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating faculty',
      error: err.message 
    });
  }
});

// Delete faculty
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM faculty WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Faculty deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting faculty',
      error: err.message 
    });
  }
});

module.exports = router;
