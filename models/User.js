const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  resetToken: String,
  resetTokenExpiration: Date,
  
});


module.exports = mongoose.model('User', userSchema);
