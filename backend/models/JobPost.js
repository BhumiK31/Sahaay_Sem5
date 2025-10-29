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
  
  // ✅ NEW: Direct Applications Array (for caregiver dashboard)
  applications: [{
    caregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'review', 'interview', 'accepted', 'rejected'],
      default: 'pending'
    },
    coverLetter: String,
    proposedRate: Number
  }],
  
  // ✅ NEW: Enhanced job details for caregiver view
  requirements: [String],
  responsibilities: [String],
  urgency: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  }
});

module.exports = mongoose.model('JobPost', jobPostSchema);
