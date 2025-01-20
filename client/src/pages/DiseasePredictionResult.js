import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DiseasePredictionResult = () => {
  const location = useLocation();
  const { result, imageFileName } = location.state || { result: 'No Result', imageFileName: 'default.png' };

  return (
    <div className="container pt-5">
      <h3 style={{ margin: 'auto', width: '80%', textAlign: 'center', marginTop: '20px', textTransform: 'uppercase' }}>
        Results Of Prediction
      </h3>
      <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
        <img
          src={`/uploads/${imageFileName}`}
          alt="Uploaded"
          style={{ maxWidth: '500px', maxHeight: '450px', marginTop: '30px', marginBottom: '10px' }}
        />
        <p style={{ fontStyle: 'italic' }}>{imageFileName}</p>
        <h3 style={{ marginTop: '40px' }}>
          <b>Prediction: <span style={{ color: 'green' }}>{result}</span></b>
        </h3>
        <div className="prediction text-center">
          <Link to="/" className="btn btn-success">Back Home</Link>
        </div>
      </div>
    </div>
  );
};

export default DiseasePredictionResult;
