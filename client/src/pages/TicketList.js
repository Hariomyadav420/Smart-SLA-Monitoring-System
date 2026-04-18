// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Clock, CheckCircle, AlertCircle, Search, Download, Filter, Check } from 'lucide-react';
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';

// // const LiveTimer = ({ deadline, status }) => {
// //   const [timeLeft, setTimeLeft] = useState("");

// //   useEffect(() => {
// //     if (status === 'Resolved' || status === 'Completed') {
// //       setTimeLeft("COMPLETED");
// //       return;
// //     }
// //     const timer = setInterval(() => {
// //       const deadlineDate = new Date(deadline);
// //       const now = new Date();
// //       if (isNaN(deadlineDate.getTime())) { setTimeLeft("---"); return; }

// //       const distance = deadlineDate.getTime() - now.getTime();
// //       if (distance < 0) {
// //         setTimeLeft("EXPIRED");
// //         clearInterval(timer);
// //       } else {
// //         const hours = Math.floor(distance / (1000 * 60 * 60));
// //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
// //         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
// //       }
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [deadline, status]);

// //   return (
// //     <span style={{
// //       color: timeLeft === "EXPIRED" ? "#e53e3e" : timeLeft === "COMPLETED" ? "#38a169" : "#3182ce",
// //       fontWeight: 'bold'
// //     }}>
// //       {timeLeft}
// //     </span>
// //   );
// // };

// // const TicketList = () => {
// //   const [tickets, setTickets] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [priorityFilter, setPriorityFilter] = useState("All");

// //   // Maan lijiye humne user role localStorage mein save kiya hai
// //   const userRole = localStorage.getItem('role') || 'Admin';

// //   const fetchTickets = async () => {
// //     try {
// //       const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets');
// //       setTickets(res.data);
// //     } catch (err) { console.error("Error fetching tickets"); }
// //   };

// //   useEffect(() => { fetchTickets(); }, []);

// //   const handleResolve = async (id) => {
// //     try {
// //       await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/resolve/${id}`);
// //       fetchTickets(); // List refresh karein
// //       alert("Ticket Resolved! ✅");
// //     } catch (err) { alert("Error resolving ticket"); }
// //   };

// //   const filteredTickets = tickets.filter(tk => {
// //     const matchesSearch = tk.title.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesPriority = priorityFilter === "All" || tk.priority === priorityFilter;
// //     return matchesSearch && matchesPriority;
// //   });

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       {/* Top Header */}
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
// //         <h2 style={{ color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
// //           <Clock color="#3182ce" /> Ticket Inventory
// //         </h2>
// //         <button style={downloadBtnStyle} onClick={downloadPDF}>
// //           <Download size={18} /> Download Report
// //         </button>
// //       </div>

// //       {/* Filters Row */}
// //       <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
// //         <div style={{ ...filterBoxStyle, flex: 3 }}>
// //           <Search size={18} color="#a0aec0" />
// //           <input
// //             type="text"
// //             placeholder="Search by issue description..."
// //             style={inputStyle}
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //         <div style={{ ...filterBoxStyle, flex: 1 }}>
// //           <Filter size={18} color="#a0aec0" />
// //           <select
// //             style={inputStyle}
// //             value={priorityFilter}
// //             onChange={(e) => setPriorityFilter(e.target.value)}
// //           >
// //             <option value="All">All Priorities</option>
// //             <option value="P1">P1 - Critical</option>
// //             <option value="P2">P2 - Medium</option>
// //             <option value="P3">P3 - Low</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       {/* Table Section - Yahan Wrapper Add Kiya Hai */}
// //       <div style={{
// //         background: 'white',
// //         borderRadius: '12px',
// //         boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
// //         overflowX: 'auto', // Mobile par scroll enable karega
// //         // WebkitOverflowScrolling: 'touch' // Smooth scrolling for iOS
// //         width: '100%'
// //       }}>
// //         <table width="100%" style={{ borderCollapse: 'collapse', minWidth: '700px' }}> {/* minWidth zaroori hai taaki columns na pichkein */}
// //           <thead style={{ background: '#2d3748', color: 'white' }}>
// //             <tr>
// //               <th style={thStyle}>ISSUE DESCRIPTION</th>
// //               <th style={thStyle}>PRIORITY</th>
// //               <th style={thStyle}>TIME REMAINING</th>
// //               <th style={thStyle}>STATUS</th>
// //               {userRole === 'Admin' && <th style={thStyle}>ACTIONS</th>}
// //             </tr>
// //           </thead>
// //           <tbody>

