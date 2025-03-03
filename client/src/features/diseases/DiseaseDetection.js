// client/src/features/diseases/DiseaseDetection.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseaseAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FormLayout } from '../../components/common/FormLayout';
import HeroHeader from '../../components/common/HeroHeader'; // Import HeroHeader
import './DiseaseDetection.css';  // Ensure you have styles for the component

const DiseaseDetection = () => {
  const [formData, setFormData] = useState({
    crop: '',
    file: null
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const crop_list = [
    'strawberry', 'potato', 'corn', 'apple', 
    'cherry', 'grape', 'peach', 'pepper', 'tomato'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('crop', formData.crop);
      formPayload.append('file', formData.file);
  
      // Call the new Node endpoint to both predict and store the disease record
      const response = await diseaseAPI.create(formPayload);
      console.log("API Response (Node):", response.data);
      
      navigate('/disease-result', {
        state: {
          prediction: response.data.prediction,
          image: URL.createObjectURL(formData.file),
        },
      });
    } catch (error) {
      console.error("Error in disease detection submit:", error);
      setError(error.response?.error || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HeroHeader with background image */}
      <HeroHeader
        title="Crop Disease Detection"
        subtitle="Upload leaf images to detect plant diseases early."
        backgroundImage="/assets/head/dis.jpg"  // Path to image in public folder
      />

      <div className="page-container">
        <FormLayout 
          title="Crop Disease Detection" 
          description="Upload an image of your crop leaves for analysis"
        >
          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-group">
              <label>Select Crop Type</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                required
              >
                <option value="">Select a crop</option>
                {crop_list.map((crop, index) => (
                  <option key={index} value={crop}>
                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Upload Leaf Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Upload preview" />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Analyze Image'}
            </button>
          </form>
        </FormLayout>
      </div>
    </>
  );
};

export default DiseaseDetection;
