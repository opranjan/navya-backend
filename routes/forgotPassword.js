const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');

// Generate a random token
const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Create a Nodemailer transporter (configure this with your email provider)
const transporter = nodemailer.createTransport({
  service: 'your-email-provider',
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique token
    const token = generateToken();

    // Store the token in the database
    const passwordReset = new PasswordReset({
      user: user._id,
      token,
    });
    await passwordReset.save();

    // Send a password reset email to the user
    await transporter.sendMail({
      from: 'opranjan91700@gmail.com',
      to: username,
      subject: 'Password Reset',
      text: `To reset your password, click the following link: http://localhost:3000/reset-password/${token}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
