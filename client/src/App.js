import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/Chat';
import Signup from './pages/Signup';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 🛰️ Backend se Tickets Fetch karne ka logic ---
  const fetchTickets = async () => {
    try {
      // Backend URL (Port 5000)
      const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets'); 
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tickets from DB:", err);
      setLoading(false);
    }
  };

  // Jab user login ho, tabhi tickets fetch karein
  useEffect(() => {
    if (user) {
      fetchTickets();
      const interval = setInterval(fetchTickets, 30000); // Har 30 sec mein refresh
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setTickets([]);
    localStorage.clear(); // Token aur role clear karne ke liye
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7fafc' }}>
      
      {/* Sidebar: Sirf Login ke baad dikhega */}
      {user && <Sidebar user={user} onLogout={handleLogout} />}

      <div style={{
        flex: 1,
        padding: user ? '30px' : '0px',
        marginLeft: user ? '260px' : '0px',
        transition: 'margin 0.3s',
        width: '100%'
      }}>
        <Routes>
          {/* 1. Public Routes (Login/Signup) */}
          {/* Root path logic */}
          <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          
          {/* 👈 FIX: Ye line email link (localhost:3000/login) ko support karegi */}
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />

          {/* 2. Protected Routes (PrivateRoute wrap kiya gaya hai) */}
          <Route path="/dashboard" element={
            <PrivateRoute user={user}>
              <Dashboard tickets={tickets} />
            </PrivateRoute>
          } />

          <Route path="/tickets" element={
            <PrivateRoute user={user}>
              <TicketList tickets={tickets} fetchTickets={fetchTickets} />
            </PrivateRoute>
          } />

          <Route path="/create" element={
            <PrivateRoute user={user}>
              <CreateTicket fetchTickets={fetchTickets} />
            </PrivateRoute>
          } />

          {/* Redirect agar koi galat URL daale */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Floating Chat: Sirf Login ke baad */}
        {user && <Chat user={user} />}
      </div>
    </div>
  );
}

export default App;