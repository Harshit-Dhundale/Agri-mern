// client/src/features/profile/EditProfileForm.js
import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import { userAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './EditProfileForm.css';

const EditProfileForm = ({ userData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    email: userData.email || '',
    phone: userData.phone || '',
    gender: userData.gender || 'Other',
    country: userData.country || '',
    state: userData.state || '',
    city: userData.city || '',
    pincode: userData.pincode || '',
    dob: userData.dob ? userData.dob.split('T')[0] : '', // only date part
    profilePicture: null, // For file uploads
  });
  const [preview, setPreview] = useState(userData.profilePicture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState('');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // When country changes, update states
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: '', city: '' });
    setStates(State.getStatesOfCountry(selectedCountry));
    setCities([]);
  };

  // When state changes, update cities
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
    setCities(City.getCitiesOfState(formData.country, selectedState));
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

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
    setErrors('');

    try {
      let updateData;
      if (formData.profilePicture) {
        updateData = new FormData();
        updateData.append('fullName', formData.fullName);
        updateData.append('email', formData.email);
        updateData.append('phone', formData.phone);
        updateData.append('gender', formData.gender);
        updateData.append('country', formData.country);
        updateData.append('state', formData.state);
        updateData.append('city', formData.city);
        updateData.append('pincode', formData.pincode);
        updateData.append('dob', formData.dob);
        updateData.append('profilePicture', formData.profilePicture);
      } else {
        updateData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
          dob: formData.dob,
        };
      }

      const res = await userAPI.update(userData._id, updateData);
      onUpdate(res.data);
    } catch (err) {
      setErrors(err.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      {preview && (
        <div className="profile-image-preview">
          <img src={preview} alt="Profile Preview" />
        </div>
      )}
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="Other">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleCountryChange} required>
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>State</label>
        <select name="state" value={formData.state} onChange={handleStateChange} required>
          <option value="">Select State</option>
          {states.map(s => (
            <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleCityChange} required>
          <option value="">Select City</option>
          {cities.map(ct => (
            <option key={ct.name} value={ct.name}>{ct.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Pincode</label>
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
      </div>
      {errors && <p className="error-message">{errors}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : 'Save Changes'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;