// //             {filteredTickets.map((tk) => (
// //               <tr key={tk._id} style={{ borderBottom: '1px solid #f7fafc' }}>
// //                 <td style={tdStyle}>
// //                   <div style={{ fontWeight: '600' }}>{tk.title}</div>
// //                   <div style={{ fontSize: '11px', color: '#a0aec0' }}>ID: {tk._id.substring(0, 8)}</div>
// //                 </td>
// //                 <td style={tdStyle}>
// //                   <span style={{
// //                     padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
// //                     background: tk.priority === 'P1' ? '#fff5f5' : '#ebf8ff',
// //                     color: tk.priority === 'P1' ? '#e53e3e' : '#3182ce',
// //                     border: `1px solid ${tk.priority === 'P1' ? '#feb2b2' : '#bee3f8'}`
// //                   }}>{tk.priority}</span>
// //                 </td>
// //                 <td style={tdStyle}><LiveTimer deadline={tk.deadline} status={tk.status} /></td>
// //                 <td style={tdStyle}>
// //                   {tk.status === 'Resolved' || tk.status === 'Completed' ?
// //                     <span style={{ color: '#38a169', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}><CheckCircle size={16} /> Completed</span> :
// //                     <span style={{ color: '#dd6b20', display: 'flex', alignItems: 'center', gap: '5px' }}><AlertCircle size={16} /> Pending</span>
// //                   }
// //                 </td>
// //                 {userRole === 'Admin' && (
// //                   <td style={tdStyle}>
// //                     {tk.status !== 'Resolved' && tk.status !== 'Completed' ? (
// //                       <button onClick={() => handleResolve(tk._id)} style={resolveBtnStyle}>
// //                         Resolve
// //                       </button>
// //                     ) : (
// //                       <span style={{ color: '#a0aec0', fontSize: '12px' }}>Done</span>
// //                     )}
// //                   </td>
// //                 )}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Styles ---
// // const filterBoxStyle = { display: 'flex', alignItems: 'center', background: 'white', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', gap: '10px' };
// // const inputStyle = { border: 'none', outline: 'none', width: '100%', fontSize: '14px' };
// // const downloadBtnStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#2d3748', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
// // const resolveBtnStyle = { background: '#3182ce', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' };
// // const thStyle = { padding: '18px 15px', textAlign: 'left', fontSize: '12px', letterSpacing: '0.05em' };
// // const tdStyle = { padding: '20px 15px', fontSize: '14px' };

// // export default TicketList;




// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Clock, CheckCircle, AlertCircle, Search, Download, Filter, Zap, Check, X } from 'lucide-react'; // X icon add kiya
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';

// // const LiveTimer = ({ deadline, status }) => {
// //   const [timeLeft, setTimeLeft] = useState("");

// //   useEffect(() => {
// //     if (status === 'Resolved' || status === 'Completed') {
// //       setTimeLeft("COMPLETED");
// //       return;
// //     }
// //     const timer = setInterval(() => {
// //       const deadlineDate = new Date(deadline);
// //       const now = new Date();
// //       if (isNaN(deadlineDate.getTime())) { setTimeLeft("---"); return; }

// //       const distance = deadlineDate.getTime() - now.getTime();
// //       if (distance < 0) {
// //         setTimeLeft("EXPIRED");
// //         clearInterval(timer);
// //       } else {
// //         const hours = Math.floor(distance / (1000 * 60 * 60));
// //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
// //         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
// //       }
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [deadline, status]);

// //   const isExpired = timeLeft === "EXPIRED";
// //   const isCompleted = timeLeft === "COMPLETED";

// //   return (
// //     <div className={`flex items-center gap-2 font-mono text-xs font-black ${
// //       isExpired ? "text-red-500 animate-pulse" : isCompleted ? "text-emerald-500" : "text-blue-600"
// //     }`}>
// //       {isExpired && <AlertCircle size={14} />}
// //       {timeLeft}
// //     </div>
// //   );
// // };

// // const TicketList = () => {
// //   const [tickets, setTickets] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [priorityFilter, setPriorityFilter] = useState("All");
// //   const userRole = localStorage.getItem('role') || 'Admin';

// //   // --- 🔥 MODAL STATES ---
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [resolutionData, setResolutionData] = useState({ notes: '', delayReason: '' });

// //   const fetchTickets = async () => {
// //     try {
// //       const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets');
// //       setTickets(res.data);
// //     } catch (err) { console.error("Error fetching tickets"); }
// //   };

// //   useEffect(() => { fetchTickets(); }, []);

// //   // --- 🔥 MODAL FUNCTIONS ---
// //   const openResolveModal = (tk) => {
// //     setSelectedTicket(tk);
// //     setResolutionData({ notes: '', delayReason: '' }); // Clear old data
// //     setIsModalOpen(true);
// //   };

// //   const submitResolution = async () => {
// //     try {
// //       // Logic: Agar ticket expired hai toh delay reason mandatory hai
// //       const isExpired = new Date() > new Date(selectedTicket.deadline);
// //       if (isExpired && !resolutionData.delayReason) {
// //         alert("Please provide a delay reason for expired ticket!");
// //         return;
// //       }
// //       if (!resolutionData.notes) {
// //         alert("Please provide resolution notes!");
// //         return;
// //       }

// //       await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/resolve/${selectedTicket._id}`, resolutionData);
      
// //       setIsModalOpen(false);
// //       fetchTickets();
// //       alert("Ticket Resolved & Data Saved! ✅");
// //     } catch (err) { alert("Error resolving ticket"); }
// //   };

// //   const downloadPDF = () => {
// //     const doc = new jsPDF();
// //     doc.setFontSize(18);
// //     doc.text("SLA Ticket Inventory Report", 14, 20);
// //     doc.setFontSize(10);
// //     doc.setTextColor(100);
// //     doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    
// //     const tableData = filteredTickets.map(tk => [
// //       tk.title, 
// //       tk.priority, 
// //       tk.status || 'Pending'
// //     ]);

// //     autoTable(doc, {
// //       head: [['Issue Description', 'Priority', 'Status']],
// //       body: tableData,
// //       startY: 35,
// //       theme: 'grid',
// //       headStyles: { fillColor: [30, 41, 59], fontStyle: 'bold' },
// //       styles: { fontSize: 9 }
// //     });

