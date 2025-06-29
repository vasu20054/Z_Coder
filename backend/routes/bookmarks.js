const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Problem = require('../models/Problem');

// Add a bookmark
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user;
  const { problemId } = req.body;

  if (!problemId) {
    return res.status(400).json({ message: 'Problem ID is required' });
  }

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const user = await User.findById(userId);
    if (!user.bookmarks.includes(problemId)) {
      user.bookmarks.push(problemId);
      await user.save();
    }

    res.json({ message: 'Problem bookmarked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove a bookmark
router.delete('/:problemId', authMiddleware, async (req, res) => {
  const userId = req.user;
  const { problemId } = req.params;

  try {
    const user = await User.findById(userId);
    user.bookmarks = user.bookmarks.filter(id => id.toString() !== problemId);
    await user.save();
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookmarks of logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
