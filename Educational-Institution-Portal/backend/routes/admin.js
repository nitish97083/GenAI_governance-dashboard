const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { execFile } = require('child_process');
const path = require('path');

// Admin-only endpoint to run DB setup and seed scripts
router.post('/run-setup', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const backendDbDir = path.join(__dirname, '..', 'database');
    const node = process.execPath;
    const setupScript = path.join(backendDbDir, 'setup.js');
    const seedScript = path.join(backendDbDir, 'seed.js');

    // Run setup.js
    execFile(node, [setupScript], { env: process.env }, (err, stdout, stderr) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Setup script failed', error: stderr || err.message });
      }

      // After setup, run seed
      execFile(node, [seedScript], { env: process.env }, (err2, stdout2, stderr2) => {
        if (err2) {
          return res.status(500).json({ success: false, message: 'Seed script failed', error: stderr2 || err2.message });
        }

        return res.json({ success: true, message: 'Setup and seed completed', setupOutput: stdout, seedOutput: stdout2 });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error running setup', error: err.message });
  }
});

module.exports = router;
