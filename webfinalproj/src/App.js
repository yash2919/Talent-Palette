import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/Signup"; // Ensure this path is correct
import Login from "./Components/Login";
import "./App.css";
import Navbar from "./Components/Header/Navbar";
import ProfilePage from "./Components/Profile/ProfilePage";
import CreateJobs from "./Components/CreateJobs/CreateJobs"
import WelApp from "./Components/wel";
import Home from "./Components/Home"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelApp />} />
        <Route path="/" element={<WelApp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createjobs" element={<CreateJobs />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
