const express = require('express');
require("dotenv").config();
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');
// Initialize Express app
const app = express();

app.set('trust proxy', process.env.NODE_ENV === 'production' ? 2 : 1);

// Rate Limiting Configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React app's origin
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
    credentials: true
}));
// Add after creating Express app
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(express.json()); // Parse JSON bodies
app.use(mongoSanitize()); // Sanitize user inputs to prevent NoSQL injection
app.use(limiter); // Apply rate limiting to all routes

// Connect to MongoDB
connectDB();

// Import Routes
const userRoutes = require('./routes/user');
const cropRoutes = require('./routes/crops');
const fertilizerRoutes = require('./routes/fertilizer');
const diseaseRoutes = require('./routes/disease');
const farmsRoutes = require('./routes/farms');
const postsRoutes = require('./routes/posts');
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/posts', postsRouter);
app.use('/api/posts', postsRoutes);
app.use('/api/farms', farmsRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/contact', contactRoutes);


// API Endpoints for Interacting with Python Services
app.post('/api/predict_crop', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5001/predict_crop', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/predict_fertilizer', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5001/predict_fertilizer', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// File Upload Configuration for Disease Prediction
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const upload = multer({ dest: 'uploads/' });

app.post('/api/predict_disease', upload.single('file'), async (req, res) => {
    const file = req.file;
    const crop = req.body.crop; // Assuming 'crop' is sent as part of the form data

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path), file.originalname);
        formData.append('crop', crop);

        const response = await axios.post('http://127.0.0.1:5001/predict_disease', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });
        fs.unlinkSync(file.path); // Clean up file after sending it
        res.json(response.data);
    } catch (error) {
        console.error('Error calling predict_disease:', error.message);
        res.status(500).send(error.message);
    }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});