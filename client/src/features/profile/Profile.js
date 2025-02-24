// client/src/features/profile/Profile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../utils/api';
import { Country, State } from 'country-state-city';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EditProfileForm from './EditProfileForm';
import HeroHeader from '../../components/common/HeroHeader';  // Import HeroHeader
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);

  // Utility to format dob as "DD-MMM-YYYY"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userAPI.get(currentUser._id);
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    if (currentUser) {
      fetchUser();
    }
  }, [currentUser]);

  if (!userData) return <LoadingSpinner />;

  // Convert country and state codes to names
  const countryName = Country.getCountryByCode(userData.country)?.name || userData.country;
  const stateName = State.getStateByCodeAndCountry(userData.state, userData.country)?.name || userData.state;
  const formattedDob = userData.dob ? formatDate(userData.dob) : '';

  return (
    <>
      {/* HeroHeader added with background image */}
      <HeroHeader
        title="My Profile"
        subtitle="View and update your personal information here."
        backgroundImage="/assets/head/profile.jpg"  // Path to image in public folder
      />

      <div className="profile-page">
        <div className="profile-card">
          <h1>My Profile</h1>
          {!editing ? (
            <div className="profile-display">
              <div className="profile-image">
                <img
                  src={userData.profilePicture || '/assets/profile.png'}
                  alt="Profile"
                />
              </div>
              <div className="profile-info">
                <p><strong>Full Name:</strong> {userData.fullName}</p>
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Country:</strong> {countryName}</p>
                <p><strong>State:</strong> {stateName}</p>
                <p><strong>City:</strong> {userData.city}</p>
                <p><strong>Pincode:</strong> {userData.pincode}</p>
                <p><strong>Date of Birth:</strong> {formattedDob}</p>
              </div>
              <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit">
              <EditProfileForm
                userData={userData}
                onUpdate={(updatedData) => {
                  setUserData(updatedData);
                  setEditing(false);
                }}
                onCancel={() => setEditing(false)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
