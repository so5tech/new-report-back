const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  observedValue: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  referenceRange: {
    type: String,
    required: true
  },
  isNormal: {
    type: Boolean,
    default: true
  }
});

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  patientId: {
    type: String,
    required: true,
    // unique: true
  },
  doctorName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  testResults: [testResultSchema],
  pdfPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);