const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username:    { type: String, required: true, unique: true },
  fullName:    { type: String, required: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  gender:      { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone:       { type: String, required: true },
  country:     { type: String, required: true }, // e.g., ISO code like "US" or "IN"
  state:       { type: String, required: true },
  city:        { type: String, required: true },
  pincode:     { type: String, required: true },
  dob:         { type: Date, required: true },
  profilePicture: { type: String, required: true } // URL to profile picture
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;