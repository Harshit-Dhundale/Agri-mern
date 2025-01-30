import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // Ensure you have a corresponding CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // Password strength state

  const navigate = useNavigate();
  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Password strength checker
    if (e.target.name === "password") {
      const strength = getPasswordStrength(e.target.value);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ username, email, password });
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        body,
        config
      );
      localStorage.setItem("token", res.data.token); // Store the token
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: "url(/assets/farm-background.jpg)" }}
    >
      <h1 className="brand-title">FarmiCulture</h1>
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* Password Strength Indicator */}
          <div>
            <div className="password-strength">
              <div
                className="strength-bar"
                style={{ width: `${passwordStrength * 20}%` }}
              ></div>
            </div>
            <p className="password-strength-text">
              Password Strength: {["Weak", "Fair", "Good", "Strong", "Very Strong"][passwordStrength]}
            </p>
          </div>

          <div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <Link to="/login" className="link">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
