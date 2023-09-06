const express = require('express');
const { signup, signin ,forgotPassword, resetPassword} = require('../controllers/userController');
const router = express.Router();


// Signup
router.post('/signup', signup);

// Signin
router.post('/signin', signin);


// Forgot Password
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

module.exports = router;
