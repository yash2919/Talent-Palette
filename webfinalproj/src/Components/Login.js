import React from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
      //  navigate('/home');
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form id="loginForm">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" required />
        </div>
        <button type="button" className="btn btn-primary" onClick={login}>Login</button>
      </form>
    </div>
  );
}

export default Login;