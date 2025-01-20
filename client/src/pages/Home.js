import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import the Slider component
import './Home.css';

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="home-container" style={{ backgroundImage: 'url(/assets/farm-background.jpg)' }}>
            <h1 className="brand-title">FarmiCulture</h1>
            <p className="intro-text">Explore the innovative world of agriculture at your fingertips.</p>
            <Slider {...settings}>
                {/* Crop Recommendation */}
                <div className="feature-card">
                    <img src="/assets/crop.png" alt="Crop Recommendation" />
                    <h3>Crop Recommendation</h3>
                    <p>Optimize your yield with AI-driven crop suggestions based on soil conditions.</p>
                </div>

                {/* Fertilizer Recommendation */}
                <div className="feature-card">
                    <img src="/assets/fertilizer.png" alt="Fertilizer Recommendation" />
                    <h3>Fertilizer Recommendation</h3>
                    <p>Get personalized fertilizer solutions to enhance plant growth and productivity.</p>
                </div>

                {/* Disease Detection */}
                <div className="feature-card">
                    <img src="/assets/disease.png" alt="Disease Detection" />
                    <h3>Disease Detection</h3>
                    <p>Early detection of crop diseases using advanced image recognition technology.</p>
                </div>

                {/* Community Forum */}
                <div className="feature-card">
                    <img src="/assets/forum.png" alt="Community Forum" />
                    <h3>Community Forum</h3>
                    <p>Connect with experts and fellow farmers to share insights and advice.</p>
                </div>

                {/* Farm Database Management */}
                <div className="feature-card">
                    <img src="/assets/database.png" alt="Farm Database Management" />
                    <h3>Farm Database Management</h3>
                    <p>Efficient management of your farm data for better decision-making.</p>
                </div>

                {/* Security and Integrity */}
                <div className="feature-card">
                    <img src="/assets/security.png" alt="Security and Integrity" />
                    <h3>Security and Integrity</h3>
                    <p>Secure your agricultural data with robust cybersecurity measures.</p>
                </div>
            </Slider>
            <div className="auth-actions">
                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Home;
