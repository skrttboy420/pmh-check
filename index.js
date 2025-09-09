
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const LINE_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const GROUP_ID = process.env.LINE_GROUP_ID;

async function sendLineMessage(message) {
  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: GROUP_ID,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LINE_TOKEN}`
      }
    });
    console.log("✅ Message sent:", message);
  } catch (error) {
    console.error("❌ LINE Error:", error.response?.data || error.message);
  }
}

// 🔗 Endpoint ที่ Canva จะเรียก
app.post('/api/send-to-line', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Missing 'message' field");

  sendLineMessage(message);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
setInterval(() => {
  fetch('https://ชื่อโดเมนของคุณ.onrender.com/api/ping')
    .then(() => console.log('Ping sent to keep server awake'))
    .catch(err => console.error('Ping failed:', err));
}, 300000); // ทุก 5 นาที
