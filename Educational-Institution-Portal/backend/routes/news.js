const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all news
router.get('/', async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM news ORDER BY publish_date DESC');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching news',
      error: err.message 
    });
  }
});

// Get news by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM news WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'News not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching news',
      error: err.message 
    });
  }
});

// Create news
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { title, content, author, category, featured } = req.body;

    await executeQuery(
      `INSERT INTO news (id, title, content, author, publish_date, category, featured, created_at, updated_at)
       VALUES (news_seq.NEXTVAL, :title, :content, :author, SYSDATE, :category, :featured, SYSDATE, SYSDATE)`,
      {
        title: title,
        content: content,
        author: author,
        category: category,
        featured: featured ? 1 : 0
      }
    );

    res.status(201).json({
      success: true,
      message: 'News created successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error creating news',
      error: err.message 
    });
  }
});

// Update news
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { title, content, category, featured } = req.body;

    await executeQuery(
      `UPDATE news SET title = :title, content = :content, category = :category, featured = :featured, updated_at = SYSDATE
       WHERE id = :id`,
      {
        title: title,
        content: content,
        category: category,
        featured: featured ? 1 : 0,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'News updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating news',
      error: err.message 
    });
  }
});

// Delete news
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM news WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting news',
      error: err.message 
    });
  }
});

module.exports = router;
