import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

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
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent form from reloading the page
        try {
            const response = await axios.post('/api/crops/predict_crop', inputs);
            navigate('/crop-result', { state: { result: response.data } });
        } catch (error) {
            setError(error.response?.data?.error || 'Prediction failed');
        }
    };

    return (
        <div className="container pt-5">
            <h1 className="text-center" style={{color: '#8CE17D'}}>Crop Recommendation</h1>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {/* Input for Nitrogen */}
                    <div className="col-md-6">
                        <label className="form-label">Nitrogen Content</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="nitrogen"
                            value={inputs.nitrogen} 
                            onChange={handleChange} 
                            placeholder="Enter amount of Nitrogen" 
                            required 
                        />
                    </div>

                    {/* Input for Phosphorus */}
                    <div className="col-md-6">
                        <label className="form-label">Phosphorus Content</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="phosphorus" 
                            value={inputs.phosphorus} 
                            onChange={handleChange} 
                            placeholder="Enter amount of Phosphorus" 
                            required 
                        />
                    </div>

                    {/* Input for Potassium */}
                    <div className="col-md-6">
                        <label className="form-label">Potassium Content</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="potassium" 
                            value={inputs.potassium} 
                            onChange={handleChange} 
                            placeholder="Enter amount of Potassium" 
                            required 
                        />
                    </div>

                    {/* Input for Temperature */}
                    <div className="col-md-6">
                        <label className="form-label">Temperature (°C)</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="temperature" 
                            value={inputs.temperature} 
                            onChange={handleChange} 
                            placeholder="Enter Temperature" 
                            required 
                        />
                    </div>

                    {/* Input for Humidity */}
                    <div className="col-md-6">
                        <label className="form-label">Humidity (%)</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="humidity" 
                            value={inputs.humidity} 
                            onChange={handleChange} 
                            placeholder="Enter Humidity" 
                            required 
                        />
                    </div>

                    {/* Input for pH */}
                    <div className="col-md-6">
                        <label className="form-label">pH Level</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="ph" 
                            value={inputs.ph} 
                            onChange={handleChange} 
                            placeholder="Enter pH level" 
                            required 
                        />
                    </div>

                    {/* Input for Rainfall */}
                    <div className="col-md-6">
                        <label className="form-label">Rainfall (mm)</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="rainfall" 
                            value={inputs.rainfall} 
                            onChange={handleChange} 
                            placeholder="Enter amount of Rainfall" 
                            required 
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary w-100" disabled={Object.values(inputs).includes('')}>Predict</button>
                </div>
            </form>

            {/* Display error message if it exists */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default CropRecommend;
