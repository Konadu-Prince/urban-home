const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  description: String,

  type: { type: String, enum: ['rent', 'sale'], required: true },

  price: { type: Number, required: true },
  location: { type: String, required: true },

  images: [String], // store as URLs or base64

  roomsTotal: Number,
  roomsAvailable: Number,

  status: {
    type: String,
    enum: ['active', 'sold', 'rented', 'pending'],
    default: 'active'
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
