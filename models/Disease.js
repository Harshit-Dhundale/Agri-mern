const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    crop: String,
    imageUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
