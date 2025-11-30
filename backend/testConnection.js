const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to:", mongoose.connection.name);
    const u = await User.findOne({ email: 'pikachutanvi7@gmail.com' });
    console.log("\nUser document:\n", u);
    process.exit();
  })
  .catch(err => console.error("Mongo error:", err));
