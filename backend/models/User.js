const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  userType: { 
    type: String, 
    enum: ['renter', 'buyer', 'owner', 'partialOwner', 'admin', 'referrer'], 
    default: 'renter' 
  },

  nationalID: {
    type: String,
    required: false // Ghana card, license, or visa
  },

  accountStatus: {
    type: String,
    enum: ['active', 'pendingDeletion', 'deleted'],
    default: 'active'
  },

  emailToken: String,             // For email verification
  emailVerified: { type: Boolean, default: false },

  resetToken: String,             // For password reset
  resetTokenExpire: Date,

  isBlocked: { type: Boolean, default: false }, // Admin control

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
