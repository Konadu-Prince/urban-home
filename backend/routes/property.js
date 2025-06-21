//property.js
const express = require('express');
const Property = require('../models/Property');
const router = express.Router();
const auth = require('../middleware/auth');

// =============================
// ADD A PROPERTY (Protected)
// =============================
router.post('/add', auth, async (req, res) => {
  const { title, description, type, price, location, images, roomsTotal, roomsAvailable } = req.body;

  try {
    const property = new Property({
      ownerId: req.user.id, // Set by auth middleware
      title,
      description,
      type,
      price,
      location,
      images,
      roomsTotal,
      roomsAvailable
    });

    await property.save();
    res.status(201).json({ message: 'Property added successfully', property });

  } catch (err) {
    console.error('Error adding property:', err.message);
    res.status(500).json({ error: 'Server error while adding property' });
  }
});

// =============================
// GET ALL PROPERTIES
// =============================
router.get('/all', async (req, res) => {
  try {
    const properties = await Property.find().populate('ownerId', 'fullName email');
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err.message);
    res.status(500).json({ error: 'Server error while fetching properties' });
  }
});

module.exports = router;

