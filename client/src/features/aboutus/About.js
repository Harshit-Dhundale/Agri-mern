// client/src/features/about/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About FarmiCulture</h1>
        <p className="project-date">February 2025</p>
      </header>

      <section className="overview-section">
        <h2>Project Overview</h2>
        <p>
          FarmiCulture is a full‑stack agricultural platform developed using Node.js, Express, React, MongoDB, Python, JWT, and Multer. It features secure user authentication, multi‑farm management, a community forum, and AI‑driven recommendations for crop, fertilizer, and disease detection.
        </p>
      </section>

      <section className="model-section">
        <h2>How Our Models Work</h2>
        <p>
          Our machine learning models are the heart of FarmiCulture. They help farmers make data‑driven decisions by analyzing soil, weather, and crop data. We trained our models using a unified dataset of over 90,000 data points to achieve 92–95% accuracy.
        </p>

        <div className="model-card">
          <h3>Crop Recommendation Model</h3>
          <p>
            <strong>Algorithm:</strong> Naive Bayes<br />
            <strong>How It Works:</strong>  
            Our Crop Recommendation model uses a probabilistic approach. Given input features such as nitrogen, phosphorus, potassium levels, soil temperature, humidity, pH, and rainfall, the model calculates the probability of success for different crops. By using Bayes’ theorem, it recommends the crop with the highest likelihood of thriving under the current conditions.
          </p>
        </div>

        <div className="model-card">
          <h3>Fertilizer Recommendation Model</h3>
          <p>
            <strong>Algorithm:</strong> Random Forest<br />
            <strong>How It Works:</strong>  
            The Fertilizer Recommendation model employs an ensemble learning method that combines multiple decision trees. It analyzes soil parameters—such as temperature, humidity, moisture levels, and nutrient content—to determine the optimal fertilizer. The aggregation of multiple trees helps in reducing overfitting and increases the robustness of the recommendation.
          </p>
        </div>

        <div className="model-card">
          <h3>Disease Detection Model</h3>
          <p>
            <strong>Algorithm:</strong> Convolutional Neural Network (CNN)<br />
            <strong>How It Works:</strong>  
            Our Disease Detection model leverages deep learning. The CNN processes images of crops to identify visual patterns and symptoms of disease. It learns from thousands of labeled images to detect conditions like Apple Scab or Cedar Apple Rust with high accuracy. The model's layered architecture automatically extracts and learns complex features, making it effective at early disease detection.
          </p>
        </div>
      </section>

      <section className="feature-benefits-section">
        <h2>How Our Features Help</h2>
        <p>
          By integrating these advanced models into a user-friendly platform, FarmiCulture enables farmers to:
        </p>
        <ul>
          <li>Receive real‑time crop and fertilizer recommendations tailored to their soil conditions.</li>
          <li>Detect plant diseases early, allowing for prompt intervention.</li>
          <li>Manage multiple farms effortlessly with comprehensive data insights.</li>
          <li>Collaborate and share knowledge with a vibrant farming community.</li>
        </ul>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 FarmiCulture. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;