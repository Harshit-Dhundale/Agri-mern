import React from 'react';
import CropRecommend from './CropRecommend';
import FertilizerRecommend from './FertilizerRecommend';
import DiseasePredictionResult from './DiseasePredictionResult';
import Forum from './Forum';

const Dashboard = () => {
  // Assume userData and farmData are fetched from the API
  const userData = { username: "JohnDoe", email: "john@example.com" };
  const farmData = { location: "Somewhere", size: "10 acres", cropType: "Corn" };

  return (
    <div className="dashboard">
      <h1>Welcome, {userData.username}</h1>
      <section>
        <h2>User Details</h2>
        <p>Email: {userData.email}</p>
        <p>Farm Location: {farmData.location}</p>
        <p>Farm Size: {farmData.size}</p>
        <p>Crop Type: {farmData.cropType}</p>
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
