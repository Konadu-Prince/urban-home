// routes/admin.js

// routes/admin.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const logActivity = require('../utils/logActivity');

// BLOCK USER
router.put('/block-user/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    await logActivity(req.user.id, 'BLOCK_USER', `Blocked user ${user.email}`);

    res.status(200).json({ message: 'User blocked successfully', user });

  } catch (err) {
    console.error('Error blocking user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// UNBLOCK USER
router.put('/unblock-user/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    await logActivity(req.user.id, 'UNBLOCK_USER', `Unblocked user ${user.email}`);

    res.json({ message: 'User unblocked successfully', user });

  } catch (err) {
    console.error('Error unblocking user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET ALL BLOCKED USERS
router.get('/blocked-users', auth, isAdmin, async (req, res) => {
  try {
    const blockedUsers = await User.find({ isBlocked: true }).select('-password');
    res.json({ blockedUsers });
  } catch (err) {
    console.error('Error fetching blocked users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
