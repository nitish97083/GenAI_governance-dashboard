const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');

// Get all admissions
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM admissions');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching admissions',
      error: err.message 
    });
  }
});

// Get admission by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM admissions WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admission not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching admission',
      error: err.message 
    });
  }
});

// Create admission (Public)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, dateOfBirth, qualifications, preferredDepartment, marks } = req.body;

    await executeQuery(
      `INSERT INTO admissions (id, first_name, last_name, email, phone, date_of_birth, qualifications, preferred_department, application_date, status, marks, created_at, updated_at)
       VALUES (admissions_seq.NEXTVAL, :firstName, :lastName, :email, :phone, :dateOfBirth, :qualifications, :preferredDepartment, SYSDATE, 'pending', :marks, SYSDATE, SYSDATE)`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: dateOfBirth,
        qualifications: qualifications,
        preferredDepartment: preferredDepartment,
        marks: marks
      }
    );

    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting admission application',
      error: err.message 
    });
  }
});

// Update admission status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    await executeQuery(
      `UPDATE admissions SET status = :status, updated_at = SYSDATE
       WHERE id = :id`,
      {
        status: status,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Admission updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating admission',
      error: err.message 
    });
  }
});

// Delete admission
router.delete('/:id', async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM admissions WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Admission deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting admission',
      error: err.message 
    });
  }
});

module.exports = router;
