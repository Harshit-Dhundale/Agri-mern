const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prediction: { type: String, required: true }, // NEW FIELD
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;