import React, { useState, useEffect } from 'react'; 
import { predictionAPI } from '../../utils/api';
import './RecentPredictions.css';

const RecentPredictions = ({ userId }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const loadPredictions = async () => {
      const res = await predictionAPI.getRecent(userId);
      setPredictions(res.data);
    };
    loadPredictions();
  }, [userId]);

  return (
    <div className="recent-predictions">
      <h3>Recent Predictions</h3>
      <ul>
        {predictions.map(prediction => (
          <li key={prediction._id}>
            <span className="prediction-type">{prediction.type}</span>
            <span className="prediction-result">{prediction.result}</span>
            <span className="prediction-date">
              {new Date(prediction.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPredictions;