const express = require('express');
const Fertilizer = require('../models/Fertilizer');
const router = express.Router();

// POST route to add a new fertilizer data entry
router.post('/', async (req, res) => {
    const { soilTemperature, soilHumidity, soilMoisture, nitrogen, phosphorous, potassium, soilType, cropType } = req.body;
    try {
        const newFertilizer = new Fertilizer({
            soilTemperature,
            soilHumidity,
            soilMoisture,
            nitrogen,
            phosphorous,
            potassium,
            soilType,
            cropType,
            createdBy: req.user._id // assuming you have user authentication setup
        });
        await newFertilizer.save();
        res.status(201).json(newFertilizer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to fetch all fertilizer data entries
router.get('/', async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        res.json(fertilizers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
