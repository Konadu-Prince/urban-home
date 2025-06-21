//verify.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const logActivity = require('../utils/logActivity');

// Upload single document for verification
router.post('/upload', auth, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log activity
    await logActivity(req.user.id, 'UPLOAD_DOCUMENT', `Uploaded document ${req.file.originalname}`);

    // Respond with success
    res.status(200).json({
      message: 'Document uploaded successfully',
      path: req.file.path
    });

  } catch (err) {
    console.error('Document upload error:', err.message);
    res.status(500).json({ message: 'Server error during document upload' });
  }
});

module.exports = router;
