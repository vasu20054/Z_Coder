const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('bookmarks');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user);
});

router.post('/bookmark/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const problemId = req.params.id;

  const index = user.bookmarks.indexOf(problemId);
  if (index === -1) {
    user.bookmarks.push(problemId);
  } else {
    user.bookmarks.splice(index, 1);
  }

  await user.save();
  await user.populate('bookmarks', 'title slug');
  res.json({ bookmarks: user.bookmarks });
});

module.exports = router;
