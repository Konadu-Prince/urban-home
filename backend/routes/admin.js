const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const logActivity = require('../utils/logActivity');
const sendEmail = require('../utils/sendEmail');

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
    await sendEmail(
      user.email,
      'Account Blocked',
      `<p>Hello ${user.fullName},</p><p>Your account has been <strong>blocked</strong> by the administrator. Contact support for help.</p>`
    );

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
    await sendEmail(
      user.email,
      'Account Unblocked',
      `<p>Hello ${user.fullName},</p><p>Your account has been <strong>unblocked</strong>. You now have full access to the platform.</p>`
    );

    res.json({ message: 'User unblocked successfully', user });
  } catch (err) {
    console.error('Error unblocking user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// APPROVE VERIFICATION
router.put('/verify-user/:id/approve', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: 'approved' },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    await logActivity(req.user.id, 'APPROVE_VERIFICATION', `Approved verification for ${user.email}`);
    await sendEmail(
      user.email,
      'Verification Approved',
      `<p>Hello ${user.fullName},</p><p>Your ID verification has been <strong>approved</strong>. You now have full access to our platform.</p>`
    );

    res.json({ message: 'User verification approved', user });
  } catch (err) {
    console.error('Error approving verification:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// REJECT VERIFICATION
router.put('/verify-user/:id/reject', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: 'rejected' },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    await logActivity(req.user.id, 'REJECT_VERIFICATION', `Rejected verification for ${user.email}`);
    await sendEmail(
      user.email,
      'Verification Rejected',
      `<p>Hello ${user.fullName},</p><p>Your ID verification has been <strong>rejected</strong>. Please upload a valid document again.</p>`
    );

    res.json({ message: 'User verification rejected', user });
  } catch (err) {
    console.error('Error rejecting verification:', err.message);
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
