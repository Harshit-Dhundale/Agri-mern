import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FertilizerRecommend = () => {
  const [inputs, setInputs] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    soil: '',
    crop: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/predict_fertilizer', inputs);
      navigate('/recommend-result', { state: { result: response.data.prediction } });
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <div className="container pt-5">
      <h1 className="text-center" style={{ color: '#8CE17D' }}>Fertilizer Recommendation</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', width: '80%', margin: 'auto' }}>
        <div className="mb-3">
          <label>Temperature:</label>
          <input
            type="number"
            className="form-control"
            name="temperature"
            value={inputs.temperature}
            onChange={handleChange}
            placeholder="Enter temperature"
          />
        </div>
        <div className="mb-3">
          <label>Humidity:</label>
          <input
            type="number"
            className="form-control"
            name="humidity"
            value={inputs.humidity}
            onChange={handleChange}
            placeholder="Enter humidity"
          />
        </div>
        <div className="mb-3">
          <label>Moisture:</label>
          <input
            type="number"
            className="form-control"
            name="moisture"
            value={inputs.moisture}
            onChange={handleChange}
            placeholder="Enter moisture"
          />
        </div>
        <div className="mb-3">
          <label>Soil Type:</label>
          <select
            className="form-control"
            name="soil"
            value={inputs.soil}
            onChange={handleChange}
          >
            <option value="">Select Soil Type</option>
            <option value="black">Black</option>
            <option value="clayey">Clayey</option>
            <option value="loamy">Loamy</option>
            <option value="red">Red</option>
            <option value="sandy">Sandy</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">Predict</button>
        </div>
      </form>
    </div>
  );
};

export default FertilizerRecommend;
