const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, caregiverId, serviceType, startDate, endDate, totalAmount } = req.body;

    const booking = new Booking({
      userId,
      caregiverId,
      serviceType,
      startDate,
      endDate,
      totalAmount
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ message: 'Failed to create booking', error: err.message });
  }
});

// ✅ Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('caregiverId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId').populate('caregiverId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
