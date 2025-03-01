// client/src/features/dashboard/PredictionsList.js
import React from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import './PredictionsList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PredictionsList = ({ predictions }) => {
  const navigate = useNavigate();

  // Group predictions by type (Crop, Fertilizer, Disease)
  const grouped = predictions.reduce((acc, pred) => {
    const type = pred.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(pred);
    return acc;
  }, {});

  // Render a grid of images with captions for a given type
  const renderImageGrid = (type) => {
    const group = grouped[type];
    if (!group || group.length === 0) return <p>No predictions</p>;

    // Deduplicate: for Disease use imageUrl; for Crop and Fertilizer use recommendation
    let uniquePredictions = [];
    if (type === 'Disease') {
      uniquePredictions = Array.from(new Map(group.map(pred => [pred.imageUrl, pred])).values());
    } else {
      uniquePredictions = Array.from(new Map(group.map(pred => [pred.recommendation, pred])).values());
    }

    return (
      <div className="prediction-grid">
        {uniquePredictions.map((pred, index) => {
          let imgSrc = "";
          let label = "";
          if (type === 'Disease') {
            imgSrc = "/" + pred.imageUrl.replace(/\\/g, "/");
            label = `${pred.crop.charAt(0).toUpperCase() + pred.crop.slice(1)} - ${pred.prediction}`;

          } else if (type === 'Crop') {
            const rec = pred.recommendation.toLowerCase().replace(/\s+/g, '-');
            imgSrc = `/assets/crops/${rec}.jpg`;
            label = pred.recommendation;
          } else if (type === 'Fertilizer') {
            const rec = pred.recommendation.toLowerCase().replace(/\s+/g, '-');
            imgSrc = `/assets/fertilizers/${rec}.jpg`;
            label = pred.recommendation;
          }
          return (
            <div key={index} className="grid-item">
              <img src={imgSrc} alt={`${type} prediction`} />
              <div className="image-label">{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleAddPrediction = (type) => {
    if (type === 'Crop') {
      navigate('/crop-recommendation');
    } else if (type === 'Fertilizer') {
      navigate('/fertilizer-recommendation');
    } else if (type === 'Disease') {
      navigate('/disease-detection');
    }
  };

  // Slider settings for the carousel display
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="predictions-carousel card">
      <h2>Your Predictions</h2>
      <Slider {...sliderSettings}>
        {['Crop', 'Fertilizer', 'Disease'].map((type) => (
          <div key={type} className="prediction-card">
            <h3>{type} Predictions:</h3>
            <div className="prediction-content">
              {renderImageGrid(type)}
            </div>
            <button 
              className="prediction-button" 
              onClick={() => handleAddPrediction(type)}
            >
              {type === 'Disease' ? 'Add Disease Detection' : `Add ${type} Prediction`}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PredictionsList;