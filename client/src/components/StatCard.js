import React from 'react';

const StatCard = ({ label, value, color, icon }) => {
  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '12px', 
      borderLeft: `5px solid ${color}`, 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#718096', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
          {label}
        </span>
        <div style={{ opacity: 0.8 }}>{icon}</div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px', color: '#2d3748' }}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;