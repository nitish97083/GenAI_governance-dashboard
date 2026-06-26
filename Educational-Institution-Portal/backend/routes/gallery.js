const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM gallery');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching gallery',
      error: err.message 
    });
  }
});

// Get gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM gallery WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gallery item not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching gallery item',
      error: err.message 
    });
  }
});

// Create gallery item
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { title, description, image, category, eventDate, uploadedBy } = req.body;

    await executeQuery(
      `INSERT INTO gallery (id, title, description, image, category, event_date, uploaded_by, created_at, updated_at)
       VALUES (gallery_seq.NEXTVAL, :title, :description, :image, :category, :eventDate, :uploadedBy, SYSDATE, SYSDATE)`,
      {
        title: title,
        description: description,
        image: image,
        category: category,
        eventDate: eventDate,
        uploadedBy: uploadedBy
      }
    );

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating gallery item',
      error: err.message 
    });
  }
});

// Update gallery item
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { title, description, category } = req.body;

    await executeQuery(
      `UPDATE gallery SET title = :title, description = :description, category = :category, updated_at = SYSDATE
       WHERE id = :id`,
      {
        title: title,
        description: description,
        category: category,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Gallery item updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating gallery item',
      error: err.message 
    });
  }
});

// Delete gallery item
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM gallery WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting gallery item',
      error: err.message 
    });
  }
});

module.exports = router;
