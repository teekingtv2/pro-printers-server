const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  properties: {
    type: Number,
    default: 0,
  },
  guests: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  nationality: {
    type: String,
  },
  country: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Host', hostSchema);
