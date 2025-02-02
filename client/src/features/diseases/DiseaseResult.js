import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResultLayout } from '../../components/common/ResultLayout';
import './DiseaseResult.css';

const DiseaseResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, image } = location.state || { 
    prediction: 'No Prediction', 
    image: '/assets/placeholder.jpg' 
  };

  return (
    <div className="page-container">
      <ResultLayout title="Disease Analysis Results">
        <div className="result-card">
          <img
            src={image}
            alt="Analysis preview"
            className="result-image"
          />
          <h3 className="prediction-text">
            Prediction: <span className="highlight">{prediction}</span>
          </h3>
          <button 
            onClick={() => navigate(-1)}
            className="primary-button"
          >
            New Analysis
          </button>
        </div>
      </ResultLayout>
    </div>
  );
};

export default DiseaseResult;
