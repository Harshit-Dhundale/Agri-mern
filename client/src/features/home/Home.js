// client/src/features/home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import { useAuth } from '../../context/AuthContext'; // ✅ Import Auth Context
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { currentUser } = useAuth(); // ✅ Get the current user from AuthContext

  const features = [
    {
      title: "Crop Recommendation",
      image: "/assets/home/crop.png",
      description: "Get personalized crop suggestions based on your soil conditions.",
      path: "/crop-recommendation"
    },
    {
      title: "Fertilizer Recommendation",
      image: "/assets/home/fertilizer.png",
      description: "Receive custom fertilizer solutions for optimal yield.",
      path: "/fertilizer-recommendation"
    },
    {
      title: "Disease Detection",
      image: "/assets/home/disease.png",
      description: "Identify plant diseases with AI-powered image analysis.",
      path: "/disease-detection"
    },
    {
      title: "Community Forum",
      image: "/assets/home/forum.png",
      description: "Connect and share with the farming community.",
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
        <section className="hero-section">
          <div className="hero-overlay">
            <h1 className="brand-title">Welcome to FarmiCulture</h1>
            <p className="tagline">Smart Agricultural Solutions for a Sustainable Future</p>
            <p className="welcome-message">
              Empowering farmers with innovative technology and a supportive community. Let’s grow together!
            </p>
            {/* ✅ Show buttons only if the user is NOT logged in */}
            {!currentUser && (
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Existing User? Login</Link>
              </div>
            )}
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Our Features</h2>
          <div className="features-slider">
            <Slider {...sliderSettings}>
              {features.map((feature, index) => (
                <div key={index} className="feature-slide">
                  <div className="feature-card">
                    <div className="feature-image-container">
                      <img src={feature.image} alt={feature.title} className="feature-image" />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <Link to={feature.path} className="feature-link">Learn More</Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
