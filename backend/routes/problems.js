const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// GET all problems
router.get('/', async (req, res) => {
  const problems = await Problem.find({});
  res.json(problems);
});

// GET problem by slug
router.get('/:slug', async (req, res) => {
  const problem = await Problem.findOne({ slug: req.params.slug });
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
});

module.exports = router;
