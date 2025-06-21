// middleware/isAdmin.js
module.exports = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};
