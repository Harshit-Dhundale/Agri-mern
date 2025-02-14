const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { validateUserRegistration, validateUserLogin } = require('../validators/userValidator');
const handleValidationErrors = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer'); // ✅ Import Multer

// ✅ Multer Storage Configuration for Profile Picture Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ✅ Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 🔹 User Registration with Validation
router.post('/register', 
  validateUserRegistration,
  handleValidationErrors,
  async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      const user = new User(req.body);
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// 🔹 Validate Token Route
router.get('/validate-token', authMiddleware, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

// 🔹 Get User Details
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 User Login with Validation
router.post('/login', 
  validateUserLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { identifier, password } = req.body;
      const user = await User.findOne({ 
        $or: [{ email: identifier }, { username: identifier }]
      });
      
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
});

// 🔹 Update User Profile (Now Supports Profile Picture Upload)
router.put('/:userId', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ✅ If profile picture is uploaded, update the path
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, updateData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
