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
    body('name').notEmpty().withMessage('Farm name is required'), // Added validation for name
    body('location').notEmpty().withMessage('Location is required'),
    body('size').isNumeric().withMessage('Size must be a number'),
    body('crops').isArray({ min: 1 }).withMessage('At least one crop is required'),
    body('farmType').notEmpty().withMessage('Farm type is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, location, size, crops, farmType, description } = req.body;
      const newFarm = new Farm({
        name, // Added name field
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

// GET all farms for a given user
router.get('/:userId', async (req, res) => {
  try {
    const farms = await Farm.find({ createdBy: req.params.userId });
    return res.json(farms || []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// PUT route to update farm details by farm ID (Protected)
router.put('/:farmId', authMiddleware, async (req, res) => {
  try {
    const { name, location, size, crops, farmType, description } = req.body; // Extract name
    const updatedFarm = await Farm.findByIdAndUpdate(
      req.params.farmId,
      { name, location, size, crops, farmType, description }, // Ensure name is updated
      { new: true, runValidators: true }
    );

    if (!updatedFarm) return res.status(404).json({ message: 'Farm not found' });
    res.json(updatedFarm);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:farmId', authMiddleware, async (req, res) => {
  try {
    const deleted = await Farm.findByIdAndDelete(req.params.farmId);
    if (!deleted) return res.status(404).json({ message: 'Farm not found' });
    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
