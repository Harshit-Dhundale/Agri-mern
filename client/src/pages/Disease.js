import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Diseases = () => {
    const [diseaseData, setDiseaseData] = useState([]);
    const [formData, setFormData] = useState({
        crop: '',
        imageUrl: ''
    });

    const { crop, imageUrl } = formData;

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
            const res = await axios.post('http://localhost:5000/api/diseases', body, config);
            setDiseaseData([...diseaseData, res.data]);
            console.log('Disease data added:', res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:5000/api/diseases');
            setDiseaseData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Disease Predictions</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="crop" value={crop} onChange={onChange} placeholder="Crop Name" />
                <input type="text" name="imageUrl" value={imageUrl} onChange={onChange} placeholder="Image URL" />
                <button type="submit">Add Disease Data</button>
            </form>
            {diseaseData.map(item => (
                <div key={item._id}>
                    <p>Crop: {item.crop}, Image URL: <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a></p>
                </div>
            ))}
        </div>
    );
};

export default Diseases;
