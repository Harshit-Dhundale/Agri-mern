import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Country, State, City } from "country-state-city";
import "./Register.css";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    gender: "Other",
    phone: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    dob: ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { username, fullName, email, password, gender, phone, country, state, city, pincode, dob } = formData;

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "", city: "" });
    const allStates = State.getStatesOfCountry(selectedCountry);
    setStates(allStates);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });
    const allCities = City.getCitiesOfState(formData.country, selectedState);
    setCities(allCities);
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name !== "country" && name !== "state" && name !== "city") {
      setFormData({ ...formData, [name]: value });
    }
    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
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
    if (!fullName) errors.fullName = "Full name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    if (!city) errors.city = "City is required";
    if (!pincode) errors.pincode = "Pincode is required";
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
        { username, fullName, email, password, gender, phone, country, state, city, pincode, dob },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.token) {
        login(response.data.token);
        navigate("/");
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
    >
      <div className="register-form">
        <h1 className="brand-title">FarmiCulture</h1>
        <h2>Register</h2>
        {errors.form && <p className="error">{errors.form}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-group">
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
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={fullName}
                onChange={onChange}
                required
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <select name="gender" value={gender} onChange={onChange} required>
                <option value="Other">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <select name="country" value={country} onChange={handleCountryChange} required>
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="error">{errors.country}</p>}
            </div>
            <div className="form-group">
              <select name="state" value={state} onChange={handleStateChange} required>
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && <p className="error">{errors.state}</p>}
            </div>
            <div className="form-group">
              <select name="city" value={city} onChange={handleCityChange} required>
                <option value="">Select City</option>
                {cities.map((ct) => (
                  <option key={ct.name} value={ct.name}>
                    {ct.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Pincode"
                name="pincode"
                value={pincode}
                onChange={onChange}
                required
              />
              {errors.pincode && <p className="error">{errors.pincode}</p>}
            </div>
            <div className="form-group password-group full-width">
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
          </div>
          <div className="form-group full-width">
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