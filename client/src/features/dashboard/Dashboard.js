// client/src/features/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI, farmAPI, cropAPI, fertilizerAPI, diseaseAPI, forumAPI } from '../../utils/api';
import FarmList from './FarmList';
import PredictionsList from './PredictionsList';
import ForumPostsList from './ForumPostsList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import HeroHeader from '../../components/common/HeroHeader';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [farms, setFarms] = useState([]); // Array of farms now
  const [predictions, setPredictions] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await userAPI.get(currentUser._id);
        setUserData(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load user data.');
      }
    };

    const loadFarms = async () => {
      try {
        const res = await farmAPI.get(currentUser._id);
        setFarms(res.data);
      } catch (err) {
        setFarms([]);
      }
    };

    const loadPredictions = async () => {
      try {
        const [cropRes, fertRes, diseaseRes] = await Promise.all([
          cropAPI.getUserPredictions(currentUser._id),
          fertilizerAPI.getUserPredictions(currentUser._id),
          diseaseAPI.getUserPredictions(currentUser._id),
        ]);
        const cropPreds = cropRes.data.map(item => ({ ...item, type: 'Crop' }));
        const fertPreds = fertRes.data.map(item => ({ ...item, type: 'Fertilizer' }));
        const diseasePreds = diseaseRes.data.map(item => ({ ...item, type: 'Disease' }));
        const combined = [...cropPreds, ...fertPreds, ...diseasePreds];
        combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPredictions(combined);
      } catch (err) {
        setPredictions([]);
      }
    };

    const loadForumPosts = async () => {
      try {
        const res = await forumAPI.getUserPosts(currentUser._id);
        setForumPosts(res.data);
      } catch (err) {
        setForumPosts([]);
      }
    };

    if (currentUser) {
      Promise.all([
        loadUserData(),
        loadFarms(),
        loadPredictions(),
        loadForumPosts(),
      ]).finally(() => setLoading(false));
    }
  }, [currentUser]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="dashboard-error">{error}</p>;

  return (
    <>
      <HeroHeader
        title="Your Dashboard"
        subtitle="Manage your farms, view predictions, and stay updated in one place."
        backgroundImage="/assets/head/dash.jpg"
      />
      <div className="dashboard-container">
        <h1>Welcome, {userData.username || userData.fullName}!</h1>
        <p className="dashboard-welcome">
          We’re glad to have you here. Explore our features and add your data to get the most out of our platform!
        </p>
        
        {/* Two-column grid for Farms and Predictions */}
        <div className="dashboard-top-grid">
          <div className="dashboard-section">
            <FarmList farms={farms} setFarms={setFarms} userId={currentUser._id} />
          </div>
          <div className="dashboard-section">
            <PredictionsList predictions={predictions} />
          </div>
        </div>

        {/* Forum Posts Section – full width */}
        <div className="dashboard-section">
          <ForumPostsList forumPosts={forumPosts} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
