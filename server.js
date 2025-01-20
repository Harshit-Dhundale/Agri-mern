const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const cropRoutes = require('./routes/crops');
const fertilizerRoutes = require('./routes/fertilizers');
const diseaseRoutes = require('./routes/diseases');

app.use('/api/crop', cropRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/diseases', diseaseRoutes);

const axios = require('axios');

// Predict crop requirements
app.post('/api/predict_crop', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/predict_crop', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Predict fertilizer requirements
app.post('/api/predict_fertilizer', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/predict_fertilizer', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
