// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Always default to false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
