const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

async function generatePDF(patient) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Create HTML content for the PDF
    const htmlContent = generateHTMLContent(patient);
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `report_${patient.patientId}_${timestamp}.pdf`;
    const filepath = path.join(uploadsDir, filename);
    
    await page.pdf({
      // path: filepath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    });
    
    await browser.close();
    
    return filename;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

function generateHTMLContent(patient) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>S. K. Diagnostics</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #333;
      padding: 10px 20px;
      margin-bottom: 20px;
    }
    .header-left img {
      height: 60px; /* adjust as needed */
    }
    .header-center {
      text-align: center;
      flex: 1;
    }
    .header-center h1 {
      margin: 0;
      color: #2c3e50;
    }
    .header-center p {
      margin: 2px 0;
      color: #2c3e50;
    }
    .header-right {
    display: flex;
    flex-direction: column;
    justify-content: center;   /* vertical alignment */
    text-align: center;        /* center align each line */
    }

    .patient-info {
      /*background: #f8f9fa;*/
      background: #ffffff;

      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .patient-info h2 {
      margin-top: 0;
      color: #2c3e50;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 5px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .info-item {
      margin: 5px 0;
    }
    .info-item strong {
      color: #495057;
    }
    .test-results {
      margin-top: 20px;
    }
    .test-results h2 {
      color: #2c3e50;
      border-bottom: 2px solid #dee2e6;
      padding-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
    }
    th {
      /*background-color: #f8f9fa;*/
      font-weight: bold;
      color: #495057;
    }
    .abnormal {
      color: #dc3545;
      font-weight: bold;
    }
    .normal {
      color: #28a745;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      border-top: 1px solid #dee2e6;
      padding-top: 20px;
    }
    .signature {
  margin-top: 30px;
  width: 250px;        /* control how wide the signature block is */
  margin-left: auto;   /* push it to the right */
  text-align: center;  /* center text inside the block */
}
.signature-line {
  border-top: 1px solid #333;
  width: 200px;
  margin:  auto;      /* center the line inside the block */
}
    
    .header-right .name {
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
    margin: 2px 0;
  }
  .header-right .regno {
    font-family: "Courier New", monospace;
    font-size: 14px;
    color: #555;
    margin: 2px 0;
  }
  .header-right .extra {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #888;
    margin: 2px 0;
  }
  .signature p {
  margin: 4px 0 0 0;     /* small spacing above text only */
  font-size: 19px;       /* optional: make text smaller 
}
.divider {
  border-top: 1px solid #333;
  margin: 20px 0;
}
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <img src="logo.png" alt="Lab Logo">
    </div>
    <div class="header-center">
    <h1>S. K. Diagnostics</h1>  
    <h1>PATHOLOGY</h1>
    <p class="name">Dr. M.L. Agrawal, Dispensory, Banki Mongra, Korba</p>
    </div>
    <div class="header-right">
      <p class="regno"> Mob: 9907142225</p>
      <p class="name"> Nandesh Singh</p>
      <p class="extra"> B.Sc. DMLT (Pathology)</p>
    </div>
  </div>

  <div class="patient-info">
    <!-- <h2>Patient Information</h2> -->
    <div class="info-grid">
      <div class="info-item">
        <strong>Patient Name:</strong> ${patient.patientName}
      </div>
     <div class="info-item">
        <strong>Gender:</strong> ${patient.gender}
      </div>
      <div class="info-item">
        <strong>Age:</strong> ${patient.age}
      </div>
      
      
      <div class="info-item">
        <strong>Report Date:</strong> ${formatDate(patient.date)}
      </div>
      <div class="info-item">
        <strong>Doctor:</strong> ${patient.doctorName}
      </div>
      
    </div>
  </div>

  <div class="test-results">
    <!-- <h2>Test Results</h2> -->
    <table>
      <thead>
        <tr>
          <th>Test Name</th>
          <th>Observed Value</th>
          <th>Unit</th>
          <th>Reference Range</th>
          <!--<th>Status</th>-->
        </tr>
      </thead>
      <tbody>
        ${patient.testResults.map(test => `
          <tr>
            <td>${test.testName}</td>
            <td>${test.observedValue}</td>
            <td>${test.unit}</td>
            <td>${test.referenceRange}</td>
            <!--<td class="${test.isNormal ? 'normal' : 'abnormal'}">-->
            <!--  ${test.isNormal ? 'Normal' : 'Abnormal'}-->
            <!--</td>-->
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <!-- <p>This report is generated electronically and is valid without signature.</p> -->
    <div class="signature">
      <div class="signature-line"></div>
      <p>Nandesh Singh</p>
      <p>DMLT</p>
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = { generatePDF };
