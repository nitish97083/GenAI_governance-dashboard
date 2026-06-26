const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all students
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM students');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching students',
      error: err.message 
    });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM students WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching student',
      error: err.message 
    });
  }
});

// Create student
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { userId, enrollmentNumber, departmentId, semesterNumber, gpa, dateOfAdmission, status } = req.body;

    const result = await executeQuery(
      `INSERT INTO students (id, user_id, enrollment_number, department_id, semester_number, gpa, date_of_admission, status, created_at, updated_at)
       VALUES (students_seq.NEXTVAL, :userId, :enrollmentNumber, :departmentId, :semesterNumber, :gpa, :dateOfAdmission, :status, SYSDATE, SYSDATE)`,
      {
        userId: userId,
        enrollmentNumber: enrollmentNumber,
        departmentId: departmentId,
        semesterNumber: semesterNumber,
        gpa: gpa,
        dateOfAdmission: dateOfAdmission,
        status: status || 'active'
      }
    );

    res.status(201).json({
      success: true,
      message: 'Student created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating student',
      error: err.message 
    });
  }
});

// Update student
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { semesterNumber, gpa, status } = req.body;

    await executeQuery(
      `UPDATE students SET semester_number = :semesterNumber, gpa = :gpa, status = :status, updated_at = SYSDATE
       WHERE id = :id`,
      {
        semesterNumber: semesterNumber,
        gpa: gpa,
        status: status,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Student updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating student',
      error: err.message 
    });
  }
});

// Delete student
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM students WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting student',
      error: err.message 
    });
  }
});

module.exports = router;
