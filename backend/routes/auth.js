//auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// =====================
// Email Transport Setup
// =====================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


// in auth.js
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});

// =====================
// Register User
// =====================
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('userType', 'User type is required').notEmpty(),
    check('nationalID', 'National ID is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fullName, email, password, userType, nationalID } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already in use' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const emailToken = crypto.randomBytes(32).toString('hex');

      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        userType,
        nationalID,
        emailToken,
        emailVerified: false,
      });

      await newUser.save();

      const verifyUrl = `http://localhost:3000/verify-email/${emailToken}`;
      await transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `Click <a href="${verifyUrl}">here</a> to verify your account.`,
      });

      res.status(201).json({ message: 'User registered successfully. Check your email to verify.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
);

// =====================
// Verify Email
// =====================
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.emailVerified = true;
    user.emailToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during email verification' });
  }
});

// =====================
// Login
// =====================
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      if (!user.emailVerified) return res.status(403).json({ message: 'Email not verified' });
      if (user.isBlocked) return res.status(403).json({ message: 'You are blocked by the administrator' });

      const token = jwt.sign(
        { id: user._id, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
      );

      res.status(200).json({
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          userType: user.userType,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error during login' });
    }
  }
);

// =====================
// Forgot Password
// =====================
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    res.json({ message: 'Password reset link sent to email' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during password reset request' });
  }
});

// =====================
// Reset Password
// =====================
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Token expired or invalid' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during password reset' });
  }
});

module.exports = router;
