const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { authMiddleware, adminOnly };
