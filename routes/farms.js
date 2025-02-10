// routes/farms.js
const express = require('express');
const router = express.Router();
const Farm = require('../models/Farm');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const handleValidationErrors = require('../middleware/errorHandler');

// Create a new farm record (Protected)
router.post(
  '/',
  authMiddleware,
  [
    body('location').notEmpty().withMessage('Location is required'),
    body('size').isNumeric().withMessage('Size must be a number'),
    body('crops').isArray({ min: 1 }).withMessage('At least one crop is required'),
    body('farmType').notEmpty().withMessage('Farm type is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { location, size, crops, farmType, description } = req.body;
      const newFarm = new Farm({
        location,
        size,
        crops,
        farmType,
        description,
        createdBy: req.user._id
      });
      await newFarm.save();
      res.status(201).json(newFarm);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// GET farm details for a given user (Assuming one farm per user)
router.get('/:userId', async (req, res) => {
  try {
    const farm = await Farm.findOne({ createdBy: req.params.userId });
    if (!farm) return res.status(404).json({ message: 'Farm not found for this user' });
    res.json(farm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update farm details by farm ID (Protected)
router.put('/:farmId', authMiddleware, async (req, res) => {
  try {
    const updatedFarm = await Farm.findByIdAndUpdate(req.params.farmId, req.body, { new: true });
    if (!updatedFarm) return res.status(404).json({ message: 'Farm not found' });
    res.json(updatedFarm);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;