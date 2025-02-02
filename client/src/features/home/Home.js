import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const features = [
    {
      title: "Crop Recommendation",
      image: "/assets/crop.png",
      description: "AI-driven crop suggestions based on soil conditions",
      path: "/crop-recommendation"
    },
    {
      title: "Fertilizer Recommendation",
      image: "/assets/fertilizer.png",
      description: "Personalized fertilizer solutions",
      path: "/fertilizer-recommendation"
    },
    {
      title: "Disease Detection",
      image: "/assets/disease.png",
      description: "Image-based disease detection",
      path: "/disease-detection"
    },
    {
      title: "Community Forum",
      image: "/assets/forum.png",
      description: "Connect with farming community",
      path: "/forum"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <ErrorBoundary>
      <div className="home-container">
        <div className="hero-section">
          <h1 className="brand-title">FarmiCulture</h1>
          <p className="tagline">Smart Agricultural Solutions</p>
        </div>

        <div className="features-slider">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="feature-slide">
                <div className="feature-content">
                  <img src={feature.image} alt={feature.title} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link to={feature.path} className="feature-link">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="auth-actions">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Existing User? Login
          </Link>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;