// createAdmin.js

require('dotenv').config(); // <-- Load .env first
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path if needed

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI not found in .env file');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await User.findOne({ email: 'admin@urbanhome.com' });
    if (existing) {
      console.log('✅ Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin1234', 10);

    const admin = new User({
      fullName: 'Admin User',
      email: 'admin@urbanhome.com',
      password: hashedPassword,
      userType: 'admin',
      nationalID: 'ADMIN12345',
      emailVerified: true,
      isBlocked: false,
    });

    await admin.save();
    console.log('🎉 Admin created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
