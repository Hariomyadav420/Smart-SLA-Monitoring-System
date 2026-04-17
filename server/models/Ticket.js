const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ['P1', 'P2', 'P3'],
    required: true
  },
  status: {
    type: String,
    default: 'Open' // Open, Resolved
  },
  deadline: {
    type: Date
  },
  isBreached: {
    type: Boolean,
    default: false
  },
  isBreachedEmailSent: {
    type: Boolean,
    default: false
  },

  // --- 1. ASSIGNMENT FIELDS (New) ---
  assignedTo: {
    type: String,
    default: "Unassigned"
  },
  assignedEmail: {
    type: String
  },

  
  // --- 2. RESOLUTION & PROOF FIELDS (New) ---
  resolutionNotes: {
    type: String
  },
  delayReason: {
    type: String
  },
  resolvedAt: {
    type: Date
  },

  // Ticket.js mein ye do fields add karein
proofUrl: {
   type: String 
  }, // Screenshot ya link ke liye
reopenCount: { type: Number, default: 0 } // Kitni baar Admin ne wapas bheja

}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', TicketSchema);