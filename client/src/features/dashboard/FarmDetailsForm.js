// client/src/features/dashboard/FarmDetailsForm.js
import React, { useState } from 'react';
import { farmAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './FarmDetailsForm.css';

const FarmDetailsForm = ({ farmData, onUpdate, userId }) => {
  const [formData, setFormData] = useState({
    name: farmData?.name || '',
    location: farmData?.location || '',
    size: farmData?.size || '',
    crops: farmData?.crops ? farmData.crops.join(', ') : '',
    farmType: farmData?.farmType || '',
    description: farmData?.description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableFarmTypes = ["Organic", "Conventional", "Mixed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const updatedData = {
        ...formData,
        crops: formData.crops.split(',').map(crop => crop.trim()),
      };

      let response;
      if (farmData && farmData._id) {
        response = await farmAPI.update(farmData._id, updatedData);
      } else {
        response = await farmAPI.create({ ...updatedData, createdBy: userId });
      }

      onUpdate(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="farm-details-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Farm Name</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Size (in acres)</label>
          <input 
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Crops Planted (comma separated)</label>
          <input 
            type="text"
            name="crops"
            value={formData.crops}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Farm Type</label>
          <select 
            name="farmType"
            value={formData.farmType}
            onChange={handleChange}
            required
          >
            <option value="">Select Farm Type</option>
            {availableFarmTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? <LoadingSpinner /> : (farmData && farmData._id ? 'Update Farm Details' : 'Create Farm Details')}
        </button>
      </form>
    </div>
  );
};

export default FarmDetailsForm;