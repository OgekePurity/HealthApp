const express = require('express');
const axios = require('axios');
const router = express.Router();

const CHATBOT_API_ENDPOINT = process.env.CHATBOT_API_ENDPOINT;

// POST route to send a message to the chatbot
router.post('/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(CHATBOT_API_ENDPOINT, { message });
    res.json(response.data);
  } catch (err) {
    console.error('Error sending message to chatbot:', err);
    res.status(500).json({ error: 'Failed to send message to chatbot' });
  }
});

module.exports = router;