// //     doc.save("SLA_Ticket_Report.pdf");
// //   };

// //   // Pehle check karein login user ka email kya hai
// //  // --- 🔥 ROLE & EMAIL FIXES ---
// //   const userEmail = localStorage.getItem('userEmail');
// //   const userRole = localStorage.getItem('userRole'); // 'role' ki jagah 'userRole' (Match with Login.js)

// //   const filteredTickets = tickets.filter(tk => {
// //     // 1. Search Filter
// //     const matchesSearch = tk.title.toLowerCase().includes(searchTerm.toLowerCase());
    
// //     // 2. Priority Filter
// //     const matchesPriority = priorityFilter === "All" || tk.priority === priorityFilter;

// //     // 3. Role-Based Filter (Logic Fix)
// //     let isAssignedToMe = false;
// //     if (userRole === 'Admin') {
// //       isAssignedToMe = true; // Admin sees everything
// //     } else {
// //       // Staff sees only their assigned tickets
// //       // Case-insensitive match for safety
// //       isAssignedToMe = tk.assignedEmail?.toLowerCase() === userEmail?.toLowerCase();
// //     }

// //     return matchesSearch && matchesPriority && isAssignedToMe;
// //   });

// //   return (
// //     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      
// //       {/* 1. Header & Download Report Section (Aapka Purana Code) */}
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
// //             <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
// //               <Clock className="text-white" size={28} />
// //             </div>
// //             Ticket Inventory
// //           </h2>
// //           <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitoring live SLA performance</p>
// //         </div>
// //         <button onClick={downloadPDF} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800">
// //           <Download size={18} /> Download Report
// //         </button>
// //       </div>

// //       {/* 2. Search & Filter Bar (Aapka Purana Code) */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //         <div className="md:col-span-3 flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm focus-within:border-indigo-400 transition-all">
// //           <Search size={20} className="text-slate-400" />
// //           <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full ml-3 text-slate-700 font-semibold" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// //         </div>
// //         <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
// //           <Filter size={18} className="text-slate-400" />
// //           <select className="bg-transparent border-none outline-none w-full ml-2 text-slate-700 font-bold text-sm" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
// //             <option value="All">All Priorities</option>
// //             <option value="P1">P1 - Critical</option>
// //             <option value="P2">P2 - Medium</option>
// //             <option value="P3">P3 - Low</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* 3. Modern Table */}
// //       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse">
// //             <thead>
// //               <tr className="bg-slate-900">
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Issue Description</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Time Remaining</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
// //                 {userRole === 'Admin' && <th className="text-right py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>}
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-slate-50">
// //               {filteredTickets.map((tk) => (
// //                 <tr key={tk._id} className="hover:bg-indigo-50/30 transition-all">
// //                   <td className="py-6 px-8">
// //                     <div className="font-bold text-slate-800 text-base">{tk.title}</div>
// //                     <div className="text-[10px] text-slate-400 font-mono font-bold">TID: {tk._id.substring(tk._id.length - 8).toUpperCase()}</div>
// //                   </td>
// //                   <td className="py-6 px-8">
// //                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border-2 ${tk.priority === 'P1' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
// //                       {tk.priority === 'P1' ? 'P1 - CRITICAL' : tk.priority}
// //                     </span>
// //                   </td>
// //                   <td className="py-6 px-8 text-sm"><LiveTimer deadline={tk.deadline} status={tk.status} /></td>
// //                   <td className="py-6 px-8">
// //                     {tk.status === 'Resolved' || tk.status === 'Completed' ? (
// //                       <span className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">COMPLETED</span>
// //                     ) : (
// //                       <span className="text-amber-600 font-black text-[10px] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">PENDING</span>
// //                     )}
// //                   </td>
// //                   {userRole === 'Admin' && (
// //                     <td className="py-6 px-8 text-right">
// //                       {tk.status !== 'Resolved' && tk.status !== 'Completed' ? (
// //                         <button 
// //                           onClick={() => openResolveModal(tk)} // 🔥 MODIFIED: Seedha resolve nahi, Modal khulega
// //                           className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-[11px] font-black hover:bg-emerald-600 transition-all active:scale-90"
// //                         >
// //                           RESOLVE
// //                         </button>
// //                       ) : (
// //                         <Check size={14} className="text-emerald-500 ml-auto" />
// //                       )}
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* 🔥 4. MODERN RESOLUTION MODAL UI --- */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-black text-slate-800 italic">✅ Close Ticket</h2>
// //               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
// //                 <X size={20} />
// //               </button>
// //             </div>

// //             <p className="text-slate-500 text-sm mb-6 font-medium">Issue: <span className="text-slate-900 font-bold">{selectedTicket?.title}</span></p>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resolution Notes</label>
// //                 <textarea 
// //                   className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 outline-none text-sm font-semibold h-24"
// //                   placeholder="Explain how the issue was resolved..."
// //                   value={resolutionData.notes}
// //                   onChange={(e) => setResolutionData({...resolutionData, notes: e.target.value})}
// //                 />
// //               </div>

