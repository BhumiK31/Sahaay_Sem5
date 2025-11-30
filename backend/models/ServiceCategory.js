const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tags: [String],
});

module.exports = mongoose.model('ServiceCategory', categorySchema);
