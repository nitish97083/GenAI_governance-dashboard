const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

// Get all contact messages
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const result = await executeQuery('SELECT * FROM contact_messages ORDER BY created_at DESC');
    
    res.json({
      success: true,
      data: result.rows || []
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contact messages',
      error: err.message 
    });
  }
});

// Get contact message by ID
router.get('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const result = await executeQuery(
      'SELECT * FROM contact_messages WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact message not found' 
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contact message',
      error: err.message 
    });
  }
});

// Submit contact message (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, subject, and message are required' 
      });
    }

    await executeQuery(
      `INSERT INTO contact_messages (id, name, email, phone, subject, message, status, created_at, updated_at)
       VALUES (contact_messages_seq.NEXTVAL, :name, :email, :phone, :subject, :message, 'new', SYSDATE, SYSDATE)`,
      {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
      }
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error sending message',
      error: err.message 
    });
  }
});

// Update contact message status
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { status } = req.body;

    await executeQuery(
      `UPDATE contact_messages SET status = :status, updated_at = SYSDATE
       WHERE id = :id`,
      {
        status: status,
        id: parseInt(req.params.id)
      }
    );

    res.json({
      success: true,
      message: 'Message updated successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating message',
      error: err.message 
    });
  }
});

// Delete contact message
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    await executeQuery(
      'DELETE FROM contact_messages WHERE id = :id',
      { id: parseInt(req.params.id) }
    );

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting message',
      error: err.message 
    });
  }
});

module.exports = router;
