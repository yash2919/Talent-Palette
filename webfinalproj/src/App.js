import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/Signup"; // Ensure this path is correct
import Login from "./Components/Login";
import "./App.css";
import Navbar from "./Components/Header/Navbar";
import ProfilePage from "./Components/Profile/ProfilePage";
import WelApp from "./Components/wel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WelApp />} />
        <Route path="/" element={<WelApp />} />
        <Route path="/home" element={<Navbar />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
