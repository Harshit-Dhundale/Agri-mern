const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();

// POST route to add a new disease data entry
router.post('/', async (req, res) => {
    const { crop, imageUrl } = req.body;
    try {
        const newDisease = new Disease({
            crop,
            imageUrl,
            createdBy: req.user._id // assuming you have user authentication setup
        });
        await newDisease.save();
        res.status(201).json(newDisease);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to fetch all disease data entries
router.get('/', async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.json(diseases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
