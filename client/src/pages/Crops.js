import React, { useState } from 'react';
import axios from 'axios';

const Crops = () => {
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorous: '',
        potassium: '',
        soilTemperature: '',
        soilHumidity: '',
        soilPh: '',
        rainfall: ''
    });

    // Destructure formData to use in the component
    const { nitrogen, phosphorous, potassium, soilTemperature, soilHumidity, soilPh, rainfall } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage after login
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Add this line to include the token in the request headers
                }
            };
            const body = JSON.stringify(formData);
            const res = await axios.post('http://localhost:5000/api/crops', body, config);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };
    

    return (
        <form onSubmit={onSubmit}>
            <input type="number" name="nitrogen" value={nitrogen} onChange={onChange} placeholder="Amount of Nitrogen" />
            <input type="number" name="phosphorous" value={phosphorous} onChange={onChange} placeholder="Amount of Phosphorous" />
            <input type="number" name="potassium" value={potassium} onChange={onChange} placeholder="Amount of Potassium" />
            <input type="number" name="soilTemperature" value={soilTemperature} onChange={onChange} placeholder="Soil Temperature" />
            <input type="number" name="soilHumidity" value={soilHumidity} onChange={onChange} placeholder="Soil Humidity" />
            <input type="number" name="soilPh" value={soilPh} onChange={onChange} placeholder="Soil Ph" />
            <input type="number" name="rainfall" value={rainfall} onChange={onChange} placeholder="Amount of Rainfall" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Crops;
