// client/src/features/dashboard/PredictionsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PredictionsList.css';

const PredictionsList = ({ predictions }) => {
  const navigate = useNavigate();

  // Group predictions by type (assumed to be 'Crop', 'Fertilizer', 'Disease')
  const grouped = predictions.reduce((acc, pred) => {
    const type = pred.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(pred);
    return acc;
  }, {});

  // Render the predictions for a given type as a single line, comma-separated.
  const renderGroupForType = (type) => {
    if (!grouped[type] || grouped[type].length === 0) {
      return "No predictions";
    }
    const items = grouped[type]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(pred => type === 'Disease' ? pred.prediction : pred.recommendation);
    return items.join(', ');
  };

  const handleAddPrediction = (type) => {
    if (type === 'Crop') {
      navigate('/crop-recommendation');
    } else if (type === 'Fertilizer') {
      navigate('/fertilizer-recommendation');
    } else if (type === 'Disease') {
      navigate('/disease-detection');
    }
  };

  return (
    <div className="predictions-list card">
      <h2>Your Predictions</h2>
      {predictions.length > 0 ? (
        <>
          {grouped.Crop && (
            <div className="prediction-group">
              <h3>Crop Predictions:</h3>
              <p>{renderGroupForType('Crop')}</p>
              <button className="btn btn-link" onClick={() => handleAddPrediction('Crop')}>
                Add Crop Prediction
              </button>
            </div>
          )}
          {grouped.Fertilizer && (
            <div className="prediction-group">
              <h3>Fertilizer Predictions:</h3>
              <p>{renderGroupForType('Fertilizer')}</p>
              <button className="btn btn-link" onClick={() => handleAddPrediction('Fertilizer')}>
                Add Fertilizer Prediction
              </button>
            </div>
          )}
          {grouped.Disease && (
            <div className="prediction-group">
              <h3>Disease Predictions:</h3>
              <p>{renderGroupForType('Disease')}</p>
              <button className="btn btn-link" onClick={() => handleAddPrediction('Disease')}>
                Add Disease Detection
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-predictions">
          <p>You haven't made any predictions yet. Why not try one of our prediction tools?</p>
          <div className="prediction-buttons">
            <button className="btn btn-primary" onClick={() => handleAddPrediction('Crop')}>
              Crop Prediction
            </button>
            <button className="btn btn-primary" onClick={() => handleAddPrediction('Fertilizer')}>
              Fertilizer Prediction
            </button>
            <button className="btn btn-primary" onClick={() => handleAddPrediction('Disease')}>
              Disease Detection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionsList;