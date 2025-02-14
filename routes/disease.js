const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateDisease = require('../validators/diseaseValidator'); // Adjusted below
const handleValidationErrors = require('../middleware/errorHandler');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Configure multer to store uploaded files in the 'uploads/' folder
const upload = multer({ dest: 'uploads/' });


// POST route to handle disease prediction and storing data
router.post(
  '/',
  authMiddleware,
  upload.single('file'), // Process the file upload; expects field name "file"
  validateDisease, // We'll only validate the 'crop' field now
  handleValidationErrors,
  async (req, res) => {
    try {
    console.log("Inside disease POST route:", req.body);
      // Ensure that a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const crop = req.body.crop;
      // Forward the file and crop to the Python service for prediction
      let form = new FormData();
      form.append('crop', crop);
      form.append('file', fs.createReadStream(req.file.path));

      // Adjust the Python service URL/port as needed (here we assume port 5001)
      const pythonResponse = await axios.post(
        'http://127.0.0.1:5001/predict_disease',
        form,
        { headers: form.getHeaders() }
      );
      
      const prediction = pythonResponse.data.prediction; // e.g., "Leaf Scorch"
      
      // Create a new Disease record in MongoDB
      const newDisease = new Disease({
        crop: crop,
        imageUrl: req.file.path, // You may want to serve these files statically
        prediction: prediction,
        createdBy: req.user._id
      });
      await newDisease.save();
      res.status(201).json(newDisease);
    } catch (error) {
      console.error('Error in disease route:', error);
      res.status(400).json({ error: error.message });
    }
  }
);

// GET route with pagination remains the same
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const diseases = await Disease.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const diseases = await Disease.find({ createdBy: req.params.userId });
    return res.json(diseases || []);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;