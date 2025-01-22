import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; // Ensure you have a corresponding CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(username,email,password);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ username, email, password });
      const res = await axios.post('http://localhost:5000/api/users/register', body, config);
      console.log(res.data);
      // Redirect or handle the login logic here
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="register-container" style={{ backgroundImage: 'url(/assets/farm-background.jpg)' }}>
      <h1 className="brand-title">FarmiCulture</h1>
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div>
            <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required />
          </div>
          <div>
            <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
        <Link to="/login" className="link">Already have an account? Log in</Link>
      </div>
    </div>
  );
};

export default Register;
