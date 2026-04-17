import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle, LogOut, UserCircle } from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> }, // '/' se '/dashboard' kar diya
    { path: '/tickets', name: 'Inventory', icon: <Ticket size={20} /> },
    { path: '/create', name: 'Create Ticket', icon: <PlusCircle size={20} /> },
  ];

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#1a202c', // Dark Theme Sidebar
      color: 'white',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
    }}>
      {/* Logo Area */}
      <div style={{ padding: '0 25px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ background: '#3182ce', padding: '8px', borderRadius: '10px' }}>
          <Ticket size={24} />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>SLA Manager</h2>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px 25px',
              textDecoration: 'none',
              color: location.pathname === item.path ? 'white' : '#a0aec0',
              background: location.pathname === item.path ? '#2d3748' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #3182ce' : '4px solid transparent',
              transition: '0.3s'
            }}
          >
            {item.icon}
            <span style={{ fontWeight: '500' }}>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div style={{
        padding: '20px',
        margin: '0 15px 15px',
        background: '#2d3748',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserCircle size={35} color="#3182ce" />
          <div style={{ overflow: 'hidden' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {user?.email.split('@')[0]}
            </p>
            <span style={{ 
              fontSize: '11px', 
              background: user?.role === 'Admin' ? '#c53030' : '#2b6cb0',
              padding: '2px 8px',
              borderRadius: '5px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}>
              {user?.role}
            </span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '10px',
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#c53030'}
          onMouseOut={(e) => e.target.style.background = '#e53e3e'}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;