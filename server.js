const express = require('express'); 
require("dotenv").config();
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');



const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Import routes
const userRoutes = require('./routes/user');
const cropRoutes = require('./routes/crops');
const fertilizerRoutes = require('./routes/fertilizer');
const diseaseRoutes = require('./routes/disease');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/diseases', diseaseRoutes);

// API endpoints for interacting with the Python services
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

const multer = require('multer');
const fs = require('fs'); // Make sure to require fs
const path = require('path');
const FormData = require('form-data');

const upload = multer({ dest: 'uploads/' });

app.post('/api/predict_disease', upload.single('file'), async (req, res) => {
    const file = req.file;
    const crop = req.body.crop;  // Assuming 'crop' is also sent as part of the form data

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
