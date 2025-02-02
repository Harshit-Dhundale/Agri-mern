const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateDisease = require('../validators/diseaseValidator');
const handleValidationErrors = require('../middleware/errorHandler');

// POST route with validation
router.post('/', 
  authMiddleware,
  validateDisease,
  handleValidationErrors,
  async (req, res) => {
    try {
        const newDisease = new Disease({
            crop: req.body.crop,
            imageUrl: req.body.imageUrl,
            createdBy: req.user._id
        });
        await newDisease.save();
        res.status(201).json(newDisease);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route with pagination
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

module.exports = router;