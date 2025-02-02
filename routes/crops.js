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
    const { nitrogen, phosphorous, potassium, soilTemperature, soilHumidity, soilPh, rainfall } = req.body;
    try {
        const newCrop = new Crop({
            nitrogen,
            phosphorous,
            potassium,
            soilTemperature,
            soilHumidity,
            soilPh,
            rainfall,
            createdBy: req.user._id
        });
        await newCrop.save();
        res.status(201).json(newCrop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route with pagination
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

// Prediction endpoint
router.post('/predict_crop', 
  authMiddleware,
  validateCrop,
  handleValidationErrors,
  async (req, res) => {
    try {
        const pythonResponse = await axios.post('http://localhost:5001/predict', req.body);
        res.json(pythonResponse.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Prediction failed", 
            details: error.message 
        });
    }
});

module.exports = router;