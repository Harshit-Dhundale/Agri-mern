// client/src/features/dashboard/FarmCard.js
import React from 'react';
import './FarmCard.css';

const FarmCard = ({ farmData, onUpdate, onDelete, onEdit }) => {
  return (
    <div className="farm-card card">
      <div className="farm-display">
        <h2>{farmData.name || "Unnamed Farm"}</h2>
        <p><strong>Location:</strong> {farmData.location}</p>
        <p><strong>Size:</strong> {farmData.size} acres</p>
        <p><strong>Crops:</strong> {farmData.crops.join(', ')}</p>
        <p><strong>Farm Type:</strong> {farmData.farmType}</p>
        <p><strong>Description:</strong> {farmData.description}</p>
        
        <button className="btn btn-secondary" onClick={() => onEdit(farmData)}>
          Edit Farm Details
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(farmData._id)}>
          Delete Farm
        </button>
      </div>
    </div>
  );
};

export default FarmCard;