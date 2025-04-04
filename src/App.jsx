import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; 
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import './App.css'; 

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Mindful-Meals" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;