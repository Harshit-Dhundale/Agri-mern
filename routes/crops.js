const express = require('express');
const Crop = require('../models/Crop');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


// POST route to add a new crop data entry
router.post('/', authMiddleware, async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ error: "Unauthorized: No user authenticated" });
    }
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
            createdBy: req.user._id // assuming you have user authentication setup
        });
        await newCrop.save();
        res.status(201).json(newCrop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to fetch all crop data entries
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
