// client/src/features/dashboard/UserProfileForm.js
import React, { useState } from 'react';
import { userAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './UserProfileForm.css';

const UserProfileForm = ({ userData, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    email: userData.email || '',
    phone: userData.phone || '',
    profilePicture: null, // We'll store the File here if updated
    // You can add other fields as desired.
  });
  const [preview, setPreview] = useState(userData.profilePicture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profilePicture: file });
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Create FormData if there's a file upload; otherwise send JSON.
      let updateData;
      if (formData.profilePicture) {
        updateData = new FormData();
        updateData.append('fullName', formData.fullName);
        updateData.append('email', formData.email);
        updateData.append('phone', formData.phone);
        updateData.append('profilePicture', formData.profilePicture);
      } else {
        updateData = { fullName: formData.fullName, email: formData.email, phone: formData.phone };
      }

      const response = await userAPI.update(userData._id, updateData);
      onUpdate(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-profile-form">
      {preview && (
        <div className="profile-picture">
          <img src={preview} alt="Profile Preview" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input 
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input 
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? <LoadingSpinner /> : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;