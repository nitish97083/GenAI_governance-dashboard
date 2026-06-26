const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM courses');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching courses',
      error: err.message 
    });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM courses WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching course',
      error: err.message 
    });
  }
});

// Create course
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { courseName, courseCode, departmentId, facultyId, credits, description, semester, schedule } = req.body;

    await executeQuery(
      `INSERT INTO courses (id, course_name, course_code, department_id, faculty_id, credits, description, semester, schedule, created_at, updated_at)
       VALUES (courses_seq.NEXTVAL, :courseName, :courseCode, :departmentId, :facultyId, :credits, :description, :semester, :schedule, SYSDATE, SYSDATE)`,
      {
        courseName: courseName,
        courseCode: courseCode,
        departmentId: departmentId,
        facultyId: facultyId,
        credits: credits,
        description: description,
        semester: semester,
        schedule: schedule
      }
    );

    res.status(201).json({
      success: true,
      message: 'Course created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating course',
      error: err.message 
    });
  }
});

// Update course
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { courseName, credits, description, schedule } = req.body;

    await executeQuery(
      `UPDATE courses SET course_name = :courseName, credits = :credits, description = :description, schedule = :schedule, updated_at = SYSDATE
       WHERE id = :id`,
      {
        courseName: courseName,
        credits: credits,
        description: description,
        schedule: schedule,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Course updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating course',
      error: err.message 
    });
  }
});

// Delete course
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM courses WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting course',
      error: err.message 
    });
  }
});

module.exports = router;
