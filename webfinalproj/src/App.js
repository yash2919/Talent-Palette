import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Components/Signup"; // Ensure this path is correct
import Login from "./Components/Login";
import "./App.css";
import Navbar from "./Components/Header/Navbar";
import Landing from "./Components/Landingpage";
import WelApp from "./Components/wel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wel" element={<WelApp />} />
        <Route path="/home" element={<Navbar />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
