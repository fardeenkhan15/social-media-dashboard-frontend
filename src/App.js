import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import DashboardPage from './pages/DashboardPage';
import UserProfile from './components/UserProfile';

const App = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    setToken('');
    setUsername('');
    toast.success('Logged out successfully');
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} isLoggedIn={!!token} />
      <ToastContainer />
      <div style={{ marginTop: '10px' }}> {/* Adjust the margin as needed */}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <DashboardPage token={token} username={username} /> : <Navigate to="/login" />} />
          <Route 
          path="/profile" 
          element={token ? <UserProfile /> : <Navigate to="/login" />} 
        />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;