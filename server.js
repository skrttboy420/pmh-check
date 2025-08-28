const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// ✅ เปิด CORS สำหรับทุก origin
app.use(cors());
app.use(express.json());

app.post('/api/send-to-line', async (req, res) => {
  const { message } = req.body;
  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: process.env.LINE_GROUP_ID,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
      }
    });
    res.status(200).send('Message sent to LINE');
  } catch (error) {
    console.error('LINE error:', error.response?.data || error.message);
    res.status(500).send('Failed to send message');
  }
});

app.listen(3000, () => {
  console.log('เซิร์ฟเวอร์ทำงานที่ http://localhost:3000');
});
