const router = require('express').Router();
const Ticket = require('../models/Ticket');
const sendEmail = require('../utils/emailService');

router.delete('/:id', async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket nahi mila!" });
    }
    res.json({ message: "Ticket Deleted Successfully! 🗑️" });
  } catch (err) {
    res.status(500).json({ error: "Delete karne mein error aaya" });
  }
});



//  TREND STATS (For Dashboard Charts)
router.get('/stats/trend', async (req, res) => {
  try {
    const trendData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      startOfDay.setDate(startOfDay.getDate() - i);

      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const createdCount = await Ticket.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });

      const resolvedCount = await Ticket.countDocuments({
        status: 'Resolved',
        updatedAt: { $gte: startOfDay, $lte: endOfDay }
      });

      trendData.push({
        day: days[startOfDay.getDay()],
        created: createdCount,
        resolved: resolvedCount
      });
    }
    res.json(trendData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// 2. ➕ CREATE TICKET (With SLA & Assignment Notification)
// ---------------------------------------------------------
router.post('/create', async (req, res) => {
  try {
    const { title, description, priority, assignedTo, assignedEmail } = req.body;

    // SLA Logic
    const slaHours = { 'P1': 2, 'P2': 8, 'P3': 24 };
    const now = new Date();
    const deadline = new Date(now.getTime() + (slaHours[priority] || 24) * 60 * 60 * 1000);

    const newTicket = new Ticket({
      title,
      description,
      priority,
      deadline,
      assignedTo: assignedTo || "Unassigned",
      assignedEmail
    });

    const savedTicket = await newTicket.save();

    // 📧 Notification 1: Admin Alert (Sirf P1 ke liye)
    if (priority === 'P1') {
      sendEmail(
        'hy705954@gmail.com', // Aapka Admin Email
        `🔥 CRITICAL: New P1 Ticket - ${title}`,
        `Alert: A high-priority ticket has been raised.\nAssignee: ${assignedTo || 'Not Assigned'}\nDeadline: ${deadline.toLocaleString()}`
      );
    }

    // 📧 Notification 2: Assignee Alert (Employee ke liye)
    if (assignedEmail) {
      const loginUrl = "http://localhost:3000/login"; // Aapka frontend URL

      const emailContent = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #3182ce;">📌 New Task Assigned</h2>
          <p>Hello <strong>${assignedTo}</strong>,</p>
          <p>You have been assigned a new <strong>${priority}</strong> ticket.</p>
          <div style="background: #f7fafc; padding: 10px; margin: 15px 0;">
            <p><strong>Issue:</strong> ${title}</p>
            <p><strong>Deadline:</strong> ${deadline.toLocaleString()}</p>
          </div>
          <a href="${loginUrl}" style="background: #3182ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Login & View Task
          </a>
        </div>
      `;

      // Purana simple sendEmail hata kar ye wala pass karein
      await sendEmail(
        assignedEmail,
        `📌 Task Assigned: ${title}`,
        emailContent // Ab ye text nahi, HTML bhej raha hai
      );
    }
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// 3. ✅ RESOLVE TICKET (With Notes & Delay Reason Logic)
// ---------------------------------------------------------
router.put('/resolve/:id', async (req, res) => {
  try {
    const { notes, delayReason, proofUrl } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const now = new Date();

    ticket.status = 'Resolved';
    ticket.resolutionNotes = notes;
    ticket.proofUrl = proofUrl;
    ticket.resolvedAt = now;

    // Smart Breach Check: Agar resolve karte waqt deadline nikal chuki hai
    if (ticket.isBreached || now > ticket.deadline) {
      ticket.isBreached = true;
      ticket.delayReason = delayReason || "No reason provided for delay.";
    }

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔄 RE-OPEN TICKET (Only Admin)
router.put('/reopen/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket nahi mila!" });
    }

    // 1. Database update
    ticket.status = 'Open';
    ticket.resolvedAt = null; 
    ticket.reopenCount = (ticket.reopenCount || 0) + 1; 
    
    await ticket.save();

    // 2.Notification
    if (ticket.assignedEmail) {
      try {
        await sendEmail(
          ticket.assignedEmail, 
          "🚨 Task Re-opened: Work Rejected", 
          `Hi ${ticket.assignedTo}, your work on "${ticket.title}" was not satisfactory. Please check admin notes and re-submit the task correctly.`
        );
      } catch (emailErr) {
        console.log("Email bhejane mein dikat aayi, par ticket reopen ho gaya.");
      }
    }

    res.json({ message: "Ticket Re-opened & Employee notified! 🔄" });

  } catch (err) {
    res.status(500).json({ error: "Server Error: " + err.message });
  }
});

// Reopen route ke andar
// if (ticket.assignedEmail) {
//   sendEmail(
//     ticket.assignedEmail, 
//     "🚨 Task Re-opened: Work Rejected", 
//     `Hi ${ticket.assignedTo}, your work on "${ticket.title}" was not satisfactory. Please check notes and re-submit.`
//   );
// }
// ---------------------------------------------------------
// 4. 📊 PERFORMANCE ANALYTICS (Employee Wise Stats)
// ---------------------------------------------------------
router.get('/stats/performance', async (req, res) => {
  try {
    const stats = await Ticket.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          totalTickets: { $sum: 1 },
          resolved: { $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] } },
          breached: { $sum: { $cond: ["$isBreached", 1, 0] } }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------
// 5. 🔍 GET ALL TICKETS (Sorted by Latest)
// ---------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;