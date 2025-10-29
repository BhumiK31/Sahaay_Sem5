const mongoose = require('mongoose');
const JobPost = require('../models/JobPost');
const User = require('../models/User');

async function cleanupOrphanedJobs() {
  try {
    // Find admin or create a system user
    let systemUser = await User.findOne({ role: 'admin' });
    if (!systemUser) {
      systemUser = await User.create({
        name: 'System Admin',
        email: 'system@sahaay.com',
        password: 'temp123',
        role: 'admin',
        isVerified: true
      });
    }

    // Update orphaned jobs
    const result = await JobPost.updateMany(
      { creator: null },
      { $set: { creator: systemUser._id } }
    );

    console.log(`✅ Updated ${result.modifiedCount} orphaned jobs`);
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
  }
}

module.exports = { cleanupOrphanedJobs };
