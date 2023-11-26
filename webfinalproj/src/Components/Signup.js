import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
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
  

  const signup = async () => {
    const email = formData.email;
    const password = formData.password;
    const fullName=formData.fullName;
    const role="artist"

    try {
      const response = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {fullName,role,email,password} ),
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

  
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center"
         style={{ 
           backgroundImage: 'url(/signup.jpg)', 
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
         }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 col-lg-5"> {/* Adjust col sizes as needed */}
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
              <h2 className="text-center mb-4">Sign Up</h2>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button type="submit"   onClick={signup}  className="btn btn-primary w-100"> Create new account</button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;