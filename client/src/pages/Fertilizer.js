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

    const { soilTemperature, soilHumidity, soilMoisture, nitrogen, phosphorous, potassium, soilType, cropType } = formData;

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
            setFertilizerData([...fertilizerData, res.data]);
            console.log('Fertilizer added:', res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:5000/api/fertilizers');
            setFertilizerData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Fertilizer Recommendations</h1>
            <form onSubmit={onSubmit}>
                <input type="number" name="soilTemperature" value={soilTemperature} onChange={onChange} placeholder="Soil Temperature" />
                <input type="number" name="soilHumidity" value={soilHumidity} onChange={onChange} placeholder="Soil Humidity" />
                <input type="number" name="soilMoisture" value={soilMoisture} onChange={onChange} placeholder="Soil Moisture" />
                <input type="number" name="nitrogen" value={nitrogen} onChange={onChange} placeholder="Amount of Nitrogen" />
                <input type="number" name="phosphorous" value={phosphorous} onChange={onChange} placeholder="Amount of Phosphorous" />
                <input type="number" name="potassium" value={potassium} onChange={onChange} placeholder="Amount of Potassium" />
                <input type="text" name="soilType" value={soilType} onChange={onChange} placeholder="Soil Type" />
                <input type="text" name="cropType" value={cropType} onChange={onChange} placeholder="Crop Type" />
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
