import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const formData = location.state || {};

  return (
    <div className="success-container">
      <h1>Registration Successful!</h1>
      <h2>Submitted Details:</h2>
      <div className="details">
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneCode} {formData.phoneNumber}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>PAN Number:</strong> {formData.panNo}</p>
        <p><strong>Aadhar Number:</strong> {formData.aadharNo}</p>
      </div>
    </div>
  );
};

export default Success;