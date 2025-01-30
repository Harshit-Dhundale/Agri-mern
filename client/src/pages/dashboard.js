import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';  // Assuming you have a context to get the current user
import CropRecommend from './CropRecommend';
import FertilizerRecommend from './FertilizerRecommend';
import DiseasePredictionResult from './DiseaseResult';
import Forum from './Forum';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  // Fetch user and farm data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(`/api/users/${currentUser.id}`);
        setUserData(userResponse.data);
        
        const farmResponse = await axios.get(`/api/farms/${currentUser.id}`);
        setFarmData(farmResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.username}</h1>
      <section>
        <h2>User Details</h2>
        <p>Email: {userData?.email}</p>
        <p>Farm Location: {farmData?.location}</p>
        <p>Farm Size: {farmData?.size}</p>
        <p>Crop Type: {farmData?.cropType}</p>
      </section>
      <section>
        <h2>Crop Recommendations</h2>
        <CropRecommend />
      </section>
      <section>
        <h2>Fertilizer Recommendations</h2>
        <FertilizerRecommend />
      </section>
      <section>
        <h2>Disease Predictions</h2>
        <DiseasePredictionResult />
      </section>
      <section>
        <h2>Forum Posts</h2>
        <Forum />
      </section>
    </div>
  );
};

export default Dashboard;
