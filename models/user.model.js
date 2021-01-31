const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      require: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);