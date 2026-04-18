// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Send, Tag, MessageSquare, AlertCircle, Clock } from 'lucide-react';

// const CreateTicket = ({ onCreate }) => {
//   const [title, setTitle] = useState('');
//   const [priority, setPriority] = useState('P3');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onCreate({ title, priority });
//     navigate('/tickets');
//   };

//   // Priority ke hisaab se info text dikhane ke liye
//   const getPriorityInfo = () => {
//     if (priority === 'P1') return "Critical: 2 Hours Resolution Target";
//     if (priority === 'P2') return "High: 8 Hours Resolution Target";
//     return "Standard: 24 Hours Resolution Target";
//   };

//   return (
//     <div style={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       minHeight: '80vh' 
//     }}>
//       <div style={{ 
//         width: '100%',
//         maxWidth: '550px', 
//         background: 'white', 
//         padding: '40px', 
//         borderRadius: '24px', 
//         boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
//         border: '1px solid #f0f0f0'
//       }}>
//         {/* Header Section */}
//         <div style={{ textAlign: 'center', marginBottom: '35px' }}>
//           <div style={{ 
//             background: '#ebf8ff', 
//             width: '60px', 
//             height: '60px', 
//             borderRadius: '15px', 
//             display: 'flex', 
//             justifyContent: 'center', 
//             alignItems: 'center', 
//             margin: '0 auto 15px',
//             color: '#3182ce'
//           }}>
//             <PlusCircle size={32} />
//           </div>
//           <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0' }}>
//             Raise New Ticket
//           </h2>
//           <p style={{ color: '#718096', marginTop: '8px' }}>Fill in the details to notify the support team.</p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

//           {/* Issue Input */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginLeft: '4px' }}>
//               Issue Description
//             </label>
//             <div style={{ position: 'relative' }}>
//               <MessageSquare size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
//               <input 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 placeholder="e.g. Database connection failing..." 
//                 required 
//                 style={{ 
//                   width: '100%', 
//                   padding: '14px 14px 14px 45px', 
//                   borderRadius: '12px', 
//                   border: '1px solid #e2e8f0', 
//                   outline: 'none',
//                   fontSize: '16px',
//                   transition: '0.3s',
//                   boxSizing: 'border-box'
//                 }} 
//                 onFocus={(e) => e.target.style.borderColor = '#3182ce'}
//                 onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
//               />
//             </div>
//           </div>

//           {/* Priority Select */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//             <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginLeft: '4px' }}>
//               Select Priority
//             </label>
//             <div style={{ position: 'relative' }}>
//               <Tag size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
//               <select 
//                 value={priority} 
//                 onChange={(e) => setPriority(e.target.value)} 
//                 style={{ 
//                   width: '100%', 
//                   padding: '14px 14px 14px 45px', 
//                   borderRadius: '12px', 
//                   border: '1px solid #e2e8f0', 
//                   background: 'white',
//                   fontSize: '16px',
//                   appearance: 'none',
//                   cursor: 'pointer',
//                   boxSizing: 'border-box'
//                 }}
//               >
//                 <option value="P1">P1 - Critical (Immediate Help)</option>
//                 <option value="P2">P2 - Standard (Functional Issue)</option>
//                 <option value="P3">P3 - Low (General Inquiry)</option>
//               </select>
//             </div>
//           </div>

