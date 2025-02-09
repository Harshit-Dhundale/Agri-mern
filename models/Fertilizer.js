const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    soilTemperature: { type: Number, required: true },
    soilHumidity: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    nitrogen: { type: Number, required: true },
    phosphorous: { type: Number, required: true },
    potassium: { type: Number, required: true },
    soilType: { type: String, required: true },
    cropType: { type: String, required: true },
    recommendation: String, // New field for storing recommendation
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;