// //               {/* Smart Delay Reason logic */}
// //               {(selectedTicket?.isBreached || new Date() > new Date(selectedTicket?.deadline)) && (
// //                 <div className="animate-in fade-in slide-in-from-top-2">
// //                   <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 italic">⚠️ Mandatory: Delay Reason</label>
// //                   <textarea 
// //                     className="w-full p-4 bg-red-50 border-2 border-red-100 rounded-2xl focus:border-red-400 outline-none text-sm font-semibold text-red-900"
// //                     placeholder="Why was the SLA breached?"
// //                     value={resolutionData.delayReason}
// //                     onChange={(e) => setResolutionData({...resolutionData, delayReason: e.target.value})}
// //                   />
// //                 </div>
// //               )}
// //             </div>

// //             <div className="grid grid-cols-2 gap-4 mt-8">
// //               <button onClick={() => setIsModalOpen(false)} className="py-4 font-black text-[11px] text-slate-500 bg-slate-100 rounded-2xl hover:bg-slate-200 uppercase tracking-widest">Cancel</button>
// //               <button onClick={submitResolution} className="py-4 font-black text-[11px] text-white bg-indigo-600 rounded-2xl hover:bg-emerald-600 shadow-xl shadow-indigo-200 hover:shadow-emerald-200 uppercase tracking-widest transition-all">Submit Resolve</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TicketList;



// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Clock, AlertCircle, Search, Download, Filter, Check, X } from 'lucide-react';
// // import jsPDF from 'jspdf';
// // import autoTable from 'jspdf-autotable';

// // const LiveTimer = ({ deadline, status }) => {
// //   const [timeLeft, setTimeLeft] = useState("");

// //   useEffect(() => {
// //     if (status === 'Resolved' || status === 'Completed') {
// //       setTimeLeft("COMPLETED");
// //       return;
// //     }
// //     const timer = setInterval(() => {
// //       const deadlineDate = new Date(deadline);
// //       const now = new Date();
// //       if (isNaN(deadlineDate.getTime())) { setTimeLeft("---"); return; }

// //       const distance = deadlineDate.getTime() - now.getTime();
// //       if (distance < 0) {
// //         setTimeLeft("EXPIRED");
// //         clearInterval(timer);
// //       } else {
// //         const hours = Math.floor(distance / (1000 * 60 * 60));
// //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
// //         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
// //       }
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [deadline, status]);

// //   const isExpired = timeLeft === "EXPIRED";
// //   const isCompleted = timeLeft === "COMPLETED";

// //   return (
// //     <div className={`flex items-center gap-2 font-mono text-xs font-black ${
// //       isExpired ? "text-red-500 animate-pulse" : isCompleted ? "text-emerald-500" : "text-blue-600"
// //     }`}>
// //       {isExpired && <AlertCircle size={14} />}
// //       {timeLeft}
// //     </div>
// //   );
// // };

// // const TicketList = () => {
// //   const [tickets, setTickets] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [priorityFilter, setPriorityFilter] = useState("All");

// //   // --- 🛠️ LOCAL STORAGE VALUES (Fixing Filter Issue) ---
// //   const userRole = localStorage.getItem('userRole') || 'Staff'; 
// //   const userEmail = localStorage.getItem('userEmail');

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedTicket, setSelectedTicket] = useState(null);
// //   const [resolutionData, setResolutionData] = useState({ notes: '', delayReason: '' });

// //   const fetchTickets = async () => {
// //     try {
// //       const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets');
// //       setTickets(res.data);
// //     } catch (err) { console.error("Error fetching tickets"); }
// //   };

// //   useEffect(() => { fetchTickets(); }, []);

// //   // --- 🔥 FILTER LOGIC (Corrected) ---
// //   const filteredTickets = tickets.filter(tk => {
// //     const matchesSearch = tk.title.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesPriority = priorityFilter === "All" || tk.priority === priorityFilter;
    
// //     // Role based visibility
// //     let isVisible = false;
// //     if (userRole === 'Admin') {
// //       isVisible = true; // Admin sees everything
// //     } else {
// //       // Staff sees only their tickets (Email check)
// //       isVisible = tk.assignedEmail?.toLowerCase() === userEmail?.toLowerCase();
// //     }

// //     return matchesSearch && matchesPriority && isVisible;
// //   });

// //   const openResolveModal = (tk) => {
// //     setSelectedTicket(tk);
// //     setResolutionData({ notes: '', delayReason: '' });
// //     setIsModalOpen(true);
// //   };

// //   const submitResolution = async () => {
// //     try {
// //       const isExpired = new Date() > new Date(selectedTicket.deadline);
// //       if (isExpired && !resolutionData.delayReason) {
// //         alert("Please provide a delay reason for expired ticket!");
// //         return;
// //       }
// //       if (!resolutionData.notes) {
// //         alert("Please provide resolution notes!");
// //         return;
// //       }

// //       await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/resolve/${selectedTicket._id}`, resolutionData);
      
// //       setIsModalOpen(false);
// //       fetchTickets();
// //       alert("Ticket Resolved! ✅");
// //     } catch (err) { alert("Error resolving ticket"); }
// //   };

// //   const downloadPDF = () => {
// //     const doc = new jsPDF();
// //     doc.text("SLA Ticket Inventory Report", 14, 20);
// //     const tableData = filteredTickets.map(tk => [tk.title, tk.priority, tk.status || 'Pending']);
// //     autoTable(doc, { head: [['Issue', 'Priority', 'Status']], body: tableData, startY: 30 });
// //     doc.save("SLA_Report.pdf");
// //   };

