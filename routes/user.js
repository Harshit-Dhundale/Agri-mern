const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { validateUserRegistration, validateUserLogin } = require('../validators/userValidator');
const handleValidationErrors = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware'); // Add this line


// 🔹 User Registration with Validation
router.post('/register', 
  validateUserRegistration,
  handleValidationErrors,
  async (req, res) => {
    try {
      // Check if the email or username already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      // Create and save new user with the full set of data
      const user = new User(req.body);
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// 🔹 Validate Token Route (if needed)
router.get('/validate-token', authMiddleware, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

// 🔹 User Login with Validation
router.post('/login', 
  validateUserLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { identifier, password } = req.body;
      
      // Search for a user by email or username
      const user = await User.findOne({ 
        $or: [{ email: identifier }, { username: identifier }]
      });
      
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  }
);

module.exports = router;