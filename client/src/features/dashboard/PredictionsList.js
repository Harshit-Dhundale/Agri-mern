// client/src/features/dashboard/PredictionsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PredictionsList.css';

const PredictionsList = ({ predictions }) => {
  const navigate = useNavigate();

  const handleAddPrediction = (type) => {
    if (type === 'crop') {
      navigate('/crop-recommendation');
    } else if (type === 'fertilizer') {
      navigate('/fertilizer-recommendation');
    } else if (type === 'disease') {
      navigate('/disease-detection');
    }
  };

  return (
    <div className="predictions-list card">
      <h2>Your Predictions</h2>
      {predictions.length > 0 ? (
        <ul>
          {predictions.map((pred, index) => (
            <li key={index}>
              <strong>{pred.type.toUpperCase()} Prediction:</strong> {pred.result}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-predictions">
          <p>You haven't made any predictions yet. Why not try one of our prediction tools?</p>
          <div className="prediction-buttons">
            <button className="btn btn-primary" onClick={() => handleAddPrediction('crop')}>
              Crop Prediction
            </button>
            <button className="btn btn-primary" onClick={() => handleAddPrediction('fertilizer')}>
              Fertilizer Prediction
            </button>
            <button className="btn btn-primary" onClick={() => handleAddPrediction('disease')}>
              Disease Detection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionsList;