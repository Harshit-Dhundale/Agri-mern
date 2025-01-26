import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import './styles/tailwind.css';


// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import PostDetails from "./pages/PostDetails";
import Crops from "./pages/Crops";
import Disease from "./pages/Disease";
import Dashboard from './components/Dashboard';
import Fertilizer from "./pages/Fertilizer";
import CropDisease from "./pages/CropDisease";
import CropRecommend from "./pages/CropRecommend";
import FertilizerRecommend from "./pages/FertilizerRecommend";
import DiseasePredictionResult from "./pages/DiseasePredictionResult";
import RecommendResult from "./pages/RecommendResult";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Context
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
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
            <Route path="/" exact component={Dashboard} />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
