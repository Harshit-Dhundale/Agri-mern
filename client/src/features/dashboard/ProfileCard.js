// client/src/features/dashboard/ProfileCard.js
import React, { useState } from 'react';
import UserProfileForm from './UserProfileForm';
import './ProfileCard.css';

const ProfileCard = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };

  return (
    <div className="profile-card card">
      {!isEditing ? (
        <div className="profile-display">
          <div className="profile-image">
            <img
              src={userData.profilePicture || '/default-profile.png'}
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h2>{userData.fullName}</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            {/* Add other details as desired */}
            <button className="btn btn-secondary" onClick={handleEditToggle}>
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-edit">
          <UserProfileForm
            userData={userData}
            onUpdate={(data) => { onUpdate(data); setIsEditing(false); }}
          />
          <button className="btn btn-secondary" onClick={handleEditToggle}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;