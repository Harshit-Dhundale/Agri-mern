import React, { useState, useEffect, useCallback } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { userAPI, farmAPI } from '../../utils/api';
import FarmDetailsForm from './FarmDetailsForm'; // Create this component
import RecentPredictions from './RecentPredictions'; // Create this component
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import CropRecommend from '../crops/CropRecommend';
import FertilizerRecommend from '../fertilizers/FertilizerRecommend';
import Forum from '../forum/Forum';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

// Replace the existing useEffect with:
const loadData = useCallback(async () => {
  try {
    const [userRes, farmRes] = await Promise.all([
      userAPI.get(currentUser.id),
      farmAPI.get(currentUser.id)
    ]);
    setUserData(userRes.data);
    setFarmData(farmRes.data);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to load data');
  } finally {
    setLoading(false);
  }
}, [currentUser.id]);

useEffect(() => {
  if (currentUser) loadData();
}, [currentUser, loadData]);

  const handleFarmUpdate = async (updatedData) => {
    try {
      const res = await farmAPI.update(farmData._id, updatedData);
      setFarmData(res.data);
    } catch (err) {
      setError('Failed to update farm details');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {userData?.username} 👋</h1>
        <p className="last-login">Last login: {new Date(userData?.lastLogin).toLocaleString()}</p>
      </header>

      <section className="farm-section">
        <h2>🏡 Farm Management</h2>
        <FarmDetailsForm 
          initialData={farmData} 
          onSubmit={handleFarmUpdate} 
        />
        <div className="farm-stats">
          <div className="stat-card">
            <h3>Total Area</h3>
            <p>{farmData?.size || 0} acres</p>
          </div>
          <div className="stat-card">
            <h3>Current Crops</h3>
            <p>{farmData?.crops?.join(', ') || 'None'}</p>
          </div>
        </div>
      </section>

      <section className="recommendations-section">
        <h2>📈 Recommendations</h2>
        <div className="recommendations-grid">
          <div className="recommendation-card">
            <h3>Crop Suggestions</h3>
            <CropRecommend />
          </div>
          <div className="recommendation-card">
            <h3>Fertilizer Plan</h3>
            <FertilizerRecommend />
          </div>
        </div>
      </section>

      <section className="community-section">
        <h2>🌱 Community Activity</h2>
        <div className="community-grid">
          <div className="community-card">
            <h3>Recent Forum Posts</h3>
            <Forum />
          </div>
          <div className="community-card">
            <h3>Your Contributions</h3>
            <RecentPredictions userId={currentUser.id} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;