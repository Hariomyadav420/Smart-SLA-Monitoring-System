// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, DropShadow } from 'recharts';
// import { AlertTriangle, CheckCircle, Ticket, Activity, TrendingUp } from 'lucide-react';
// import StatCard from '../components/StatCard';

// const Dashboard = ({ tickets }) => {
//   const total = tickets.length;
//   const breached = tickets.filter(t => t.isBreached).length;
//   const resolved = tickets.filter(t => t.status === 'Resolved').length;
//   const active = total - resolved;
//   const compliance = total ? Math.round(((total - breached) / total) * 100) : 100;

//   const chartData = [
//     { name: 'Within SLA', value: total - breached },
//     { name: 'Breached', value: breached }
//   ];

//   const COLORS = ['#48BB78', '#F56565'];

//   return (
//     <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
//       {/* Header Section */}
//       <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <h1 style={{ fontSize: '28px', color: '#1a202c', marginBottom: '5px' }}>Performance Overview</h1>
//           <p style={{ color: '#718096', margin: 0 }}>Real-time service level monitoring</p>
//         </div>
//         <div style={{ display: 'flex', gap: '10px', background: '#fff', padding: '10px 20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
//           <Activity color="#48BB78" size={20} />
//           <span style={{ fontWeight: 'bold', color: '#2d3748' }}>System Live</span>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//         gap: '25px',
//         marginBottom: '40px'
//       }}>
//         <StatCard label="Total Volume" value={total} color="#3182ce" icon={<Ticket size={24} color="#3182ce" />} />
//         <StatCard label="Breached" value={breached} color="#e53e3e" icon={<AlertTriangle size={24} color="#e53e3e" />} />
//         <StatCard label="Resolved" value={resolved} color="#38a169" icon={<CheckCircle size={24} color="#38a169" />} />
//         <StatCard label="SLA Compliance" value={`${compliance}%`} color="#805ad5" icon={<TrendingUp size={24} color="#805ad5" />} />
//       </div>

//       {/* Charts Section */}
//       <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
//         <div style={{
//           background: 'white',
//           padding: '30px',
//           borderRadius: '20px',
//           boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
//           minHeight: '400px'
//         }}>
//           <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>SLA Health Distribution</h3>
//           <div style={{ width: '100%', height: '320px' }}>
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={80}
//                   outerRadius={120}
//                   paddingAngle={8}
//                   dataKey="value"
//                   stroke="none"
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
//                 />
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Info Sidebar Card */}
//         <div style={{
//           background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
//           padding: '30px',
//           borderRadius: '20px',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           textAlign: 'center'
//         }}>
//           <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>{compliance}%</h2>
//           <p style={{ opacity: 0.8, fontSize: '14px', lineHeight: '1.6' }}>
//             Current service level compliance is {compliance < 90 ? 'below' : 'above'} target.
//             Keep resolving tickets within SLA to improve performance.
//           </p>
//           <button
//             style={{
//               marginTop: '25px',
//               padding: '12px',
//               borderRadius: '10px',
//               border: 'none',
//               background: 'rgba(255,255,255,0.2)',
//               color: 'white',
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               backdropFilter: 'blur(10px)'
//             }}
//           >
//             View Full Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { 
//   Clock, CheckCircle, AlertCircle, Search, Download, 
//   Filter, LayoutDashboard, Ticket, LogOut, TrendingUp 
// } from 'lucide-react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const Dashboard = () => {
//   const [tickets, setTickets] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("All");

//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get('http://https://sla-backend-otk0.onrender.com/api/tickets');
//       setTickets(res.data);
//     } catch (err) { console.error("Error fetching tickets"); }
//   };

//   useEffect(() => { fetchTickets(); }, []);

//   // --- 📊 Analytics Logic ---
//   const stats = {
//     total: tickets.length,
//     resolved: tickets.filter(t => t.status === 'Resolved' || t.status === 'Completed').length,
//     pending: tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Completed').length,
//     critical: tickets.filter(t => t.priority === 'P1').length
//   };

//   const chartData = [
//     { name: 'Resolved', value: stats.resolved, color: '#10b981' },
//     { name: 'Pending', value: stats.pending, color: '#f59e0b' },
//     { name: 'Critical (P1)', value: stats.critical, color: '#ef4444' },
//   ];

//   const filteredTickets = tickets.filter(tk => 
//     tk.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (priorityFilter === "All" || tk.priority === priorityFilter)
//   );

//   return (
//     <div style={{ padding: '20px', width: '100%', animation: 'fadeIn 0.5s ease-in' }}>


//       {/* Main Content */}
//       <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>

