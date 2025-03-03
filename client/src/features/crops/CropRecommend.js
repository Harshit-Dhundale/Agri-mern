// client/src/features/crops/CropRecommend.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cropAPI } from '../../utils/api';
import HeroHeader from '../../components/common/HeroHeader';  // Import HeroHeader
import { FormLayout } from '../../components/common/FormLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './CropRecommend.css'; // Ensure your styles are here

const CropRecommend = () => {
  const [inputs, setInputs] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Convert inputs to numbers
    const numericPayload = {
      nitrogen: parseFloat(inputs.nitrogen),
      phosphorus: parseFloat(inputs.phosphorus),
      potassium: parseFloat(inputs.potassium),
      temperature: parseFloat(inputs.temperature),
      humidity: parseFloat(inputs.humidity),
      ph: parseFloat(inputs.ph),
      rainfall: parseFloat(inputs.rainfall)
    };

    console.log('Numeric Payload:', numericPayload); // Debug

    // Validate that all inputs are numbers
    if (Object.values(numericPayload).some(val => isNaN(val))) {
      setLoading(false);
      return setError('Please enter valid numbers in all fields');
    }

    // Build the payload for the Python service
    const payload = {
      features: [
        numericPayload.nitrogen,
        numericPayload.phosphorus,
        numericPayload.potassium,
        numericPayload.temperature,
        numericPayload.humidity,
        numericPayload.ph,
        numericPayload.rainfall
      ]
    };

    try {
      const response = await cropAPI.predict(payload);
      const recommendation = response.data.prediction || response.data;

      // Save crop data (including recommendation) to MongoDB
      await cropAPI.createCropData({
        nitrogen: numericPayload.nitrogen,
        phosphorus: numericPayload.phosphorus,
        potassium: numericPayload.potassium,
        soilTemperature: numericPayload.temperature,
        soilHumidity: numericPayload.humidity,
        soilPh: numericPayload.ph,
        rainfall: numericPayload.rainfall,
        recommendation  // Include the recommendation
      });

      navigate('/crop-result', { state: { result: recommendation } });
    } catch (err) {
      console.error('Full error object:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HeroHeader with background image */}
      <HeroHeader
        title="Crop Recommendation"
        subtitle="Enter soil parameters for optimal crop suggestions."
        backgroundImage="/assets/head/crop.jpg"  // Path to image in public folder
      />

      <div className="page-container">
        <FormLayout
          title="Crop Recommendation"
          description="Enter soil parameters for optimal crop suggestions"
        >
          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-grid">
              {[
                { label: "Nitrogen (N) Content", key: "nitrogen" },
                { label: "Phosphorus (P) Content", key: "phosphorus" },
                { label: "Potassium (K) Content", key: "potassium" },
                { label: "Temperature (°C)", key: "temperature" },
                { label: "Humidity (%)", key: "humidity" },
                { label: "pH Level", key: "ph" },
                { label: "Rainfall (mm)", key: "rainfall" }
              ].map(({ label, key }) => (
                <div className="form-group" key={key}>
                  <label>{label}</label>
                  <input
                    type="number"
                    name={key}
                    value={inputs[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${label}`}
                    required
                    tabIndex="0"
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="ms-2">Processing...</span>
                </>
              ) : 'Get Recommendation'}
            </button>

            {error && <div className="error-message">{error}</div>}
          </form>
        </FormLayout>
      </div>
    </>
  );
};

export default CropRecommend;
