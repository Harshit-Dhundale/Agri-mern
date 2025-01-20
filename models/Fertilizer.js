const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    soilTemperature: Number,
    soilHumidity: Number,
    soilMoisture: Number,
    nitrogen: Number,
    phosphorous: Number,
    potassium: Number,
    soilType: String,
    cropType: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;
