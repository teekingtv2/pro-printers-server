const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  wallet: {
    type: String,
  },
  network: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  deposite_balance: {
    type: Number,
    default: 0,
  },
  total_balance: {
    type: Number,
    default: 0,
  },
  profit_balance: {
    type: Number,
    default: 0,
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
  email_verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
