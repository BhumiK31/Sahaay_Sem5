const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. "youraddress@gmail.com"
    pass: process.env.EMAIL_PASS  // e.g. "your-app-specific-password"
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

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verificationCode,
      verified: false
    });
    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify email endpoint
exports.verifyEmail = async (req, res) => {
  try {
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
    res.status(500).json({ message: err.message });
  }
};

// (Optional) Resend email verification code
exports.resendVerification = async (req, res) => {
  try {
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
    res.status(500).json({ message: err.message });
  }
};

// Login user (require verification for login: uncomment if needed)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Optional: enforce email verification before login
    // if (!user.verified) return res.status(401).json({ message: 'Please verify your email to log in.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
