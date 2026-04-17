const nodemailer = require('nodemailer');

// 'text' variable ka naam badal kar 'content' kar dete hain kyunki ab hum HTML bhej rahe hain
const sendEmail = async (to, subject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'hy705954@gmail.com', 
        pass: 'blnc bdwn oqaa tzlm' // App Password sahi hai
      }
    });

    const mailOptions = {
      from: 'SLA Tracker <hy705954@gmail.com>',
      to,
      subject,
      // 👇 Sabse important change: 'text' ki jagah 'html' use karein
      html: content 
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Professional Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};

module.exports = sendEmail;