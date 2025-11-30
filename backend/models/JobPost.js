const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory', required: true },
  description: String,
  location: String,
  rate: String,
  schedule: String,
  status: { type: String, enum: ['active', 'paused', 'filled', 'expired'], default: 'active' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  views: { type: Number, default: 0 },
  postedAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('JobPost', jobPostSchema);
