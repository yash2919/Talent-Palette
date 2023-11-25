import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/Signup'; // Ensure this path is correct
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<SignUpForm />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
