const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['family', 'caregiver', 'admin', 'student'], required: true },

  // Add comma below!
  viewedCaregivers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],     // <-- COMMA HERE!

  phone: String,
  location: String,
  profileImage: String,
  govtIdProof: String, // for file uploads
  address: String,
  city: String,
  bio: String,
  moreRequirements: String,
  profilePhotoUrl: String, // Optionally store web-accessible URLs
  idProofUrl: String,      // Optionally store web-accessible URLs
  verified: { type: Boolean, default: false },
  verificationCode: String,
  profileCompletion: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  skills: [String],
  availability: String,
  
  // ✅ NEW: Caregiver Profile Fields
  caregiverProfile: {
    experience: { type: Number },
    specializations: [String],
    hourlyRate: { type: Number },
    availability: {
      days: [String],
      timeSlots: [String],
      fullTime: Boolean,
      partTime: Boolean
    },
    documents: [{
      name: String,
      url: String,
      verified: { type: Boolean, default: false },
      uploadDate: { type: Date, default: Date.now }
    }],
    completedJobs: { type: Number, default: 0 },
    profileViews: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model('User', userSchema);
