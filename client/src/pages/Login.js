import React, { useState } from 'react';
// 1. Link ko yahan import karein
import { Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, User, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Staff');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sla-backend-otk0.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // 1. JWT Token save karein
                localStorage.setItem('token', data.token);

                // 2. IMPORTANT: User ka email, name aur role localstorage mein save karein
                // Ye filtering ke liye sabse zaroori hai
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userRole', data.user.role);

                // 3. Parent component (App.js) ko user data pass karein
                onLogin(data.user);

                alert(`Welcome back, ${data.user.name}!`);
            } else {
                alert(data.msg);
            }
        } catch (err) {
            console.error("Login Error:", err);
            alert("Server is not responding. Check backend!");
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            minHeight: '90vh', background: '#f7fafc'
        }}>
            <div style={{
                width: '100%', maxWidth: '450px', background: 'white',
                padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
                        width: '64px', height: '64px', borderRadius: '18px',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        margin: '0 auto 15px', color: 'white', boxShadow: '0 8px 15px rgba(49,130,206,0.3)'
                    }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a202c', margin: '0' }}>Welcome Back</h2>
                    <p style={{ color: '#718096', marginTop: '8px' }}>Log in to manage your SLAs</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Email Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
                            <input
                                type="email" required placeholder="name@company.com"
                                style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '700', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
                            <input
                                type="password" required placeholder="••••••••"
                                style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box' }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button
                            type="button"
                            onClick={() => setRole('Staff')}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid',
                                borderColor: role === 'Staff' ? '#3182ce' : '#e2e8f0',
                                background: role === 'Staff' ? '#ebf8ff' : 'white',
                                color: role === 'Staff' ? '#3182ce' : '#718096',
                                fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            <User size={16} /> Staff
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('Admin')}
                            style={{
                                flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid',
                                borderColor: role === 'Admin' ? '#3182ce' : '#e2e8f0',
                                background: role === 'Admin' ? '#ebf8ff' : 'white',
                                color: role === 'Admin' ? '#3182ce' : '#718096',
                                fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            <ShieldCheck size={16} /> Admin
                        </button>
                    </div>

                    {/* 2. Signup Link yahan professional lag rahi hai */}
                    <div style={{ textAlign: 'center', fontSize: '14px', color: '#718096' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#3182ce', fontWeight: 'bold', textDecoration: 'none' }}>
                            Register Here
                        </Link>
                    </div>

                    <button type="submit" style={{
                        marginTop: '5px', padding: '16px', background: '#3182ce', color: 'white',
                        border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                        boxShadow: '0 4px 12px rgba(49,130,206,0.3)'
                    }}>
                        Sign In <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;