const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');

// Routes aur Utilities import karein
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes');
const monitorSla = require('./utils/monitorSla'); 

dotenv.config();
const app = express();

// --- 1. SOCKET.IO SETUP ---
const server = http.createServer(app); // Server yahan ban gaya
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('⚡ A user connected:', socket.id);
  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

app.use(cors({
    origin: "https://smart-sla-monitoring-system.vercel.app", // Aapka frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- 3. DATABASE CONNECTION ---
const MONGO_URI = "mongodb://127.0.0.1:27017/sla_monitor";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// --- 4. ROUTES ---
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);

// --- 5. AUTOMATIC BREACH MONITOR (CRON JOB) ---
// Ye monitorSla() function aapke utils folder mein hona chahiye
cron.schedule('*/5 * * * *', () => { // Har 5 minute mein check karega
    console.log('--- 🛡️ Running SLA Health Check ---');
    monitorSla(); 
});

// --- 6. SERVER START ---
const PORT = 5000;
// ⚠️ Dhyan dein: app.listen ki jagah server.listen use karna hai socket ke liye
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} and SLA monitoring active.`);
});