const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'saved_comparisons.json');

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, images) from current directory
app.use(express.static(__dirname));

// Helper: Read stored comparisons safely
function readSavedComparisons() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent || '[]');
  } catch (err) {
    console.error('Error reading comparisons file:', err);
    return [];
  }
}

// 1. POST Endpoint: Receive and store comparison data from client
app.post('/api/comparisons', (req, res) => {
  const { property1, property2, notes } = req.body;

  // Validation: Check that both properties are provided
  if (!property1 || !property2) {
    return res.status(400).json({
      success: false,
      error: 'Both Property 1 and Property 2 are required to save a comparison.'
    });
  }

  const comparisons = readSavedComparisons();

  const newRecord = {
    id: Date.now(),
    property1: String(property1).trim(),
    property2: String(property2).trim(),
    notes: notes ? String(notes).trim() : 'Saved from Comparison View',
    savedAt: new Date().toISOString()
  };

  comparisons.push(newRecord);

  // Write updated array back to JSON file
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(comparisons, null, 2));
    return res.status(201).json({
      success: true,
      message: 'Comparison successfully saved to server!',
      data: newRecord
    });
  } catch (err) {
    console.error('Error saving comparison:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to write data to file.'
    });
  }
});

// 2. GET Endpoint: Retrieve all saved comparisons
app.get('/api/comparisons', (req, res) => {
  const comparisons = readSavedComparisons();
  res.json({
    success: true,
    count: comparisons.length,
    data: comparisons
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Home Choice server running at http://localhost:${PORT}`);
});