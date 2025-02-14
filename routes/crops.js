// routes/crops.js
const express = require('express');
const Crop = require('../models/Crop');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateCrop = require('../validators/cropValidator');
const handleValidationErrors = require('../middleware/errorHandler');
const axios = require('axios');

// POST route with validation
router.post('/', 
  authMiddleware, 
  validateCrop,
  handleValidationErrors,
  async (req, res) => {
    // Use the correct field name: phosphorus
    const { nitrogen, phosphorus, potassium, soilTemperature, soilHumidity, soilPh, rainfall, recommendation } = req.body;
    try {
        const newCrop = new Crop({
            nitrogen,
            phosphorus,  // Correct spelling
            potassium,
            soilTemperature,
            soilHumidity,
            soilPh,
            rainfall,
            recommendation, // Save the recommendation with the record
            createdBy: req.user._id
        });
        await newCrop.save();
        res.status(201).json(newCrop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route with pagination (unchanged)
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const crops = await Crop.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(crops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all crop predictions for a given user
router.get('/user/:userId', async (req, res) => {
  try {
    const crops = await Crop.find({ createdBy: req.params.userId });
    // If no crops exist, return an empty array (do not send 404)
    return res.json(crops || []);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// Prediction endpoint remains unchanged if it calls your Python service
router.post('/predict_crop', 
  authMiddleware,
  validateCrop,
  handleValidationErrors,
  async (req, res) => {
    try {
        const pythonResponse = await axios.post('http://localhost:5001/predict_crop', req.body);
        res.json(pythonResponse.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Prediction failed", 
            details: error.message 
        });
    }
});

module.exports = router;