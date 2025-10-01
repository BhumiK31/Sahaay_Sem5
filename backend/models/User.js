const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['family', 'caregiver', 'admin'], required: true },
  phone: String,
  location: String,
  profileImage: String,
  verified: { type: Boolean, default: false },
  profileCompletion: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  skills: [String],
  availability: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);
