const Ticket = require('../models/Ticket');
const sendEmail = require('./emailService');

const monitorSla = async () => {
  try {
    const now = new Date();

    // 1. Wo tickets dhoondo jo Resolved nahi hain aur deadline nikal chuki hai
    // Aur jinka Breach Email abhi tak nahi gaya hai
    const breachedTickets = await Ticket.find({
      status: { $ne: 'Resolved' },
      deadline: { $lt: now },
      isBreachedEmailSent: { $ne: true } 
    });

    if (breachedTickets.length > 0) {
      console.log(`🔍 Found ${breachedTickets.length} new breached tickets.`);

      for (const ticket of breachedTickets) {
        // 2. Admin ko Breach ka Alert Mail bhejien
        await sendEmail(
          'hy705954@gmail.com', 
          `🚨 SLA BREACHED: ${ticket.title}`,
          `Hello Admin,\n\nThe ticket "${ticket.title}" has officially breached its SLA deadline.\n\nPriority: ${ticket.priority}\nDeadline was: ${ticket.deadline.toLocaleString()}\nStatus: ${ticket.status}\n\nPlease take immediate action.`
        );

        // 3. Database mein updates: Status ko 'Breached' mark karein aur flag true karein
        ticket.isBreached = true;
        ticket.isBreachedEmailSent = true;
        await ticket.save();

        console.log(`✅ Breach alert sent and database updated for: ${ticket.title}`);
      }
    } else {
      console.log('✅ No new SLA breaches detected.');
    }
  } catch (err) {
    console.error('❌ Error in monitorSla:', err.message);
  }
};

module.exports = monitorSla;