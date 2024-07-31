import React, { } from 'react';
import './App.css';
  
import {BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
  
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">   
      
        <BrowserRouter>
          <Routes>

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
   
export default App;
