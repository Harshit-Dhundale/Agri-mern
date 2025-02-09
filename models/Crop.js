// models/Crop.js
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    nitrogen: Number,
    phosphorus: Number,  // Correct field name
    potassium: Number,
    soilTemperature: Number,
    soilHumidity: Number,
    soilPh: Number,
    rainfall: Number,
    recommendation: { type: String }, // Field for storing recommendation
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;