import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, UserCircle } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Staff' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Yeh aapke backend ki Register API ko call karega
            await axios.post('https://sla-backend-otk0.onrender.com/api/auth/register', formData);
            alert("Registration Successful! Ab aap Login kar sakte hain.");
            navigate('/'); // Login page par bhej do
        } catch (err) {
            alert(err.response?.data?.msg || "Registration failed!");
        }
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={iconBoxStyle}><UserPlus size={30} color="#3182ce" /></div>
                    <h2 style={{ margin: '10px 0 5px' }}>Join the Team</h2>
                    <p style={{ color: '#718096', fontSize: '14px' }}>Create your staff or admin account</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input style={inputStyle} placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <input style={inputStyle} type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    <input style={inputStyle} type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    
                    <select style={inputStyle} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="Staff">Role: Staff</option>
                        <option value="Admin">Role: Admin</option>
                    </select>

                    <button type="submit" style={btnStyle}>Register Now</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    Already have an account? <Link to="/" style={{ color: '#3182ce', fontWeight: 'bold' }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

// Styles (Inhe aap CSS file mein bhi daal sakte hain)
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7fafc' };
const cardStyle = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '380px' };
const iconBoxStyle = { background: '#ebf8ff', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', boxSizing: 'border-box', outline: 'none' };
const btnStyle = { width: '100%', padding: '12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };

export default Signup;