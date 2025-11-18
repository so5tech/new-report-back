const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { generatePDF } = require('../services/pdfService');

// Create new patient with test results
router.post('/', async (req, res) => {
  try {
    const patientData = req.body;
    const patient = new Patient(patientData);
    
    // // Generate PDF
    // const pdfPath = await generatePDF(patient);
    // patient.pdfPath = pdfPath;
    
    await patient.save();
    
    res.status(201).json({
      success: true,
      data: patient,
      // pdfUrl: `${req.protocol}://${req.get('host')}/uploads/${pdfPath}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: patients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    // Regenerate PDF if test results changed
    const pdfPath = await generatePDF(patient);
    patient.pdfPath = pdfPath;
    await patient.save();
    
    res.json({
      success: true,
      data: patient,
      pdfUrl: `${req.protocol}://${req.get('host')}/uploads/${pdfPath}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;