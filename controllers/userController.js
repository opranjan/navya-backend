const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating a reset token
const nodemailer = require('nodemailer'); // For sending emails

// Signup
exports.signup = async (req, res) => {
  try {
    const {name, email,mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email,mobile, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a unique token
      const resetToken = crypto.randomBytes(20).toString('hex');
  
      // Set a reset token expiration time (e.g., 1 hour)
      const resetTokenExpiration = Date.now() + 3600000; // 1 hour in milliseconds
  
      // Store the reset token and its expiration in the user document
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();
  
    //   // Send a password reset email to the user
    //   const transporter = nodemailer.createTransport({
    //     // Configure your email provider here

    //     service: process.env.SMPT_SERVICE, // Use your email service provider, e.g., 'Gmail', 'SMTP', etc.
    //     auth: {
    //       user:process.env.SMPT_MAIL, // Replace with your Gmail email address
    //       pass: process.env.SMPT_PASSWORD, // Replace with your Gmail password (or use an app-specific password)
    //     },
    //   });




      const smtpConfig = {
        host: 'smtp.elasticemail.com',
        port: 2525,
        // secure: true, // use SSL
        auth: {
            user: "omranjan400708@gmail.com",
            pass: "05DB5C3F12C57776F9ECB555856FBF9FF61E"
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);





  
      const mailOptions = {
        from: "omranjan400708@gmail.com",
        to: email,
        subject: 'Password Reset',
        html: `
          reset
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };





  // Reset Password
exports.resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
  
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }, // Check if the reset token is still valid
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and reset token fields
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
