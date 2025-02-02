import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FertilizerResult = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Using useNavigate for navigation
  const { result } = location.state || { result: 'No Result' };

  return (
    <div className="container pt-5">
      <h3 style={{ margin: 'auto', width: '80%', textAlign: 'center', marginTop: '20px', textTransform: 'uppercase' }}>
        Results Of Prediction
      </h3>
      <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
        <h3 style={{ marginTop: '40px' }}>
          <b>Fertilizer Prediction: <span style={{ color: 'green' }}>{result}</span></b>
        </h3>
        <div className="prediction text-center">
          <button
            onClick={() => navigate(-1)} // Navigates back to the previous page
            className="btn btn-primary"
          >
            New Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default FertilizerResult;
