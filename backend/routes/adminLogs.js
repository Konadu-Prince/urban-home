// routes/adminLogs.js


// routes/adminLogs.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');

// GET all activity logs (admin only)
router.get('/logs', auth, async (req, res) => {
  // Ensure only admins can view logs
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    // Fetch logs with user info, sorted by latest first
    const logs = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .populate('userId', 'email fullName');

    res.json(logs);
  } catch (err) {
    console.error('Failed to fetch logs:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
