const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    // required: true,
    unique: true
  },
  referenceValue: {
    type: String,
    // required: true
  },
  unit: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    enum: ['Blood', 'Urine', 'Stool', 'Imaging', 'Other'],
    default: 'Blood'
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema);