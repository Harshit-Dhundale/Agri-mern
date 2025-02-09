const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    soilTemperature: Number,
    soilHumidity: Number,
    soilPh: Number,
    rainfall: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