//         {/* --- 1. Top Stats Cards --- */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
//           <StatCard label="Total Tickets" value={stats.total} icon={<Ticket color="#6366f1"/>} border="#6366f1" />
//           <StatCard label="Resolved" value={stats.resolved} icon={<CheckCircle color="#10b981"/>} border="#10b981" />
//           <StatCard label="Pending" value={stats.pending} icon={<Clock color="#f59e0b"/>} border="#f59e0b" />
//           <StatCard label="Critical (P1)" value={stats.critical} icon={<AlertCircle color="#ef4444"/>} border="#ef4444" />
//         </div>

//         <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>

//           {/* --- 2. Live Analytics Chart --- */}
//           <div style={{ flex: 1, minWidth: '350px', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
//             <h3 style={{ margin: '0 0 20px 0' }}>SLA Distribution</h3>
//             <div style={{ height: '300px' }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
//                     {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* --- 3. Ticket Inventory (Short View) --- */}
//           <div style={{ flex: 2, minWidth: '500px', background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
//              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//                 <h3 style={{ margin: 0 }}>Recent Tickets</h3>
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                    <input 
//                     placeholder="Search..." 
//                     style={searchInputStyle} 
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                    />
//                 </div>
//              </div>

//              <div style={{ overflowX: 'auto' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
//                       <th style={{ padding: '12px' }}>ISSUE</th>
//                       <th style={{ padding: '12px' }}>PRIORITY</th>
//                       <th style={{ padding: '12px' }}>STATUS</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredTickets.slice(0, 5).map(tk => (
//                       <tr key={tk._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
//                         <td style={{ padding: '12px', fontWeight: '500' }}>{tk.title}</td>
//                         <td style={{ padding: '12px' }}>
//                            <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: tk.priority === 'P1' ? '#fee2e2' : '#e0f2fe', color: tk.priority === 'P1' ? '#b91c1c' : '#0369a1' }}>{tk.priority}</span>
//                         </td>
//                         <td style={{ padding: '12px', fontSize: '13px' }}>{tk.status === 'Resolved' ? '✅' : '⏳'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Sub-Components ---
// const StatCard = ({ label, value, icon, border }) => (
//   <div style={{ background: 'white', padding: '20px', borderRadius: '12px', borderLeft: `5px solid ${border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
//     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <div>
//         <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{label}</p>
//         <h2 style={{ margin: '5px 0 0 0' }}>{value}</h2>
//       </div>
//       {icon}
//     </div>
//   </div>
// );

// const sideItem = { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', transition: '0.2s' };
// const searchInputStyle = { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { AlertTriangle, CheckCircle, Ticket, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import StatCard from '../components/StatCard';
import PerformanceStats from '../components/PerformanceStats'; // ✅ Import Performance Component

const Dashboard = ({ tickets = [] }) => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await axios.get('http://https://sla-backend-otk0.onrender.com/api/tickets/stats/trend');
        setTrendData(res.data);
      } catch (err) {
        console.error("Trend fetch error", err);
      }
    };
    fetchTrend();
  }, []);

  // --- ⚙️ Stats Logic ---
  const total = tickets.length;
  const resolvedCount = tickets.filter(t => t.status?.toLowerCase() === 'resolved').length;
  const breachedCount = tickets.filter(t => (new Date(t.deadline) < new Date()) && (t.status?.toLowerCase() !== 'resolved')).length;
  const compliance = total > 0 ? Math.round(((total - breachedCount) / total) * 100) : 100;

  const chartData = [
    { name: 'Within SLA', value: total - breachedCount, color: '#10b981' },
    { name: 'Breached', value: breachedCount, color: '#ef4444' }
  ];

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">

      {/* 1. Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-800">System Performance</h1>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
          <Activity size={16} className="text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Live Metrics</span>
        </div>
      </div>

      {/* 2. Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard label="TOTAL" value={total} color="#6366f1" icon={<Ticket />} />
        <StatCard label="RESOLVED" value={resolvedCount} color="#10b981" icon={<CheckCircle />} />
        <StatCard label="BREACHED" value={breachedCount} color="#ef4444" icon={<AlertTriangle />} />
        <StatCard label="SLA HEALTH" value={`${compliance}%`} color="#8b5cf6" icon={<TrendingUp />} />
      </div>

      {/* 3. Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Trend Chart (Large) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" /> Ticket Volume Trend
            </h3>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SLA Health Pie Chart (Small) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">SLA Health</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-black text-slate-800">{compliance}%</div>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">System Efficiency</p>
          </div>
        </div>
      </div>

      {/* 4. Employee Performance Section (The New Part) */}
      <div className="mt-10">
        <PerformanceStats />
      </div>

    </div>
  );
};

export default Dashboard;