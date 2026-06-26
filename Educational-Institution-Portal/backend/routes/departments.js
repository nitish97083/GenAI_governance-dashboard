const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM departments');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching departments',
      error: err.message 
    });
  }
});

// Get department by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM departments WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Department not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching department',
      error: err.message 
    });
  }
});

// Create department
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { departmentName, headName, description, totalFaculty, totalStudents } = req.body;

    await executeQuery(
      `INSERT INTO departments (id, department_name, head_name, description, total_faculty, total_students, created_at, updated_at)
       VALUES (departments_seq.NEXTVAL, :departmentName, :headName, :description, :totalFaculty, :totalStudents, SYSDATE, SYSDATE)`,
      {
        departmentName: departmentName,
        headName: headName,
        description: description,
        totalFaculty: totalFaculty,
        totalStudents: totalStudents
      }
    );

    res.status(201).json({
      success: true,
      message: 'Department created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating department',
      error: err.message 
    });
  }
});

// Update department
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { departmentName, headName, description, totalFaculty, totalStudents } = req.body;

    await executeQuery(
      `UPDATE departments SET department_name = :departmentName, head_name = :headName, description = :description, total_faculty = :totalFaculty, total_students = :totalStudents, updated_at = SYSDATE
       WHERE id = :id`,
      {
        departmentName: departmentName,
        headName: headName,
        description: description,
        totalFaculty: totalFaculty,
        totalStudents: totalStudents,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Department updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating department',
      error: err.message 
    });
  }
});

// Delete department
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM departments WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting department',
      error: err.message 
    });
  }
});

module.exports = router;
