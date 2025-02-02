import React, { useState, useEffect } from 'react';
import './FarmDetailsForm.css';

const FarmDetailsForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    size: '',
    crops: [],
    soilType: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        location: initialData.location || '',
        size: initialData.size || '',
        crops: initialData.crops || [],
        soilType: initialData.soilType || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="farm-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Size (acres)</label>
        <input
          type="number"
          value={formData.size}
          onChange={(e) => setFormData({...formData, size: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Soil Type</label>
        <select
          value={formData.soilType}
          onChange={(e) => setFormData({...formData, soilType: e.target.value})}
          required
        >
          <option value="">Select Soil Type</option>
          <option value="clay">Clay</option>
          <option value="sandy">Sandy</option>
          <option value="loam">Loam</option>
        </select>
      </div>
      <button type="submit" className="save-button">
        Save Changes
      </button>
    </form>
  );
};

export default FarmDetailsForm;