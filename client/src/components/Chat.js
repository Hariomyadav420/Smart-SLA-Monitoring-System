import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('https://sla-backend-otk0.onrender.com');

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChatLog((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message !== "") {
      const msgData = {
        user: user.name,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', msgData);
      setMessage("");
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={chatButtonStyle}>💬 Live Support Chat</button>
      ) : (
        <div style={chatWindowStyle}>
          <div style={chatHeaderStyle}>
            <span>Internal Team Chat</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>X</button>
          </div>
          <div style={messageBoxStyle}>
            {chatLog.map((msg, i) => (
              <div key={i} style={{ marginBottom: '10px', textAlign: msg.user === user.name ? 'right' : 'left' }}>
                <b style={{ fontSize: '10px' }}>{msg.user}</b>
                <div style={msg.user === user.name ? myMsgStyle : otherMsgStyle}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '10px' }}>
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..." 
              style={{ flex: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button onClick={sendMessage} style={{ marginLeft: '5px', background: '#3182ce', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS-in-JS Styles
const chatButtonStyle = { background: '#3182ce', color: 'white', padding: '12px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const chatWindowStyle = { width: '300px', height: '400px', background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden' };
const chatHeaderStyle = { background: '#3182ce', color: 'white', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' };
const messageBoxStyle = { flex: 1, padding: '10px', overflowY: 'auto', background: '#f7fafc' };
const myMsgStyle = { background: '#3182ce', color: 'white', padding: '8px', borderRadius: '10px 10px 0 10px', display: 'inline-block', fontSize: '14px' };
const otherMsgStyle = { background: '#e2e8f0', color: '#2d3748', padding: '8px', borderRadius: '10px 10px 10px 0', display: 'inline-block', fontSize: '14px' };

export default Chat;