import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../utils/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await authAPI.login(formData);
      localStorage.setItem("token", data.token);

      // Force reload to reflect auth changes
      window.location.replace("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-card">
        <h1 className="brand-title">FarmiCulture</h1>
        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" disabled={isSubmitting} className="auth-button">
              {isSubmitting ? <LoadingSpinner /> : "Login"}
            </button>
          </form>
          
          <div className="auth-footer">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
