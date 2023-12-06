import React, { useState } from 'react';
// import backgroundImage from './'; 

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log("Form data:", formData);
    } else {
      console.error("Passwords do not match");
    }
  };

  const containerStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px', // Add padding on the sides
  };

  const formStyle = {
    padding: '2rem',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Use gap to add space between form items
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem', // Space between label and input
  };

  const inputStyle = {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '1rem', // Add space before the button
  };



  //api test

  const signup = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      //  navigate('/home');
      } else {
        alert(`SignUp failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during signUp:', error);
      alert('An error occurred during signUp.');
    }
  };



  ////
  return (
    <div style={containerStyle}>
    
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <div>
        <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="fullName"
            style={inputStyle}
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
        <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
        <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
        <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            style={inputStyle}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={signup} style={buttonStyle}>Create new account</button>
      </form>
    </div>
  );
}

export default SignUpForm;
