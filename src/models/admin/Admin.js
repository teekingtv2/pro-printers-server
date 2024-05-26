const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email_verified: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
