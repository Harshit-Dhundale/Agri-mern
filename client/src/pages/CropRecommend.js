import React, { useState } from 'react';
import axios from 'axios';

function CropRecommend() {
    const [inputs, setInputs] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/predict_crop', inputs);
            console.log(response.data); // Handle response appropriately
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container pt-5">
            <h1 className="text-center" style={{color: '#8CE17D'}}>Crop Recommendation</h1>
            <form onSubmit={handleSubmit}>
                {/* Render inputs similar to the original HTML form */}
                <input className="form-control" type="number" name="N" value={inputs.nitrogen} onChange={handleChange} placeholder="enter amount of Nitrogen" />
                {/* Additional inputs */}
                <button type="submit">Predict</button>
            </form>
        </div>
    );
}

export default CropRecommend;
