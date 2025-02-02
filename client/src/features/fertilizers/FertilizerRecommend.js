import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fertilizerAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FormLayout } from '../../components/common/FormLayout';
import './FertilizerRecommend.css';

const soilTypes = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy'];
const cropTypes = [
  'Barley',
  'Cotton',
  'Ground Nuts',
  'Maize',
  'Millets',
  'Oil seeds',
  'Paddy',
  'Pulses',
  'Sugarcane',
  'Tobacco',
  'Wheat'
];

const FertilizerRecommend = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    soilType: '',
    cropType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Parse and validate numeric features.
    const temperature = parseFloat(formData.temperature);
    const humidity = parseFloat(formData.humidity);
    const moisture = parseFloat(formData.moisture);
    const nitrogen = parseFloat(formData.nitrogen);
    const phosphorus = parseFloat(formData.phosphorus);
    const potassium = parseFloat(formData.potassium);

    const num_features = [temperature, humidity, moisture, nitrogen, phosphorus, potassium];
    if (num_features.some((val) => isNaN(val))) {
      setError('Please enter valid numbers for all numeric fields.');
      setLoading(false);
      return;
    }

    // Convert categorical features by using their indices.
    const soilTypeIndex = soilTypes.indexOf(formData.soilType);
    const cropTypeIndex = cropTypes.indexOf(formData.cropType);
    if (soilTypeIndex === -1 || cropTypeIndex === -1) {
      setError('Invalid soil or crop type selected.');
      setLoading(false);
      return;
    }
    const cat_features = [soilTypeIndex, cropTypeIndex];

    // Build the payload exactly as expected by your backend.
    const payload = {
      num_features,
      cat_features
    };

    console.log('Fertilizer payload:', payload); // For debugging

    try {
      const response = await fertilizerAPI.predict(payload);
      // If response.data is a string, use it directly.
      const recommendation =
        typeof response.data === 'string'
          ? response.data
          : response.data.recommendation;
      navigate('/fertilizer-result', {
        state: {
          result: recommendation,
          // If needed, pass confidence as well:
          confidence: response.data.confidence
        }
      });
    } catch (err) {
      console.error('Full fertilizer error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <FormLayout
        title="Fertilizer Recommendation"
        description="Enter soil composition data for personalized recommendations"
      >
        <form onSubmit={handleSubmit} className="styled-form">
          <div className="form-grid">
            {[
              { label: "Soil Temperature (°C)", key: "temperature" },
              { label: "Soil Humidity (%)", key: "humidity" },
              { label: "Soil Moisture (%)", key: "moisture" },
              { label: "Amount of Nitrogen", key: "nitrogen" },
              { label: "Amount of Phosphorus", key: "phosphorus" },
              { label: "Amount of Potassium", key: "potassium" }
            ].map(({ label, key }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  placeholder={`Enter ${label}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="form-grid">
            {[
              { label: "Soil Type", key: "soilType", options: soilTypes },
              { label: "Crop Type", key: "cropType", options: cropTypes }
            ].map(({ label, key, options }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  required
                >
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner />
                <span className="ms-2">Processing...</span>
              </>
            ) : (
              'Get Recommendation'
            )}
          </button>
        </form>
      </FormLayout>
    </div>
  );
};

export default FertilizerRecommend;