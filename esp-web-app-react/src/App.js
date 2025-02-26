import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/style.css';
import PrivateRoute from './components/Common/praivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';
import Profile from './components/user/Profile';
import Settings from './components/settings/Settings';
import CreateShipment from './components/shiping/CreateShipment';
import ShippingCalculator from './components/shiping/ShippingCalculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } />
        <Route path="/create-shipment" element={
          <PrivateRoute>
            <CreateShipment />
          </PrivateRoute>
        } />
        <Route path="/shipping-calculator" element={
          <PrivateRoute>
            <ShippingCalculator />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;