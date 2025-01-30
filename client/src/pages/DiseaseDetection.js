import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiseaseDetection = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(uploadedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('crop', selectedCrop);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/predict_disease', formData);
      navigate('/disease-prediction-result', { state: { result: response.data.prediction, imageFileName: file.name } });
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <div className="container pt-5">
      <h1 className="text-center" style={{ color: '#8CE17D' }}>Crop Disease Prediction</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '30px', width: '80%', margin: 'auto' }}>
        <div className="mb-3">
          <label>Choose a Crop:</label>
          <select
            className="form-control"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="strawberry">Strawberry</option>
            <option value="potato">Potato</option>
            <option value="corn">Corn</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Upload Image:</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        {preview && (
          <div className="text-center">
            <img src={preview} alt="Preview" style={{ maxWidth: '500px', maxHeight: '450px' }} />
          </div>
        )}
        <div className="text-center">
          <button type="submit" className="btn btn-success">Predict</button>
        </div>
      </form>
    </div>
  );
};

export default DiseaseDetection;