// //   return (
// //     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
// //         <div>
// //           <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
// //             <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
// //               <Clock className="text-white" size={28} />
// //             </div>
// //             Ticket Inventory ({userRole})
// //           </h2>
// //         </div>
// //         <button onClick={downloadPDF} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all">
// //           <Download size={18} /> Download Report
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //         <div className="md:col-span-3 flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
// //           <Search size={20} className="text-slate-400" />
// //           <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full ml-3 text-slate-700 font-semibold" onChange={(e) => setSearchTerm(e.target.value)} />
// //         </div>
// //         <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
// //           <Filter size={18} className="text-slate-400" />
// //           <select className="bg-transparent border-none outline-none w-full ml-2 text-slate-700 font-bold text-sm" onChange={(e) => setPriorityFilter(e.target.value)}>
// //             <option value="All">All Priorities</option>
// //             <option value="P1">P1 - Critical</option>
// //             <option value="P2">P2 - Medium</option>
// //             <option value="P3">P3 - Low</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse">
// //             <thead>
// //               <tr className="bg-slate-900">
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Issue Description</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Time Remaining</th>
// //                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
// //                 <th className="text-right py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
// //               </tr>
// //             </thead>
            
// //             <tbody className="divide-y divide-slate-50">
// //               {filteredTickets.map((tk) => (
// //                 <tr key={tk._id} className="hover:bg-indigo-50/30 transition-all">
// //                   <td className="py-6 px-8">
// //                     <div className="font-bold text-slate-800 text-base">{tk.title}</div>
// //                     <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">Assigned: {tk.assignedTo}</div>
// //                   </td>
// //                   <td className="py-6 px-8">
// //                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border-2 ${tk.priority === 'P1' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
// //                       {tk.priority}
// //                     </span>
// //                   </td>
// //                   <td className="py-6 px-8 text-sm"><LiveTimer deadline={tk.deadline} status={tk.status} /></td>
// //                   <td className="py-6 px-8">
// //                     {tk.status === 'Resolved' || tk.status === 'Completed' ? (
// //                       <span className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 uppercase">Resolved</span>
// //                     ) : (
// //                       <span className="text-amber-600 font-black text-[10px] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 uppercase">Pending</span>
// //                     )}
// //                   </td>
                  
// //                   <td className="py-6 px-8 text-right">
// //                     {tk.status !== 'Resolved' && tk.status !== 'Completed' ? (
// //                       <button 
// //                         onClick={() => openResolveModal(tk)} 
// //                         className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl text-[11px] font-black hover:bg-emerald-600 transition-all shadow-md"
// //                       >
// //                         RESOLVE
// //                       </button>
// //                     ) : (
// //                       <div className="flex items-center justify-end text-emerald-500 font-black gap-1 text-[11px]">
// //                         <Check size={16} /> CLOSED
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
                
// //               ))}
// //             </tbody>
// //           </table>
// //           {filteredTickets.length === 0 && (
// //             <div className="p-20 text-center text-slate-400 font-bold italic">No tickets found for your account.</div>
// //           )}
// //         </div>
// //       </div>

// //       {/* MODAL (Keep your existing modal code below) */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
// //              <div className="flex justify-between items-center mb-6">
// //                <h2 className="text-2xl font-black text-slate-800 italic">✅ Close Ticket</h2>
// //                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
// //                  <X size={20} />
// //                </button>
// //              </div>
// //              <p className="text-slate-500 text-sm mb-6 font-medium">Issue: <span className="text-slate-900 font-bold">{selectedTicket?.title}</span></p>
// //              <div className="space-y-4">
// //                <div>
// //                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resolution Notes</label>
// //                  <textarea 
// //                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 outline-none text-sm font-semibold h-24"
// //                    placeholder="Explain how the issue was resolved..."
// //                    value={resolutionData.notes}
// //                    onChange={(e) => setResolutionData({...resolutionData, notes: e.target.value})}
// //                  />
// //                </div>
// //                {(selectedTicket?.isBreached || new Date() > new Date(selectedTicket?.deadline)) && (
// //                  <div className="animate-in fade-in slide-in-from-top-2">
// //                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 italic">⚠️ Mandatory: Delay Reason</label>
// //                    <textarea 
// //                      className="w-full p-4 bg-red-50 border-2 border-red-100 rounded-2xl focus:border-red-400 outline-none text-sm font-semibold text-red-900"
// //                      placeholder="Why was the SLA breached?"
// //                      value={resolutionData.delayReason}
// //                      onChange={(e) => setResolutionData({...resolutionData, delayReason: e.target.value})}
// //                    />
// //                  </div>
// //                )}
// //              </div>
// //              <div className="grid grid-cols-2 gap-4 mt-8">
// //                <button onClick={() => setIsModalOpen(false)} className="py-4 font-black text-[11px] text-slate-500 bg-slate-100 rounded-2xl hover:bg-slate-200 uppercase tracking-widest">Cancel</button>
// //                <button onClick={submitResolution} className="py-4 font-black text-[11px] text-white bg-indigo-600 rounded-2xl hover:bg-emerald-600 shadow-xl shadow-indigo-200 uppercase tracking-widest transition-all">Submit Resolve</button>
// //              </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TicketList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Clock, AlertCircle, Search, Download, Filter, Check, X, Trash2 } from 'lucide-react';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const LiveTimer = ({ deadline, status }) => {
//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     if (status === 'Resolved' || status === 'Completed') {
//       setTimeLeft("COMPLETED");
//       return;
//     }
//     const timer = setInterval(() => {
//       const deadlineDate = new Date(deadline);
//       const now = new Date();
//       if (isNaN(deadlineDate.getTime())) { setTimeLeft("---"); return; }

