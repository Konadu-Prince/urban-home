const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const logActivity = require('../utils/logActivity');
const User = require('../models/User');

// Upload single document for verification
router.post('/upload', auth, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const documentPath = req.file.path;

    // Save to user record
    const user = await User.findByIdAndUpdate(
    req.user.id,
    { 
        verificationDocument: documentPath,
        verificationStatus: 'pending' 
    },
    { new: true }
    );


    // Log activity
    await logActivity(req.user.id, 'UPLOAD_DOCUMENT', `Uploaded document ${req.file.originalname}`);

    res.status(200).json({
      message: 'Document uploaded and saved successfully',
      path: documentPath,
      user
    });

  } catch (err) {
    console.error('Document upload error:', err.message);
    res.status(500).json({ message: 'Server error during document upload' });
  }
});

module.exports = router;
