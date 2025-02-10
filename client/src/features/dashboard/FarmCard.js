// client/src/features/dashboard/FarmCard.js
import React, { useState } from 'react';
import FarmDetailsForm from './FarmDetailsForm';
import './FarmCard.css';

const FarmCard = ({ farmData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div className="farm-card card">
      {farmData && !isEditing ? (
        <div className="farm-display">
          <h2>Farm Details</h2>
          <p><strong>Location:</strong> {farmData.location}</p>
          <p><strong>Size:</strong> {farmData.size} acres</p>
          <p><strong>Crops:</strong> {farmData.crops.join(', ')}</p>
          <p><strong>Farm Type:</strong> {farmData.farmType}</p>
          <p><strong>Description:</strong> {farmData.description}</p>
          <button className="btn btn-secondary" onClick={handleEditToggle}>
            Edit Farm Details
          </button>
        </div>
      ) : (
        <div className="farm-edit">
          <h2>{farmData ? 'Edit Farm Details' : 'Add Farm Details'}</h2>
          <FarmDetailsForm
            farmData={farmData}
            onUpdate={(data) => { onUpdate(data); setIsEditing(false); }}
          />
          {farmData && (
            <button className="btn btn-secondary" onClick={handleEditToggle}>
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmCard;