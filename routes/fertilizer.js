const express = require('express');
const Fertilizer = require('../models/Fertilizer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateFertilizer = require('../validators/fertilizerValidator');
const handleValidationErrors = require('../middleware/errorHandler');

// POST route with validation
router.post('/', 
  authMiddleware,
  validateFertilizer,
  handleValidationErrors,
  async (req, res) => {
    try {
        const newFertilizer = new Fertilizer({
            ...req.body,
            createdBy: req.user._id
        });
        await newFertilizer.save();
        res.status(201).json(newFertilizer);
    } catch (error) {
        console.error('Fertilizer Save Error:', error.errors); // 🚨 Log Mongoose errors
        res.status(400).json({ error: error.message });
    }
});

// GET route with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const fertilizers = await Fertilizer.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(fertilizers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/predict_fertilizer', 
    authMiddleware,
    validateFertilizer,
    handleValidationErrors,
    async (req, res) => {
      const { num_features, cat_features } = req.body;
  
      try {
          const pythonResponse = await axios.post('http://localhost:5001/predict_fertilizer', { num_features, cat_features });
  
          const recommendation = pythonResponse.data; // Get recommendation from Python service
  
          // Save to MongoDB
          const newFertilizer = new Fertilizer({
              soilTemperature: num_features[0],
              soilHumidity: num_features[1],
              soilMoisture: num_features[2],
              nitrogen: num_features[3],
              phosphorous: num_features[4],
              potassium: num_features[5],
              soilType: req.body.soilType,
              cropType: req.body.cropType,
              recommendation, // Save the recommendation
              createdBy: req.user._id
          });
  
          await newFertilizer.save();
          res.status(201).json(newFertilizer);
      } catch (error) {
          res.status(500).json({ 
              error: "Prediction failed", 
              details: error.message 
          });
      }
  });

module.exports = router;