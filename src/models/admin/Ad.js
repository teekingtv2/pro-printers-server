const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  telegram: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ad', adSchema);
