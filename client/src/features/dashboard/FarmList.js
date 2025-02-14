// client/src/features/dashboard/FarmList.js
import React, { useState } from 'react';
import FarmCard from './FarmCard';
import FarmDetailsForm from './FarmDetailsForm';
import { farmAPI } from '../../utils/api';
import './FarmList.css';

const FarmList = ({ farms, setFarms, userId }) => {
  const [adding, setAdding] = useState(false);

  const handleAddNew = (newFarm) => {
    setFarms([...farms, newFarm]);
    setAdding(false);
  };

  const handleUpdateFarm = (updatedFarm) => {
    const updatedFarms = farms.map(farm =>
      farm._id === updatedFarm._id ? updatedFarm : farm
    );
    setFarms(updatedFarms);
  };

  const handleDeleteFarm = async (farmId) => {
    try {
      await farmAPI.delete(farmId);
      setFarms(farms.filter(farm => farm._id !== farmId));
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  return (
    <div className="farm-list card">
      <h2>Your Farms</h2>
      {farms.length > 0 ? (
        farms.map(farm => (
          <FarmCard
            key={farm._id}
            farmData={farm}
            onUpdate={handleUpdateFarm}
            onDelete={handleDeleteFarm}
          />
        ))
      ) : (
        <p>You haven't added any farms yet.</p>
      )}
      {adding ? (
        <div className="farm-add-form">
          <h3>Add New Farm</h3>
          <FarmDetailsForm 
            farmData={null} 
            onUpdate={handleAddNew} 
            userId={userId}
          />
          <button className="btn btn-secondary" onClick={() => setAdding(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setAdding(true)}>
          Add New Farm
        </button>
      )}
    </div>
  );
};

export default FarmList;