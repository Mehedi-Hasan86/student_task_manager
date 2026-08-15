const { connectDB } = require('../lib/db');
const User = require('../lib/models/User');
const { protect } = require('../lib/middleware/auth');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

module.exports = async (req, res) => {
  await connectDB();

  const { method, url, body, headers } = req;
  const path = url.replace('/api/auth', '') || '/';

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Helper to parse body for GET requests
  const getBody = () => {
    if (method === 'GET' || method === 'DELETE') return {};
    return body;
  };

  try {
    // Register
    if (method === 'POST' && path === '/register') {
      const { name, email, password } = getBody();

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const user = await User.create({ name, email, password });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    // Login
    if (method === 'POST' && path === '/login') {
      const { email, password } = getBody();

      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    // Get current user
    if (method === 'GET' && path === '/me') {
      // Manual auth check
      let token;
      if (headers.authorization && headers.authorization.startsWith('Bearer')) {
        token = headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }

    // Firebase login
    if (method === 'POST' && path === '/firebase') {
      const { name, email } = getBody();

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      let user = await User.findOne({ email });
      if (!user) {
        const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
        user = await User.create({
          name: name || email.split('@')[0],
          email,
          password: randomPassword,
        });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    return res.status(404).json({ message: 'Route not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};