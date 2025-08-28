require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const groupId = process.env.LINE_GROUP_ID;

app.post('/api/send-to-line', async (req, res) => {
  const { message } = req.body;

  try {
    await axios.post('https://api.line.me/v2/bot/message/push', {
      to: groupId,
      messages: [{ type: 'text', text: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send('ส่งข้อความเรียบร้อยแล้ว');
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.response?.data || error.message);
    res.status(500).send('ส่งข้อความไม่สำเร็จ');
  }
});

app.listen(3000, () => {
  console.log('เซิร์ฟเวอร์ทำงานที่ http://localhost:3000');
});
