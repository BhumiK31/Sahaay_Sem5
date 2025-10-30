const JobPost = require('../models/JobPost');

// Create Job
exports.createJob = async (req, res) => {
  try {
    const jobData = req.body;
    // Set creator from authenticated user populated by authMiddleware
    jobData.creator = req.user._id;

    const job = new JobPost(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get All Jobs (with optional filters)
exports.getAllJobs = async (req, res) => {
  try {
    const filter = {};
    // Optionally add filters from req.query
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
    const job = await JobPost.findById(req.params.id).populate('creator category applicants');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
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