//       const distance = deadlineDate.getTime() - now.getTime();
//       if (distance < 0) {
//         setTimeLeft("EXPIRED");
//         clearInterval(timer);
//       } else {
//         const hours = Math.floor(distance / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [deadline, status]);

//   const isExpired = timeLeft === "EXPIRED";
//   const isCompleted = timeLeft === "COMPLETED";

//   return (
//     <div className={`flex items-center gap-2 font-mono text-xs font-black ${
//       isExpired ? "text-red-500 animate-pulse" : isCompleted ? "text-emerald-500" : "text-blue-600"
//     }`}>
//       {isExpired && <AlertCircle size={14} />}
//       {timeLeft}
//     </div>
//   );
// };

// const TicketList = () => {
//   const [tickets, setTickets] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("All");

//   const userRole = localStorage.getItem('userRole') || localStorage.getItem('role') || 'Staff'; 
//   const userEmail = localStorage.getItem('userEmail');

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [resolutionData, setResolutionData] = useState({ notes: '', delayReason: '' });

//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets');
//       setTickets(res.data);
//     } catch (err) { console.error("Error fetching tickets"); }
//   };

//   useEffect(() => { fetchTickets(); }, []);

//   // --- 🔥 DELETE FUNCTION ---
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       try {
//         await axios.delete(`https://sla-backend-otk0.onrender.com/api/tickets/${id}`);
//         alert("Ticket Deleted! 🗑️");
//         fetchTickets();
//       } catch (err) {
//         alert("Error deleting ticket");
//       }
//     }
//   };

//   const filteredTickets = tickets.filter(tk => {
//     const matchesSearch = tk.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesPriority = priorityFilter === "All" || tk.priority === priorityFilter;
//     let isVisible = userRole === 'Admin' ? true : tk.assignedEmail?.toLowerCase() === userEmail?.toLowerCase();
//     return matchesSearch && matchesPriority && isVisible;
//   });

//   const openResolveModal = (tk) => {
//     setSelectedTicket(tk);
//     setResolutionData({ notes: '', delayReason: '' });
//     setIsModalOpen(true);
//   };

//   const submitResolution = async () => {
//     try {
//       const isExpired = new Date() > new Date(selectedTicket.deadline);
//       if (isExpired && !resolutionData.delayReason) {
//         alert("Please provide a delay reason!");
//         return;
//       }
//       if (!resolutionData.notes) {
//         alert("Please provide resolution notes!");
//         return;
//       }
//       await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/resolve/${selectedTicket._id}`, resolutionData);
//       setIsModalOpen(false);
//       fetchTickets();
//       alert("Ticket Resolved! ✅");
//     } catch (err) { alert("Error resolving ticket"); }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("SLA Ticket Inventory Report", 14, 20);
//     const tableData = filteredTickets.map(tk => [tk.title, tk.priority, tk.status || 'Pending']);
//     autoTable(doc, { head: [['Issue', 'Priority', 'Status']], body: tableData, startY: 30 });
//     doc.save("SLA_Report.pdf");
//   };

//   return (
//     <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
//           <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
//             <Clock className="text-white" size={28} />
//           </div>
//           Ticket Inventory ({userRole})
//         </h2>
//         <button onClick={downloadPDF} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all">
//           <Download size={18} /> Download Report
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="md:col-span-3 flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
//           <Search size={20} className="text-slate-400" />
//           <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full ml-3 text-slate-700 font-semibold" onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>
//         <div className="flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
//           <Filter size={18} className="text-slate-400" />
//           <select className="bg-transparent border-none outline-none w-full ml-2 text-slate-700 font-bold text-sm" onChange={(e) => setPriorityFilter(e.target.value)}>
//             <option value="All">All Priorities</option>
//             <option value="P1">P1 - Critical</option>
//             <option value="P2">P2 - Medium</option>
//             <option value="P3">P3 - Low</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-slate-900">
//                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Issue Description</th>
//                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority</th>
//                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Time Remaining</th>
//                 <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
//                 <th className="text-right py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredTickets.map((tk) => (
//                 <tr key={tk._id} className="hover:bg-indigo-50/30 transition-all">
//                   <td className="py-6 px-8">
//                     <div className="font-bold text-slate-800 text-base">{tk.title}</div>
//                     <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">Assigned: {tk.assignedTo}</div>
//                   </td>
//                   <td className="py-6 px-8 text-center">
//                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border-2 ${tk.priority === 'P1' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
//                       {tk.priority}
//                     </span>
//                   </td>
//                   <td className="py-6 px-8 text-sm"><LiveTimer deadline={tk.deadline} status={tk.status} /></td>
//                   <td className="py-6 px-8">
//                     {tk.status === 'Resolved' || tk.status === 'Completed' ? (
//                       <span className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 uppercase">Resolved</span>
//                     ) : (
//                       <span className="text-amber-600 font-black text-[10px] bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100 uppercase">Pending</span>
//                     )}
//                   </td>
                  
//                   {/* 🔥 ACTIONS CELL (Resolve + Delete) */}
//                   <td className="py-6 px-8 text-right">
//                     <div className="flex justify-end items-center gap-3">

                      

//                       // Resolve Modal ke andar ye input add karein:
// <div>
//   <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 italic">🔗 Proof of Work (Image Link/Drive Link)</label>
//   <input 
//     type="text"
//     placeholder="Paste screenshot link here..."
//     className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 outline-none text-sm"
//     value={resolutionData.proofUrl}
//     onChange={(e) => setResolutionData({...resolutionData, proofUrl: e.target.value})}
//     required
//   />
// </div>


//                       {tk.status !== 'Resolved' && tk.status !== 'Completed' ? (
//                         <button 
//                           onClick={() => openResolveModal(tk)} 
//                           className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-all shadow-md"
//                         >
//                           RESOLVE
//                         </button>
//                       ) : (
//                         <div className="flex items-center text-emerald-500 font-black gap-1 text-[10px]">
//                           <Check size={14} /> CLOSED
//                           {/* Table ki Actions column mein */}
// {tk.status === 'Resolved' && userRole === 'Admin' ? (
//   <div className="flex gap-2">
//     <button 
//       onClick={() => handleReopen(tk._id)}
//       className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-xl text-[10px] font-black border border-orange-200 hover:bg-orange-600 hover:text-white transition-all"
//     >
//       RE-OPEN 🔄
//     </button>
//     <div className="flex items-center text-emerald-500 font-black text-[10px]">
//       <Check size={14} /> VERIFIED
//     </div>
//   </div>
// ) : tk.status === 'Resolved' ? (
//     <div className="text-emerald-500 font-black text-[10px]">✅ RESOLVED</div>
// ) : null}

//                         </div>
//                       )}

//                       {/* Delete button sirf Admin ko dikhega */}
//                       {userRole === 'Admin' && (
//                         <button 
//                           onClick={() => handleDelete(tk._id)}
//                           className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-100"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL UI */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
//              <div className="flex justify-between items-center mb-6">
//                <h2 className="text-2xl font-black text-slate-800 italic">✅ Close Ticket</h2>
//                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
//                  <X size={20} />
//                </button>
//              </div>
//              <p className="text-slate-500 text-sm mb-6 font-medium">Issue: <span className="text-slate-900 font-bold">{selectedTicket?.title}</span></p>
//              <div className="space-y-4">
//                <div>
//                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resolution Notes</label>
//                  <textarea 
//                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 outline-none text-sm font-semibold h-24"
//                    placeholder="How was it fixed?"
//                    value={resolutionData.notes}
//                    onChange={(e) => setResolutionData({...resolutionData, notes: e.target.value})}
//                  />
//                </div>
//                {(selectedTicket?.isBreached || new Date() > new Date(selectedTicket?.deadline)) && (
//                  <div>
//                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 italic">⚠️ Delay Reason</label>
//                    <textarea 
//                      className="w-full p-4 bg-red-50 border-2 border-red-100 rounded-2xl focus:border-red-400 outline-none text-sm font-semibold text-red-900"
//                      placeholder="Why late?"
//                      value={resolutionData.delayReason}
//                      onChange={(e) => setResolutionData({...resolutionData, delayReason: e.target.value})}
//                    />
//                  </div>
//                )}
//              </div>
//              <div className="grid grid-cols-2 gap-4 mt-8">
//                <button onClick={() => setIsModalOpen(false)} className="py-4 font-black text-[11px] text-slate-500 bg-slate-100 rounded-2xl">Cancel</button>
//                <button onClick={submitResolution} className="py-4 font-black text-[11px] text-white bg-indigo-600 rounded-2xl hover:bg-emerald-600 transition-all">Submit</button>
//              </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, AlertCircle, Search, Download, Filter, Check, X, Trash2, RotateCcw, Link as LinkIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const LiveTimer = ({ deadline, status }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (status === 'Resolved' || status === 'Completed') {
      setTimeLeft("COMPLETED");
      return;
    }
    const timer = setInterval(() => {
      const deadlineDate = new Date(deadline);
      const now = new Date();
      if (isNaN(deadlineDate.getTime())) { setTimeLeft("---"); return; }
      const distance = deadlineDate.getTime() - now.getTime();
      if (distance < 0) {
        setTimeLeft("EXPIRED");
        clearInterval(timer);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline, status]);

  return (
    <div className={`flex items-center gap-2 font-mono text-xs font-black ${
      timeLeft === "EXPIRED" ? "text-red-500 animate-pulse" : timeLeft === "COMPLETED" ? "text-emerald-500" : "text-blue-600"
    }`}>
      {timeLeft === "EXPIRED" && <AlertCircle size={14} />}
      {timeLeft}
    </div>
  );
};

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const userRole = localStorage.getItem('userRole') || localStorage.getItem('role') || 'Staff'; 
  const userEmail = localStorage.getItem('userEmail');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [resolutionData, setResolutionData] = useState({ notes: '', delayReason: '', proofUrl: '' });

  const fetchTickets = async () => {
    try {
      const res = await axios.get('https://sla-backend-otk0.onrender.com/api/tickets');
      setTickets(res.data);
    } catch (err) { console.error("Error fetching tickets"); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this ticket permanently?")) {
      try {
        await axios.delete(`https://sla-backend-otk0.onrender.com/api/tickets/${id}`);
        fetchTickets();
      } catch (err) { alert("Error deleting"); }
    }
  };

  const handleReopen = async (id) => {
    if (window.confirm("Are you sure you want to RE-OPEN this ticket for the employee?")) {
      try {
        await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/reopen/${id}`);
        alert("Ticket Re-opened! 🔄");
        fetchTickets();
      } catch (err) { alert("Re-open failed"); }
    }
  };

  const filteredTickets = tickets.filter(tk => {
    const matchesSearch = tk.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "All" || tk.priority === priorityFilter;
    let isVisible = userRole === 'Admin' ? true : tk.assignedEmail?.toLowerCase() === userEmail?.toLowerCase();
    return matchesSearch && matchesPriority && isVisible;
  });

  const openResolveModal = (tk) => {
    setSelectedTicket(tk);
    setResolutionData({ notes: '', delayReason: '', proofUrl: '' });
    setIsModalOpen(true);
  };

  const submitResolution = async () => {
    if (resolutionData.notes.length < 10) return alert("Please provide detailed resolution notes!");
    if (!resolutionData.proofUrl) return alert("Please provide a Proof Link (Screenshot/Drive)!");
    
    try {
      await axios.put(`https://sla-backend-otk0.onrender.com/api/tickets/resolve/${selectedTicket._id}`, resolutionData);
      setIsModalOpen(false);
      fetchTickets();
      alert("Work Submitted! ✅");
    } catch (err) { alert("Error submitting"); }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("SLA Ticket Inventory Report", 14, 20);
    const tableData = filteredTickets.map(tk => [tk.title, tk.priority, tk.status || 'Pending']);
    autoTable(doc, { head: [['Issue', 'Priority', 'Status']], body: tableData, startY: 30 });
    doc.save("SLA_Report.pdf");
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header & Search Sections remain same... */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200"><Clock className="text-white" size={28} /></div>
          Ticket Inventory ({userRole})
        </h2>
        <button onClick={downloadPDF} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Download size={18} /> Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3 flex items-center bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
          <Search size={20} className="text-slate-400" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full ml-3 font-semibold" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
          <select className="bg-transparent outline-none w-full font-bold text-sm" onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="P1">P1 - Critical</option>
            <option value="P2">P2 - Medium</option>
            <option value="P3">P3 - Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Issue & Assignee</th>
                <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">SLA Timer</th>
                <th className="text-left py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="text-right py-6 px-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTickets.map((tk) => (
                <tr key={tk._id} className="hover:bg-indigo-50/30 transition-all">
                  <td className="py-6 px-8">
                    <div className="font-bold text-slate-800">{tk.title}</div>
                    <div className="text-[10px] text-slate-400 font-bold italic">Assigned: {tk.assignedTo}</div>
                    {tk.proofUrl && <a href={tk.proofUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-500 underline flex items-center gap-1 mt-1"><LinkIcon size={10}/> View Proof</a>}
                  </td>
                  <td className="py-6 px-8">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black border ${tk.priority === 'P1' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{tk.priority}</span>
                  </td>
                  <td className="py-6 px-8"><LiveTimer deadline={tk.deadline} status={tk.status} /></td>
                  <td className="py-6 px-8">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${tk.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{tk.status}</span>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {tk.status !== 'Resolved' ? (
                        <button onClick={() => openResolveModal(tk)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black">RESOLVE</button>
                      ) : (
                        userRole === 'Admin' && (
                          <button onClick={() => handleReopen(tk._id)} className="bg-orange-500 text-white p-2 rounded-xl" title="Re-open Task"><RotateCcw size={14}/></button>
                        )
                      )}
                      {userRole === 'Admin' && <button onClick={() => handleDelete(tk._id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL UI (Proof Input added here correctly) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-black text-slate-800 mb-4 italic">✅ Submit Work</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Resolution Notes</label>
                <textarea className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none text-sm h-20" placeholder="What did you fix?" value={resolutionData.notes} onChange={(e) => setResolutionData({...resolutionData, notes: e.target.value})} />
              </div>
              
              {/* 🔥 PROOF INPUT FIELD (MODAL KE ANDAR) */}
              <div>
                <label className="block text-[10px] font-black text-indigo-400 uppercase mb-1">🔗 Proof Link (Screenshot/Drive)</label>
                <input type="text" className="w-full p-3 bg-indigo-50 border-2 border-indigo-100 rounded-xl outline-none text-sm" placeholder="Paste proof URL..." value={resolutionData.proofUrl} onChange={(e) => setResolutionData({...resolutionData, proofUrl: e.target.value})} />
              </div>

              {(selectedTicket?.isBreached || new Date() > new Date(selectedTicket?.deadline)) && (
                <div>
                  <label className="block text-[10px] font-black text-red-400 uppercase mb-1">⚠️ Delay Reason</label>
                  <textarea className="w-full p-3 bg-red-50 border-2 border-red-100 rounded-xl outline-none text-sm text-red-900" placeholder="Why was it late?" value={resolutionData.delayReason} onChange={(e) => setResolutionData({...resolutionData, delayReason: e.target.value})} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="py-3 font-black text-slate-500 bg-slate-100 rounded-2xl">Cancel</button>
              <button onClick={submitResolution} className="py-3 font-black text-white bg-indigo-600 rounded-2xl hover:bg-emerald-600 transition-all">Submit Resolve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;