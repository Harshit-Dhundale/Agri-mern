const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    soilTemperature: { type: Number, required: true },  // Example of required field
    soilHumidity: { type: Number, required: true },     // Example of required field
    soilMoisture: { type: Number, required: true },     // Example of required field
    nitrogen: { type: Number, required: true },         // Example of required field
    phosphorous: { type: Number, required: true },      // Example of required field
    potassium: { type: Number, required: true },        // Example of required field
    soilType: { type: String, required: true },         // Example of required field
    cropType: { type: String, required: true },         // Example of required field
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Ensure createdBy is also required
    }
}, { timestamps: true });

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;
