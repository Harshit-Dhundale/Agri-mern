// models/Farm.js
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  location: { 
    type: String, 
    required: [true, 'Location is required'] 
  },
  size: { 
    type: Number, 
    required: [true, 'Size is required'] 
  }, // For example, size in acres
  crops: [{ 
    type: String, 
    required: [true, 'At least one crop is required'] 
  }], // An array of crops planted
  farmType: { 
    type: String, 
    required: [true, 'Farm type is required'] 
  }, // e.g. "Organic", "Conventional", etc.
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;