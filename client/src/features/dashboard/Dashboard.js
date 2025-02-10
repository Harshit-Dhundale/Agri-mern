// client/src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, farmAPI, predictionAPI, forumAPI } from '../../utils/api';
import ProfileCard from './ProfileCard';
import FarmCard from './FarmCard';
import PredictionsList from './PredictionsList';
import ForumPostsList from './ForumPostsList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userRes = await userAPI.get(currentUser._id);
        setUserData(userRes.data);
      } catch (err) {
        setError(err.message || 'Failed to load user data.');
      }
    };

    const loadFarmData = async () => {
      try {
        const farmRes = await farmAPI.get(currentUser._id);
        setFarmData(farmRes.data);
      } catch (err) {
        // If no farm exists, we expect a 404 with message "Farm not found for this user"
        if (err.message && err.message.includes('Farm not found')) {
          setFarmData(null);
        } else {
          setError(err.message || 'Failed to load farm data.');
        }
      }
    };

    const loadPredictions = async () => {
      try {
        const predRes = await predictionAPI.getHistory();
        setPredictions(predRes.data);
      } catch (err) {
        setPredictions([]);
      }
    };

    const loadForumPosts = async () => {
      try {
        // Assume you have implemented /api/posts/user/:userId
        const postsRes = await forumAPI.getUserPosts(currentUser._id);
        setForumPosts(postsRes.data);
      } catch (err) {
        setForumPosts([]);
      }
    };

    if (currentUser) {
      Promise.all([
        loadUserData(),
        loadFarmData(),
        loadPredictions(),
        loadForumPosts(),
      ]).finally(() => setLoading(false));
    }
  }, [currentUser]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="dashboard-error">{error}</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData.username || userData.fullName}!</h1>
      <p className="dashboard-welcome">
        We’re glad to have you here. Explore our features and add your data to get the most out of our platform!
      </p>
      
      <div className="dashboard-section">
        <ProfileCard userData={userData} onUpdate={setUserData} />
      </div>

      <div className="dashboard-section">
        <FarmCard farmData={farmData} onUpdate={setFarmData} />
      </div>

      <div className="dashboard-section">
        <PredictionsList predictions={predictions} />
      </div>

      <div className="dashboard-section">
        <ForumPostsList forumPosts={forumPosts} />
      </div>
    </div>
  );
};

export default Dashboard;