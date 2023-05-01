const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  crosskey: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.index({ crosskey: 1 }, { crosskey: true });

module.exports = mongoose.model('User', userSchema);