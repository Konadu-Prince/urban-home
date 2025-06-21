const ActivityLog = require('../models/ActivityLog');

const logActivity = async (userId, action, description = '') => {
  try {
    const log = new ActivityLog({ userId, action, description });
    await log.save();
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};

module.exports = logActivity;
