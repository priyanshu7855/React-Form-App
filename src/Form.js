import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountries, getCities } from 'countries-cities';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load all countries on component mount
  useEffect(() => {
    const countries = getCountries();
    setAllCountries(countries.sort());
    setIsLoading(false);
  }, []);

  // Load cities when country changes
  useEffect(() => {
    if (formData.country) {
      const cities = getCities(formData.country);
      setAvailableCities(cities);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) newErrors.panNo = 'PAN number is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) newErrors.panNo = 'PAN number is invalid';
    if (!formData.aadharNo) newErrors.aadharNo = 'Aadhar number is required';
    else if (!/^\d{12}$/.test(formData.aadharNo)) newErrors.aadharNo = 'Aadhar number must be 12 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        navigate('/success', { state: formData });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.phoneNumber &&
      formData.country &&
      formData.city &&
      formData.panNo &&
      formData.aadharNo &&
      Object.keys(errors).length === 0
    );
  };

  if (isLoading) {
    return (
      <div className="form-loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading countries data...</p>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-decoration form-decoration-1"></div>
      <div className="form-decoration form-decoration-2"></div>
      
      <div className="form-container">
        <div className="form-header">
          <h1>Register Now</h1>
          {/* <p>Join our community today</p> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="John"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Doe"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                placeholder="johndoe123"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password*</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Atleat 8 character"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number*</label>
              <div className="phone-input">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1">🇨🇦 +1</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={errors.phoneNumber ? 'error' : ''}
                />
              </div>
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label>Country*</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              >
                <option value="">Select a country</option>
                {allCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label>City*</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.country}
                className={errors.city ? 'error' : ''}
              >
                <option value="">{formData.country ? 'Select a city' : 'Select country first'}</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label>PAN Number*</label>
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className={errors.panNo ? 'error' : ''}
                placeholder="ABCDE1234F"
              />
              {errors.panNo && <span className="error-message">{errors.panNo}</span>}
            </div>

            <div className="form-group">
              <label>Aadhar Number*</label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                className={errors.aadharNo ? 'error' : ''}
                placeholder="123412341234"
              />
              {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="form-footer">
          {/* <p>Already have an account? <a href="/login">Sign in</a></p> */}
        </div>
      </div>
    </div>
  );
};

export default Form;