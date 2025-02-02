import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseaseAPI } from '../../utils/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FormLayout } from '../../components/common/FormLayout';
import './DiseaseDetection.css';

const DiseaseDetection = () => {
    const [formData, setFormData] = useState({
        crop: '',
        file: null
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // List of crops
    const crop_list = [
        'strawberry', 'potato', 'corn', 'apple', 
        'cherry', 'grape', 'peach', 'pepper', 'tomato'
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({...formData, file});
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
            
            const response = await diseaseAPI.predict(formPayload);
            console.log("API Response:", response.data);
            navigate('/disease-result', {
                state: {
                    prediction: response.data.prediction,
                    image: URL.createObjectURL(formData.file)
                }
            });
        } catch (error) {
            setError(error.response?.data?.error || 'Prediction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                            onChange={(e) => setFormData({...formData, crop: e.target.value})}
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
    );
};

export default DiseaseDetection;
