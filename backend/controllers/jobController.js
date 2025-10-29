const JobPost = require('../models/JobPost');
const User = require('../models/User');

// Create Job
exports.createJob = async (req, res) => {
  try {
    // ✅ VALIDATION: Ensure creator exists
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'Invalid user session' });
    }

    const jobData = {
      ...req.body,
      creator: req.user._id, // ✅ Always set creator
      postedAt: new Date() // ✅ Always set posting date
    };
    
    const job = new JobPost(jobData);
    await job.save();
    
    res.status(201).json(job);
  } catch (error) {
    console.error('❌ Job creation error:', error);
    res.status(400).json({ message: error.message });
  }
};


// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;
    const jobs = await JobPost.find(filter).populate('creator category');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;   // <-- Use id
    console.log("Fetching job by id:", id);
    const job = await JobPost.findById(id).populate('creator', 'name memberInfo experience preferences');
    console.log("Job found:", job);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobPost.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATED: Caregiver Dashboard (accepts both caregiver and student)
// In controllers/jobController.js

exports.getCaregiverDashboard = async (req, res) => {
  try {
    // Log user info for debugging
    console.log("[CaregiverDashboard] userId from JWT:", req.user.id, "role:", req.user.role);

    // Accept both 'caregiver' and 'student' roles
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find the caregiver by id and role
    const caregiver = await User.findOne({
      _id: req.user.id,
      role: { $in: ['caregiver', 'student'] }
    });

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    // -- Key logic: Find all job posts where this caregiver has applied --
    const jobsWithMyApplications = await JobPost.find({
      'applications.caregiver': { $in: [caregiver._id, caregiver._id.toString()] }
    });

    // Count applied jobs
    const jobsApplied = jobsWithMyApplications.length;

    // Flat array of the user's applications across jobs
    const myApplications = jobsWithMyApplications
      .flatMap(job =>
        job.applications
          .filter(a => a.caregiver.toString() === caregiver._id.toString())
          .map(a => ({
            ...a._doc,
            jobId: job._id,
            jobTitle: job.title,
            jobLocation: job.location,
            status: a.status
          }))
      );

    // Prepare dashboard statistics
    const stats = {
      jobsApplied,
      profileViews: caregiver.caregiverProfile?.profileViews || 0,
      interviews: myApplications.filter(app => app.status === 'interview').length,
      hired: caregiver.caregiverProfile?.completedJobs || 0
    };

    // Get recent jobs for dashboard display
    const recentJobs = await JobPost.find({ status: "active" })
      .populate('creator', 'name')
      .sort({ postedAt: -1 })
      .limit(5);

    const formattedJobs = recentJobs.map(job => ({
      id: job._id,
      title: job.title,
      family: job.creator ? job.creator.name : "Anonymous Family",
      location: job.location,
      rate: job.rate,
      description: job.description,
      postedDate: job.postedAt,
      urgency: job.urgency
    }));

    // Debug Logging
    console.log("jobsWithMyApplications count:", jobsWithMyApplications.length);
    jobsWithMyApplications.forEach(j =>
      console.log("Job:", j.title, "caregivers:", j.applications.map(a => a.caregiver.toString()))
    );

    res.json({
      caregiver: {
        name: caregiver.name,
        isAvailable: caregiver.caregiverProfile?.isAvailable ?? true,
        completion: caregiver.profileCompletion ?? 0,
        rating: caregiver.rating ?? 0
      },
      stats,
      recentJobs: formattedJobs,
      recentApplications: myApplications.slice(0, 5)
    });
  } catch (error) {
    console.error('[CaregiverDashboard] error:', error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ UPDATED: Apply for Job (accepts both caregiver and student)
exports.applyForJob = async (req, res) => {
  try {
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { coverLetter, experience, availability, proposedRate } = req.body;
    const job = await JobPost.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = job.applications.find(
      app => app.caregiver.toString() === req.user.id
    );

    
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    job.applications.push({
      caregiver: req.user.id,
      status: 'pending',
      coverLetter,
      proposedRate: proposedRate || parseInt(job.rate)
    });

    await job.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATED: Get My Applications (accepts both caregiver and student)  
exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find all jobs where this user has applied
    const jobs = await JobPost.find({
      'applications.caregiver': req.user.id
    })
      .populate('creator', 'name')
      .sort({ 'applications.appliedAt': -1 });

    // Map each relevant application and fill every field with safe value
    const applications = jobs.map(job => {
      const userApplication = job.applications.find(
        app => app.caregiver.toString() === req.user.id
      );

      return {
        applicationId: userApplication?._id || "",
        jobId: job?._id || "",
        job: job?.title || "Untitled Job",
        family: job?.creator?.name || "Unknown Family",
        location: job?.location || "Unknown Location",
        rate: job?.rate ? `₹${job.rate}/hour` : "Rate not specified",
        proposedRate: userApplication?.proposedRate || "",
        appliedAt: userApplication?.appliedAt || "",
        status: userApplication?.status || "pending",
        coverLetter: userApplication?.coverLetter || ""
      };
    });

    res.json({ applications });
  } catch (error) {
    console.error('❌ Get my applications error:', error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATED: Get Jobs for Caregivers (accepts both caregiver and student)
exports.getJobsForCaregivers = async (req, res) => {
  try {
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { search, category, location, page = 1, limit = 10 } = req.query;
    let query = { status: 'active' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const jobs = await JobPost.find(query)
      .populate('creator', 'name email')
      .sort({ postedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // ✅ PRODUCTION-READY: Handle all edge cases
    const formattedJobs = jobs
      .filter(job => job && job._id) // Filter out null jobs
      .map(job => ({
        id: job._id,
        title: job.title || 'Untitled Job',
        family: job.creator ? job.creator.name : 'Anonymous Family',
        location: job.location || 'Location TBD',
        rate: job.rate || 'Rate TBD',
        description: job.description || 'No description available',
        type: job.schedule || 'Schedule TBD',
        postedDate: job.postedAt || job.createdAt || new Date(),
        urgency: job.urgency || 'medium'
      }));

    // ✅ LOG data quality issues for monitoring
    const orphanedJobs = jobs.filter(job => !job.creator);
    if (orphanedJobs.length > 0) {
      console.warn(`⚠️ Found ${orphanedJobs.length} jobs with missing creators`);
    }

    res.json({ jobs: formattedJobs });
  } catch (error) {
    console.error('❌ Get jobs error:', error);
    res.status(500).json({ 
      message: 'Unable to fetch jobs',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// ✅ UPDATED: Get Job Details for Caregiver (accepts both caregiver and student)
exports.getJobDetailsForCaregiver = async (req, res) => {
  try {
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const job = await JobPost.findById(req.params.id)
      .populate('creator', 'name email phone');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      id: job._id,
      title: job.title,
      family: job.creator.name,
      location: job.location,
      salary: job.rate,
      type: job.schedule,
      posted: job.postedAt,
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      familyInfo: {
        name: job.creator.name,
        memberInfo: job.description,
        experience: 'Looking for professional caregiver',
        preferences: (job.requirements || []).join(', ')
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATED: Update Availability (accepts both caregiver and student)
exports.updateAvailability = async (req, res) => {
  try {
    if (req.user.role !== 'caregiver' && req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { isAvailable } = req.body;
    
    await User.findByIdAndUpdate(req.user.id, {
      'caregiverProfile.isAvailable': isAvailable
    });

    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
