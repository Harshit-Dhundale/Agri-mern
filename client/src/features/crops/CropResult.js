import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResultLayout } from '../../components/common/ResultLayout';

const CropResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result || 'No result available';

    // ✅ Construct image URL dynamically (Assuming images are in `public/assets/crops/`)
    const imageUrl = `${process.env.PUBLIC_URL}/assets/crops/${result.toLowerCase()}.jpg`;

    return (
        <div className="page-container">
            <ResultLayout title="Crop Recommendation Results">
                <div className="result-card">
                    <h3 className="result-text">
                        Recommended Crop: <span className="highlight">{result}</span>
                    </h3>
                    
                    {/* ✅ Display the crop image */}
                    <div style={{ marginTop: '20px' }}>
                        <img 
                            src={imageUrl} 
                            alt={result} 
                            style={{ maxWidth: '300px', width: '100%', height: 'auto' }} 
                            onError={(e) => { e.target.style.display = 'none'; }} // Hide image if not found
                        />
                    </div>

                    <div className="action-buttons d-flex gap-3 justify-content-center mt-4">
                        <button
                            onClick={() => navigate('/crop-recommendation')}
                            className="primary-button"
                        >
                            New Recommendation
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="secondary-button"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </ResultLayout>
        </div>
    );
};

export default CropResult;
