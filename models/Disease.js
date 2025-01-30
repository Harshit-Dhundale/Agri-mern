const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
