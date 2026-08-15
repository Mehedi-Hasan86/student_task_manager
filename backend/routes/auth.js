/**
 * Authentication routes — /api/auth.
 *
 * register  : create an account (bcrypt-hashed password) and issue a JWT.
 * login     : verify credentials and issue a JWT.
 * me        : return the profile of the authenticated user (JWT required).
 * firebase  : sync a Firebase (Google) authenticated identity with the
 *             local user store and issue a JWT.
 */
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

/** Signs a JWT for the given user id (30-day expiry). */
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

/** POST /api/auth/register — create a new account. */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** POST /api/auth/login — authenticate with email + password. */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** GET /api/auth/me — current user profile (requires JWT). */
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

/** POST /api/auth/firebase — Google (Firebase) identity sync. */
router.post('/firebase', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Reuse the account if one already exists for this email.
    let user = await User.findOne({ email });
    if (!user) {
      // Create user with a secure random password since they authenticate via Google Firebase
      const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: randomPassword,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;