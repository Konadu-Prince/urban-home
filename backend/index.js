const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const verifyRoutes = require('./routes/verify');
const adminRoutes = require('./routes/admin');
const logRoutes = require('./routes/adminLogs');  // logs separated

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin-logs', logRoutes);  // distinct path for logs
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Urban Home Backend Running!');
});

// DB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
