const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const PasswordReset = require('../models/PasswordReset');
const User = require('../models/User');

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find the password reset document by token
    const passwordReset = await PasswordReset.findOne({ token });

    if (!passwordReset) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    // Find the user associated with the token
    const user = await User.findById(passwordReset.user);

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete the password reset document
    await passwordReset.remove();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
