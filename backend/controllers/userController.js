const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is: ${code}`
  };
  await transporter.sendMail(mailOptions);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + '_' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

exports.upload = upload;

// Register user
exports.registerUser = async (req, res) => {
  try {
    console.log("Register request:", req.body);

    const { name, email, password, role, address, city, bio, availability, moreRequirements } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Include all possible fields here
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verificationCode,
      verified: false,
      address: address || '',
      city: city || '',
      bio: bio || '',
      availability: availability || '',
      moreRequirements: moreRequirements || '',
      profileCompletion: 0,
      rating: 0,
      skills: [],
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Verify email endpoint
exports.verifyEmail = async (req, res) => {
  try {
    console.log("Verify request:", req.body);

    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });
    if (user.verified) return res.status(400).json({ message: 'Email already verified' });

    if (user.verificationCode === code) {
      user.verified = true;
      user.verificationCode = null;
      await user.save();
      return res.json({ message: 'Email verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Resend verification email
exports.resendVerification = async (req, res) => {
  try {
    console.log("Resend verification request:", req.body);

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });
    if (user.verified) return res.status(400).json({ message: 'Email already verified' });

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = verificationCode;
    await user.save();
    await sendVerificationEmail(email, verificationCode);

    res.json({ message: 'Verification code resent.' });
  } catch (err) {
    console.error("Resend verification error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    console.log("User model type:", typeof User);
    console.log("User model output:", User);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Uncomment if login requires email verification
    // if (!user.verified) return res.status(401).json({ message: 'Please verify your email to log in.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};


// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    console.log("Get profile request", req.params);

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update user profile fields
exports.updateProfile = async (req, res) => {
  try {
    console.log("🔹 Incoming profile update:", req.body);
    console.log("🔹 Authenticated user:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const allowedFields = [
      'address',
      'city',
      'bio',
      'availability',
      'moreRequirements',
      'skills'
    ];

    const updateFields = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });

    // ✅ Calculate profile completion percentage
    let completedFields = 0;
    const totalFields = 5; // adjust if you add more
    if (updateFields.address) completedFields++;
    if (updateFields.city) completedFields++;
    if (updateFields.bio) completedFields++;
    if (updateFields.availability) completedFields++;
    if (updateFields.moreRequirements) completedFields++;

    updateFields.profileCompletion = Math.round((completedFields / totalFields) * 100);
    updateFields.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    console.log("✅ User successfully updated:", user);
    res.json(user);
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    console.log("🖼 Upload profile photo request for:", req.user?.id);
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path.replace(/\\/g, '/');
    const url = `/uploads/${path.basename(filePath)}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: filePath, profilePhotoUrl: url, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    console.log("✅ Profile photo updated:", user?.profilePhotoUrl);
    res.json(user);
  } catch (err) {
    console.error("❌ Upload profile photo error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.uploadGovtIdProof = async (req, res) => {
  try {
    console.log("🪪 Upload govt ID request for:", req.user?.id);
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = req.file.path.replace(/\\/g, '/');
    const url = `/uploads/${path.basename(filePath)}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { govtIdProof: filePath, idProofUrl: url, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    console.log("✅ Govt ID proof updated:", user?.idProofUrl);
    res.json(user);
  } catch (err) {
    console.error("❌ Upload govt ID error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    console.log("Received update request for user:", userId, updatedData);
    // Only allow specific fields to be updated
    const allowedFields = ['address', 'city', 'bio', 'availability', 'moreRequirements', 'skills'];

    const updateFields = {};
    allowedFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        updateFields[field] = updatedData[field];
      }
    });

    // Calculate profileCompletion
    let completedFields = 0;
    const totalFields = 5; // address, city, bio, availability, moreRequirements
    ['address', 'city', 'bio', 'availability', 'moreRequirements'].forEach(field => {
      if (updateFields[field]) completedFields++;
    });
    updateFields.profileCompletion = Math.round((completedFields / totalFields) * 100);

    updateFields.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    console.log("Profile updated:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
};
