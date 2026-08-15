/**
 * Authentication middleware.
 *
 * `protect` guards protected routes: it validates the Bearer JWT sent by
 * the frontend, loads the matching user from the database, and attaches
 * it to req.user for downstream handlers. Rejects with 401 otherwise.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Extract the Bearer token from the Authorization header.
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token signature, then load the user from the DB.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch {
    // Invalid / expired token.
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };