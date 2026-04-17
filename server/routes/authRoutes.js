const User = require('../models/User');
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// Saare employees ki list nikaalne ke liye
router.get('/employees', async (req, res) => {
  console.log("📥 Employee fetch request received...");
  try {
    const employees = await User.find({ role: 'Staff' }); 
    console.log("📤 Found Staff in DB:", employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Backend Error:", error); // Terminal mein error dekhein
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;