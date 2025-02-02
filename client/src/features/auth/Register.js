import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; // Import AuthContext
import "./Register.css"; // Ensure you have a corresponding CSS file

const Register = () => {
  const { login } = useAuth(); // Get login function from AuthContext
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
      setPasswordStrength(getPasswordStrength(e.target.value));
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
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        login(response.data.token); // Use AuthContext to log in user
        navigate("/dashboard"); // Redirect to dashboard after registration
      }
    } catch (error) {
      setErrors({
        form: error.response?.data?.errors?.[0]?.msg || "Registration failed. Please try again.",
      });
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
        {errors.form && <p className="error">{errors.form}</p>}
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
