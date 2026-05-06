import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { RestaurantProvider } from './context/RestaurantContext';
import Login from './pages/Login/Login'; 
import Home from './pages/Home/Home';
import ManagerHome from './pages/Manager/ManagerHome';
import ManagerInformation from './pages/Manager/ManagerInformation';
import Addresses from './pages/Account/Addresses';
import MyInformation from './pages/Account/MyInformation';
import Favorites from './pages/Account/Favorites';
import Register from './pages/Register/Register';

function App() {
  return (
    <RestaurantProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            {}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {}
            <Route path="/home" element={<Home />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/account/information" element={<MyInformation />} />
            <Route path="/favorites" element={<Favorites />} />
            
            {}
            <Route path="/manager" element={<ManagerHome />} />
            <Route path="/manager/information" element={<ManagerInformation />} />

            {}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </RestaurantProvider>
  );
}

export default App;