import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/home');
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="container-fluid py-5" style={{ 
        backgroundImage: 'url(/artistic.jpg)', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center' // This ensures the image is centered in the container
      }}>
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-md-6 text-center text-md-start">
          {/* Marquee tag for scrolling text */}
          <h1 className="display-4">Talent Palette</h1>
          <marquee behavior="scroll" direction="left" scrollamount="5">
            
            <p className="lead d-none d-md-block">
            Connect with talents and the world around you on Talent Palette.
          </p>
          </marquee>
          
        </div>

        <div className="col-md-4">
          <div className="card p-4 shadow">
            <form onSubmit={login}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-primary">Log In</button>
                <button type="button" className="btn btn-link">Forgot password?</button>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-success">Create new account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;