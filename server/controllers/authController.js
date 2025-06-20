const User = require('../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');



const signup = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '5d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400000, // 1 day
    });

res.status(201).json({ message: 'Signup successful', isAdmin: newUser.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.isAdmin ? 'admin' : 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '5d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400000,
    });

res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};

const getProfile = (req, res) => {
  res.json({ user: req.user });
};



module.exports = {signup, signin, logout, getProfile}