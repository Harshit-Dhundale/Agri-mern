import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Feature Imports
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import CropRecommend from './features/crops/CropRecommend';
import CropResult from './features/crops/CropResult';
import FertilizerRecommend from './features/fertilizers/FertilizerRecommend';
import FertilizerResult from './features/fertilizers/FertilizerResult';
import DiseaseDetection from './features/diseases/DiseaseDetection';
import DiseaseResult from './features/diseases/DiseaseResult';
import Forum from './features/forum/Forum';
import PostDetails from './features/forum/PostDetails';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/:postId" element={<PostDetails />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/crop-recommendation" element={<CropRecommend />} />
                <Route path="/crop-result" element={<CropResult />} /> 
                <Route path="/fertilizer-recommendation" element={<FertilizerRecommend />} />
                <Route path="/fertilizer-result" element={<FertilizerResult />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/disease-result" element={<DiseaseResult />} />
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
