import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        //  alert(data.message);
        navigate("/home");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: "url(/signup.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-md-6 text-center text-md-start">
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
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-grid gap-2 mb-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={login}
                >
                  Log In
                </button>
                <button type="button" className="btn btn-link">
                  Forgot password?
                </button>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-success">
                  Create new account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
