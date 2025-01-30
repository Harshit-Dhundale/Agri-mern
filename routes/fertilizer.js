const express = require('express');
const Fertilizer = require('../models/Fertilizer');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { validateFertilizer } = require('../validators/fertilizerValidator');
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

module.exports = router;