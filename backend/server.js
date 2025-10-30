const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Route imports
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const categoryRoutes = require('./routes/categories');
const applicationRoutes = require('./routes/applications');
const messageRoutes = require('./routes/messages');
const reviewRoutes = require('./routes/reviews');
const familyRoutes = require('./routes/family'); // Add this
const paymentRoutes = require("./routes/paymentRoutes");
const bookingRoutes = require('./routes/bookingRoutes');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Register all routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/family', familyRoutes); // Add this line
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
