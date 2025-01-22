import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const Fertilizers = () => {
    const [fertilizerData, setFertilizerData] = useState([]);
    const [formData, setFormData] = useState({
        soilTemperature: '',
        soilHumidity: '',
        soilMoisture: '',
        nitrogen: '',
        phosphorous: '',
        potassium: '',
        soilType: '',
        cropType: ''
    });
    const [error, setError] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('http://localhost:5000/api/fertilizers', body, config);
            setFertilizerData(fertilizerData => [...fertilizerData, res.data]);
            console.log('Fertilizer added:', res.data);
            setFormData({
                soilTemperature: '',
                soilHumidity: '',
                soilMoisture: '',
                nitrogen: '',
                phosphorous: '',
                potassium: '',
                soilType: '',
                cropType: ''
            });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting data');
            console.error(err.response?.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://localhost:5000/api/fertilizers');
                setFertilizerData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Fertilizer Recommendations</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={onSubmit}>
                {/* Form inputs remain the same */}
                <button type="submit">Add Fertilizer Data</button>
            </form>
            {fertilizerData.map(item => (
                <div key={item._id}>
                    <p>Soil Type: {item.soilType}, Crop Type: {item.cropType}</p>
                </div>
            ))}
        </div>
    );
};

export default Fertilizers;
