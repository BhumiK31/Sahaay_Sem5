require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/User');
const JobPost = require('./models/JobPost');
const ServiceCategory = require('./models/ServiceCategory');
const Application = require('./models/Application');
const Message = require('./models/Message');
const Review = require('./models/Review');

async function testAllModels() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);

    // Create test user
    const user = new User({
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      password: 'hashedpassword',
      role: 'family',
      location: 'Test City'
    });
    await user.save();
    console.log("User created:", user);

    // Create or find Service Category
    let category = await ServiceCategory.findOne({ name: 'Housekeeping' });
    if (!category) {
      category = new ServiceCategory({ name: 'Housekeeping' });
      await category.save();
    }
    console.log("Category used:", category);

    // Create job post
    const job = new JobPost({
      creator: user._id,
      title: 'Test Job',
      category: category._id,
      description: 'Test job description',
      location: 'Test City',
      rate: '$15/hour',
      schedule: 'Mon-Fri (9am-5pm)'
    });
    await job.save();
    console.log("Job post created:", job);

    // Create application
    const application = new Application({
      job: job._id,
      applicant: user._id,
      status: 'applied'
    });
    await application.save();
    console.log("Application created:", application);

    // Create message
    const message = new Message({
      sender: user._id,
      receiver: user._id,  // Self message for test
      text: 'Hello! This is a test message.'
    });
    await message.save();
    console.log("Message created:", message);

    // Create review
    const review = new Review({
      reviewer: user._id,
      reviewee: user._id,
      job: job._id,
      rating: 5,
      comment: 'Great job!'
    });
    await review.save();
    console.log("Review created:", review);

    // Close connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error during tests:", err);
  }
}

testAllModels();
