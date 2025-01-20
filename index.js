const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
// require('dotenv').config(); // Load environment variables from `.env`

const app = express();
const PORT = 3000;

// Set the start and end indices for sending emails
const startIndex = 0; // Starting index
const endIndex = 100; // Ending index (exclusive)

// Load user email list
const users = JSON.parse(fs.readFileSync('file.json', 'utf-8'));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'enter your mail', // Your Gmail address
    pass: ' app password ', // Your Gmail app password 
  },
});

// Function to send email
const sendEmail = async (user) => {
  try {
    const emailContent = `
     <div style="max-width: 500px; margin: auto; margin-top: 20px; padding: 20px; border: 1px solid #E5E7EB; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <h2 style="font-size: 1.5rem; text-align: left; font-weight: bold; color: #1480d9;">Hello ${user.full_name}</h2>
  <h1 style="font-size: 2.5rem; text-align: center; font-weight: bold; color: #2D3748;">You're a Step Ahead!</h1>
  <hr style="height: 1px; margin-top: 24px; margin-bottom: 24px; background-color: #E5E7EB; border: none;">
  <p style="font-size: 1.125rem; color: #4A5568; text-align: center;">
    <h3>Hope you're doing great! </h3>
    <div style="font-family: Poppins; font-size: 18px; color: #333; letter-spacing: 0.5px; line-height: 24px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      I wanted to remind you that the classroom recordings are available at <a href="https://youtu.be/XG1rHK51vo0?si=04AWPNK9a0RU2dp9" target="_blank">Link</a>. These resources will help you reinforce your learning and prepare for your future endeavors.
    </div>
   
    <div style="text-align: center; margin-top: 20px;"> 
      <a href="https://youtu.be/XG1rHK51vo0?si=04AWPNK9a0RU2dp9" target="_blank" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 1.3rem;">Access Recording</a> 
    </div>
    <br>
     <div style="text-align: center; margin-top: 20px;"> 
      <a href="https://www.whatsapp.com/channel/0029Va51swaKwqSRrwrG1K17" target="_blank" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 1.3rem;">Join Us Our Whatsapp Channel</a> 
    </div>
     <div style="text-align: center; margin-top: 20px;"> 
      <a href="https://www.youtube.com/channel/UCy3qhIOQb3-ExtKM6eMbhjg?sub_confirmation=1" target="_blank" style="display: inline-block; background-color: red; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 1.3rem;">Subscribe For More</a> 
    </div>
    <img src="https://img.youtube.com/vi/XG1rHK51vo0/sddefault.jpg" alt="Inspiration" style="width: 100%; height: auto; margin-top: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <br><br>
    <p>Your hard work and dedication make us proud! Keep learning, growing, and striving for excellence.</p>
    <p>Best wishes, <br>
    Himanshu Kumar</p>
  </p>
  <p style="font-size: 0.875rem; margin-top: 20px; text-align: center; color: #9CA3AF;">
    This message was sent from Emprux, Inc., 1633 Noida, Ground floor, Noida, 201301
  </p>
</div>
    `;

    const mailOptions = {
      from: `"Name Of The Mail" <Enter Your Email Address>`, // Sender address
      to: user.email, // Receiver email
      subject: '📊 Enter Your Subject 📹', // Subject line 
      html: emailContent, // HTML body content
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}:`, error.message);
  }
};

// Function to send emails in sequence
const sendEmails = () => {
  let index = startIndex; // Set the starting index
  const sendNextEmail = () => {
    if (index < endIndex && index < users.length) {
      sendEmail(users[index]);
      index++;
      setTimeout(sendNextEmail, 3000); // Send the next email after 3 seconds
    } else {
      console.log(`Emails sent from user ${startIndex} to ${endIndex - 1}.`);
    }
  };
  sendNextEmail();
};

// Automatically start sending emails when the server starts
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sendEmails(); // Start sending emails automatically
});