//           {/* Info Box */}
//           <div style={{ 
//             background: '#f7fafc', 
//             padding: '15px', 
//             borderRadius: '12px', 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: '12px',
//             border: '1px dashed #cbd5e0'
//           }}>
//             <Clock size={20} color="#718096" />
//             <span style={{ fontSize: '13px', color: '#4a5568', fontWeight: '500' }}>
//               {getPriorityInfo()}
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             style={{ 
//               marginTop: '10px',
//               padding: '16px', 
//               background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)', 
//               color: 'white', 
//               border: 'none', 
//               borderRadius: '12px', 
//               fontWeight: 'bold', 
//               fontSize: '16px',
//               cursor: 'pointer', 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               gap: '10px',
//               boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
//               transition: '0.3s'
//             }}
//             onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
//             onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
//           >
//             <Send size={18} /> Raise Ticket
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Simple Icon for Header
// const PlusCircle = ({size}) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"></circle>
//     <line x1="12" y1="8" x2="12" y2="16"></line>
//     <line x1="8" y1="12" x2="16" y2="12"></line>
//   </svg>
// );

// export default CreateTicket;



// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Tag, MessageSquare, Clock, PlusCircle, User } from 'lucide-react'; // User icon add kiya

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('P3');

  // 🔥 1. Nayi States: Assignee ke liye
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedEmail, setAssignedEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);


  // 🔥 2. Employees ki list (Yahi se dropdown bharega)
  // const employees = [
  //   { name: "Rahul Sharma", email: "rahul@example.com" },
  //   { name: "Priya Singh", email: "priya@example.com" },
  //   { name: "Amit Patel", email: "amit@example.com" },
  //   { name: "Nitish", email: "knitish16692@gmail.com" },
  //   { name: "Admin Test", email: "hariom.bca2023@huroorkee.ac.in" } // Aapka email testing ke liye
  // ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://https://sla-backend-otk0.onrender.com/api/auth/employees');
        console.log("Employees List from DB:", res.data);
        setEmployees(res.data); // Database ka data yahan set ho gaya
      } catch (err) {
        console.error("Employee list fetch karne mein error aaya", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignedTo) return alert("Please select an employee!"); // Validation

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // 🔥 3. Backend ko ab 'assignedTo' aur 'assignedEmail' bhi bhej rahe hain
      await axios.post('http://https://sla-backend-otk0.onrender.com/api/tickets/create',
        {
          title,
          priority,
          assignedTo,
          assignedEmail
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ticket Raised & Employee Notified! ✅");
      navigate('/tickets');
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityInfo = () => {
    if (priority === 'P1') return "Critical: 2 Hours Resolution Target";
    if (priority === 'P2') return "High: 8 Hours Resolution Target";
    return "Standard: 24 Hours Resolution Target";
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '550px', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>

        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ background: '#ebf8ff', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 15px', color: '#3182ce' }}>
            <PlusCircle size={32} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', margin: '0' }}>Raise New Ticket</h2>
          <p style={{ color: '#718096', marginTop: '8px' }}>Fill in the details to notify the support team.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

          {/* Issue Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginLeft: '4px' }}>Issue Description</label>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Database connection failing..."
                required
                style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* 🔥 4. NAYA SECTION: Assign To Dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginLeft: '4px' }}>Assign To Employee</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0', zIndex: 1 }} />
              <select
                required
                value={assignedTo}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  if (!selectedName) {
                    setAssignedTo('');
                    setAssignedEmail('');
                    return;
                  }
                  const emp = employees.find(emp => emp.name === selectedName);
                  if (emp) {
                    setAssignedTo(emp.name);
                    setAssignedEmail(emp.email);
                  }
                }}

                style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontSize: '16px', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="">-- Select Employee --</option>
                {employees.map((emp, idx) => (
                  <option key={idx} value={emp.name}>{emp.name} ({emp.email})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginLeft: '4px' }}>Select Priority</label>
            <div style={{ position: 'relative' }}>
              <Tag size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#a0aec0' }} />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: '100%', padding: '14px 14px 14px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontSize: '16px', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="P1">P1 - Critical (2 Hours)</option>
                <option value="P2">P2 - Standard (8 Hours)</option>
                <option value="P3">P3 - Low (24 Hours)</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px dashed #cbd5e0' }}>
            <Clock size={20} color="#718096" />
            <span style={{ fontSize: '13px', color: '#4a5568', fontWeight: '500' }}>{getPriorityInfo()}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px', padding: '16px',
              background: loading ? '#a0aec0' : 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
              color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)'
            }}
          >
            <Send size={18} /> {loading ? "Raising..." : "Raise Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;