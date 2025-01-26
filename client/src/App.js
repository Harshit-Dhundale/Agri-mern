import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import PostDetails from "./pages/PostDetails";
import Crops from "./pages/Crops";
import Disease from "./pages/Disease";
import Fertilizer from "./pages/Fertilizer";
import CropDisease from "./pages/CropDisease";
import CropRecommend from "./pages/CropRecommend";
import FertilizerRecommend from "./pages/FertilizerRecommend";
import DiseasePredictionResult from "./pages/DiseasePredictionResult";
import RecommendResult from "./pages/RecommendResult";
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Styling for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Context for authentication
import { AuthProvider } from './context/AuthContext';

function App() {
  const isAuthenticated = true;  // This should be dynamically set based on your auth logic

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:postId" element={<PostDetails />} />
          <Route path="/crop-disease" element={<CropDisease />} />
          <Route path="/crop-recommendation" element={<CropRecommend />} />
          <Route path="/fertilizer-recommendation" element={<FertilizerRecommend />} />
          <Route path="/disease-prediction-result" element={<DiseasePredictionResult />} />
          <Route path="/recommend-result" element={<RecommendResult />} />
          {/* Protected Route */}
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
