// client/src/features/dashboard/FarmDetailsForm.js
import React, { useState } from 'react';
import { farmAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './FarmDetailsForm.css';

const FarmDetailsForm = ({ farmData, onUpdate }) => {
  // Initialize with existing farmData or defaults
  const [formData, setFormData] = useState({
    location: farmData?.location || '',
    size: farmData?.size || '',
    crops: farmData?.crops ? farmData.crops.join(', ') : '', // Comma-separated list
    farmType: farmData?.farmType || '', // e.g., "Organic", "Conventional", etc.
    description: farmData?.description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // (Optional) Define available farm types (or fetch them from an API)
  const availableFarmTypes = ["Organic", "Conventional", "Mixed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare the data; convert the crops string into an array
      const updatedData = {
        ...formData,
        crops: formData.crops.split(',').map(crop => crop.trim()),
      };

      let response;
      if (farmData && farmData._id) {
        // If farm data exists, update the farm record
        response = await farmAPI.update(farmData._id, updatedData);
      } else {
        // Otherwise, create a new farm record
        response = await farmAPI.create(updatedData);
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

        <div className="form-group">
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
          {isSubmitting ? <LoadingSpinner /> : 
            (farmData && farmData._id ? 'Update Farm Details' : 'Create Farm Details')}
        </button>
      </form>
    </div>
  );
};

export default FarmDetailsForm;