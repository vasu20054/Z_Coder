const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  input: String,
  output: String,
  constraints: { type: [String], default: [] },
  tags: [String]
});

module.exports = mongoose.model('Problem', problemSchema);
