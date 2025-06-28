// createAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // adjust if path is different

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB ✅');

    const existing = await User.findOne({ email: 'admin123@urbanhome.com' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('AdminPassword123', 10);

    const admin = new User({
      fullName: 'Admin User123',
      email: 'admin123@urbanhome.com',
      password: hashedPassword,
      userType: 'admin',
      nationalID: 'ADMIN12345',
      emailVerified: true,
      accountStatus: 'active',
      verificationStatus: 'approved',
      isBlocked: false
    });

    await admin.save();
    console.log('✅ Admin created successfully');
    process.exit();

  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
