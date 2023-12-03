import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/Login");
  };

  const signup = async () => {
    const email = formData.email;
    const password = formData.password;
    const fullName = formData.fullName;
    const role = "artist";

    try {
      const response = await fetch("http://localhost:3000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, role, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        //  navigate('/home');
      } else {
        alert(`SignUp failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during signUp:", error);
      alert("An error occurred during signUp.");
    }
  };


  

  

//   return (
//     <div
//       className="vh-100 d-flex align-items-center justify-content-center"
//       style={{
//         // backgroundImage: "url(/artistic.jpg)",
//         backgroundColor:"#008b8b",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
        
//       }}
//     >
//       <div className="container" >
//         <div className="row justify-content-center">
//           <div className="col-md-4 col-lg-5">
//             {" "}
//             {/* Adjust col sizes as needed */}
//             <form
//               onSubmit={handleSubmit}
//               className="p-4 rounded shadow"
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust opacity as needed
//               }}
//             >
//               <h2 className="text-center mb-4">Sign Up</h2>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   className="form-control"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Role</label>
//                 <input
//                   type="role"
//                   name="role"
//                   className="form-control"
//                   value={formData.role}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="form-label">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   className="form-control"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button
//                 type="submit"

//                 className="btn btn-primary w-100" 
//               >
//                 {" "}
//                 Create new account
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpForm;


  

  return (
    <>

<style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
     
      <div className="vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #00008b 0%, #c3cfe2 100%)' }}>
        <div className="card" style={{ minWidth: '900px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)' }}>
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body p-5">
                <h3 className="card-title text-center" style={{ color: '#333' }}>Sign Up</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      placeholder="Role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" style={{backgroundColor: '#7c4dff' }}>
                    Create new account
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#7c4dff' }}>
            <div className="text-center w-100">
              <h3 className="text-white mb-3" style={{ animation: 'fadeIn 2s ease-in-out' }}>Hey, Welcome!</h3>
              <p className="text-white px-5" style={{ animation: 'fadeIn 2s ease-in-out' }}>Join us and share your art with the world.</p>
                </div>
                </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default SignUpForm;