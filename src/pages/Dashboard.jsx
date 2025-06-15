import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.fullName}</h2>
      <p>You are logged in as <strong>{user.role}</strong>.</p>
      <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;