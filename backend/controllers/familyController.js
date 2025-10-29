const User = require('../models/User');
const JobPost = require('../models/JobPost');
const Booking = require('../models/Booking');

// ===========================
// DASHBOARD (FULLY DYNAMIC)
// ===========================
exports.getFamilyDashboard = async (req, res) => {
  try {
    const family = await User.findById(req.user.id).select('-password');
    if (!family) return res.status(404).json({ message: 'Family not found' });

    // Get all jobs posted by this family
    const allJobs = await JobPost.find({ creator: req.user.id })
      .populate('applications.caregiver', 'name rating caregiverProfile')
      .sort({ postedAt: -1 });

    // ---- DYNAMIC STATISTICS ----
    const stats = {
      caregiverViewed: family.viewedCaregivers ? family.viewedCaregivers.length : 0,
      applicationsReceived: allJobs.reduce((sum, job) => sum + job.applications.length, 0),
      ongoingCaregivers: allJobs.reduce((sum, job) =>
        sum + job.applications.filter(app => app.status === 'accepted').length, 0
      ),
      interviewsScheduled: allJobs.reduce((sum, job) =>
        sum + job.applications.filter(app => app.status === 'interview').length, 0
      )
    };

    // ---- RECENT APPLICANTS ----
    const recentApplicants = allJobs
      .flatMap(job =>
        job.applications.map(app => ({
          name: app.caregiver?.name || 'Unknown',
          rating: app.caregiver?.rating || 0,
          experience: `${app.caregiver?.caregiverProfile?.experience || 0} years`,
          status: app.status === 'pending' ? 'Under Review'
                : app.status === 'interview' ? 'Interview Scheduled'
                : app.status === 'accepted' ? 'Hired'
                : 'Reviewed',
          jobId: job._id,
          jobTitle: job.title,
          appliedAt: app.appliedAt
        }))
      )
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
      .slice(0, 5);

    // ---- AGGREGATE BOOKINGS FOR DYNAMIC AMOUNT ----
    const today = new Date();
    today.setHours(0,0,0,0);
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - today.getDay());
    weekAgo.setHours(0,0,0,0);
    const monthAgo = new Date(today.getFullYear(), today.getMonth(), 1);

    // Earnings Today, Week, Month
    const [todayBookings, weekBookings, monthBookings] = await Promise.all([
      Booking.find({ familyId: req.user.id, date: { $gte: today } }),
      Booking.find({ familyId: req.user.id, date: { $gte: weekAgo } }),
      Booking.find({ familyId: req.user.id, date: { $gte: monthAgo } }),
    ]);

    const totalToday = todayBookings.reduce((sum, b) => sum + b.amount, 0);
    const totalWeek = weekBookings.reduce((sum, b) => sum + b.amount, 0);
    const totalMonth = monthBookings.reduce((sum, b) => sum + b.amount, 0);

    // ---- AGGREGATE WEEKLY HOURS ----
    let weeklyData = [
      { day: "Mon", hours: 0 },
      { day: "Tue", hours: 0 },
      { day: "Wed", hours: 0 },
      { day: "Thu", hours: 0 },
      { day: "Fri", hours: 0 },
      { day: "Sat", hours: 0 },
      { day: "Sun", hours: 0 },
    ];

    weekBookings.forEach(booking => {
      const dayIdx = new Date(booking.date).getDay(); // Sunday=0 ... Saturday=6
      const mappedIdx = dayIdx === 0 ? 6 : dayIdx - 1; // Map so Mon=0, Sun=6
      weeklyData[mappedIdx].hours += booking.hours;
    });

    // ---- RECENT CAREGIVERS ----
    const recentCaregivers = await User.find({
      role: 'caregiver',
      'caregiverProfile.isAvailable': true
    })
      .select('name caregiverProfile rating location')
      .limit(6)
      .lean();

    const formattedCaregivers = recentCaregivers.map(caregiver => ({
      id: caregiver._id,
      name: caregiver.name,
      photo: caregiver.name?.split(' ').map(n => n[0]).join('') || 'CG',
      rating: caregiver.rating || 0,
      experience: `${caregiver.caregiverProfile?.experience || 0} years`,
      skills: caregiver.caregiverProfile?.skills || ['Elder Care', 'Medical Support'],
      location: caregiver.location || 'Location not specified',
      rate: caregiver.caregiverProfile?.hourlyRate
        ? `₹${caregiver.caregiverProfile.hourlyRate * 160}/month`
        : '₹Contact for rate',
      availability: caregiver.caregiverProfile?.isAvailable ? 'Available Now' : 'Busy'
    }));

    // ---- RESPONSE ----
    res.json({
      family: {
        name: family.name,
        email: family.email,
        verified: family.isVerified || false,
        profileCompletion: calculateProfileCompletion(family)
      },
      stats,
      earnings: {
        today: totalToday,
        week: totalWeek,
        month: totalMonth,
      },
      weeklyData,
      recentApplicants,
      recentCaregivers: formattedCaregivers
    });

  } catch (error) {
    console.error('Family dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================== HELPER FUNCTION ====================
function calculateProfileCompletion(family) {
  let completion = 0;
  if (family.name) completion += 20;
  if (family.email) completion += 20;
  if (family.location) completion += 20;
  if (family.phone) completion += 20;
  if (family.familyProfile?.requirements) completion += 20;
  return completion;
}

// ===========================
// PROFILE MANAGEMENT
// ===========================
exports.getFamilyProfile = async (req, res) => {
  try {
    const family = await User.findById(req.user.id).select('-password');
    if (!family) return res.status(404).json({ message: 'Family not found' });

    res.json({ family });
  } catch (error) {
    console.error('Get family profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFamilyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const family = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!family) return res.status(404).json({ message: 'Family not found' });

    res.json({ 
      message: 'Profile updated successfully', 
      family 
    });
  } catch (error) {
    console.error('Update family profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// CAREGIVER SEARCH
// ===========================
exports.searchCaregivers = async (req, res) => {
  try {
    const { location, skills, experience, availability } = req.query;
    
    let filter = { role: 'caregiver' };
    
    if (location && location !== 'all') {
      filter.location = new RegExp(location, 'i');
    }
    
    if (skills && skills !== 'all') {
      filter['caregiverProfile.skills'] = { $in: [skills] };
    }
    
    if (experience) {
      filter['caregiverProfile.experience'] = { $gte: parseInt(experience) };
    }
    
    if (availability === 'available') {
      filter['caregiverProfile.isAvailable'] = true;
    }

    const caregivers = await User.find(filter)
      .select('name caregiverProfile rating location')
      .limit(20)
      .lean();

    const formattedCaregivers = caregivers.map(caregiver => ({
      id: caregiver._id,
      name: caregiver.name,
      photo: caregiver.name?.split(' ').map(n => n[0]).join('') || 'CG',
      rating: caregiver.rating || 0,
      experience: `${caregiver.caregiverProfile?.experience || 0} years`,
      skills: caregiver.caregiverProfile?.skills || ['Elder Care'],
      location: caregiver.location || 'Location not specified',
      rate: caregiver.caregiverProfile?.hourlyRate 
        ? `₹${caregiver.caregiverProfile.hourlyRate * 160}/month`
        : '₹Contact for rate',
      availability: caregiver.caregiverProfile?.isAvailable ? 'Available Now' : 'Busy'
    }));

    res.json({ caregivers: formattedCaregivers });
  } catch (error) {
    console.error('Search caregivers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCaregiverProfile = async (req, res) => {
  try {
    const { caregiverId } = req.params;
    
    const caregiver = await User.findOne({ 
      _id: caregiverId, 
      role: 'caregiver' 
    }).select('-password');
    
    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    // Track that family viewed this caregiver (for stats)
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { viewedCaregivers: caregiverId } }
    );

    res.json({ caregiver });
  } catch (error) {
    console.error('Get caregiver profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// JOB MANAGEMENT
// ===========================
exports.postJob = async (req, res) => {
  try {
    const { title, description, location, requirements, salary, startDate, category } = req.body;
    
    const newJob = new JobPost({
      title,
      description,
      location,
      category,
      requirements: requirements || [],
      salary,
      startDate,
      creator: req.user.id,
      status: 'open',
      postedAt: new Date()
    });

    await newJob.save();
    
    res.status(201).json({ 
      message: 'Job posted successfully', 
      job: newJob 
    });
  } catch (error) {
    console.error('Post job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyPostedJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find({ creator: req.user.id })
      .populate('applications.caregiver', 'name rating')
      .sort({ postedAt: -1 });
    
    res.json({ jobs });
  } catch (error) {
    console.error('Get posted jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobPost.findOne({ _id: jobId, creator: req.user.id })
      .populate('applications.caregiver', 'name rating caregiverProfile');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ job });
  } catch (error) {
    console.error('Get job details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updates = req.body;
    
    const job = await JobPost.findOneAndUpdate(
      { _id: jobId, creator: req.user.id },
      { $set: updates },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await JobPost.findOneAndDelete({ _id: jobId, creator: req.user.id });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const job = await JobPost.findOne({ _id: jobId, creator: req.user.id })
      .populate('applications.caregiver', 'name rating caregiverProfile location');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ applications: job.applications });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body; // 'pending', 'interview', 'accepted', 'rejected'
    
    const job = await JobPost.findOne({
      'applications._id': applicationId,
      creator: req.user.id
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    const application = job.applications.id(applicationId);
    application.status = status;
    
    await job.save();
    
    res.json({ message: 'Application status updated', application });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
