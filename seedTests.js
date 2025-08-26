const mongoose = require('mongoose');
const Test = require('./src/models/Test');
require('dotenv').config();

const testData = [
  {
    testName: 'Hemoglobin',
    referenceValue: '12.0-16.0 g/dL',
    unit: 'g/dL',
    category: 'Blood',
    description: 'Measures the amount of hemoglobin in blood'
  },
  {
    testName: 'White Blood Cell Count',
    referenceValue: '4,000-11,000 cells/μL',
    unit: 'cells/μL',
    category: 'Blood',
    description: 'Measures the number of white blood cells'
  },
  {
    testName: 'Platelet Count',
    referenceValue: '150,000-450,000 cells/μL',
    unit: 'cells/μL',
    category: 'Blood',
    description: 'Measures the number of platelets in blood'
  },
  {
    testName: 'Glucose (Fasting)',
    referenceValue: '70-100 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures blood sugar level after fasting'
  },
  {
    testName: 'Total Cholesterol',
    referenceValue: '<200 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures total cholesterol level in blood'
  },
  {
    testName: 'Creatinine',
    referenceValue: '0.6-1.2 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures kidney function'
  },
  {
    testName: 'ALT (SGPT)',
    referenceValue: '7-56 U/L',
    unit: 'U/L',
    category: 'Blood',
    description: 'Measures liver enzyme ALT'
  },
  {
    testName: 'AST (SGOT)',
    referenceValue: '10-40 U/L',
    unit: 'U/L',
    category: 'Blood',
    description: 'Measures liver enzyme AST'
  },
  {
    testName: 'Urea',
    referenceValue: '15-45 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures blood urea nitrogen'
  },
  {
    testName: 'Uric Acid',
    referenceValue: '3.4-7.0 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures uric acid level in blood'
  },
  {
    testName: 'Bilirubin (Total)',
    referenceValue: '0.1-1.2 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures total bilirubin level'
  },
  {
    testName: 'Albumin',
    referenceValue: '3.5-5.0 g/dL',
    unit: 'g/dL',
    category: 'Blood',
    description: 'Measures albumin level in blood'
  },
  {
    testName: 'Calcium',
    referenceValue: '8.5-10.5 mg/dL',
    unit: 'mg/dL',
    category: 'Blood',
    description: 'Measures calcium level in blood'
  },
  {
    testName: 'Sodium',
    referenceValue: '135-145 mEq/L',
    unit: 'mEq/L',
    category: 'Blood',
    description: 'Measures sodium level in blood'
  },
  {
    testName: 'Potassium',
    referenceValue: '3.5-5.0 mEq/L',
    unit: 'mEq/L',
    category: 'Blood',
    description: 'Measures potassium level in blood'
  },
  {
    testName: 'Urine pH',
    referenceValue: '4.6-8.0',
    unit: 'pH',
    category: 'Urine',
    description: 'Measures acidity/alkalinity of urine'
  },
  {
    testName: 'Urine Protein',
    referenceValue: 'Negative',
    unit: 'Qualitative',
    category: 'Urine',
    description: 'Detects protein in urine'
  },
  {
    testName: 'Urine Glucose',
    referenceValue: 'Negative',
    unit: 'Qualitative',
    category: 'Urine',
    description: 'Detects glucose in urine'
  },
  {
    testName: 'Urine Ketones',
    referenceValue: 'Negative',
    unit: 'Qualitative',
    category: 'Urine',
    description: 'Detects ketones in urine'
  },
  {
    testName: 'Stool Occult Blood',
    referenceValue: 'Negative',
    unit: 'Qualitative',
    category: 'Stool',
    description: 'Detects blood in stool'
  }
];

async function seedTests() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pathology_reports';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing tests
    await Test.deleteMany({});
    console.log('🗑️  Cleared existing tests');

    // Insert new tests
    await Test.insertMany(testData);
    console.log('✅ Test data seeded successfully');

    // Log inserted tests
    const tests = await Test.find({});
    console.log(`📊 Inserted ${tests.length} test templates`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding tests:', error.message);
    process.exit(1);
  }
}

seedTests();