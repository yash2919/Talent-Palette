import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/Signup'; // Ensure this path is correct
import Login from './components/Login'
import './App.css';
import logo from './logo.svg';
import ProfilePage from './components/Profile/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/Signup" element={<SignUpForm />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/ProfilePage" element={< ProfilePage/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
