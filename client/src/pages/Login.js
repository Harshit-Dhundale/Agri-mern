import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Ensure you have a corresponding CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5000/api/users/login', body, config);
      console.log(res.data);
      // Redirect or handle the login logic here
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: 'url(/assets/farm-background.jpg)' }}>
      <h1 className="brand-title">FarmiCulture</h1>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div>
            <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <Link to="/register" className="link">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;
