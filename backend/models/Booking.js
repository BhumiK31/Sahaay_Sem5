const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caregiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' },
  date: { type: Date, default: Date.now },
  hours: { type: Number, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
