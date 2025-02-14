const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Farm name is required'] 
  }, // Added farm name field
  location: { 
    type: String, 
    required: [true, 'Location is required'] 
  },
  size: { 
    type: Number, 
    required: [true, 'Size is required'] 
  }, // Size in acres
  crops: [{ 
    type: String, 
    required: [true, 'At least one crop is required'] 
  }], // Array of crops
  farmType: { 
    type: String, 
    required: [true, 'Farm type is required'] 
  }, // e.g., "Organic", "Conventional"
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
