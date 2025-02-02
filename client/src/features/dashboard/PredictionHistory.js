import React, { useState, useEffect } from 'react'; 
import { predictionAPI } from '../../utils/api';
import './PredictionHistory.css';

const PredictionHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await predictionAPI.getHistory(userId);
      setHistory(res.data);
    };
    loadHistory();
  }, [userId]);

  return (
    <div className="prediction-history">
      <h3>Prediction History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Inputs</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map(entry => (
            <tr key={entry._id}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.type}</td>
              <td>
                <ul>
                  {Object.entries(entry.inputs).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </td>
              <td>{entry.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionHistory;