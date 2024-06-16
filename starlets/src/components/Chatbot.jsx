import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import your Axios instance
import "./Chatbot.css";

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/api/chatbot/send-message",
        { message: message }
      );
      console.log("Chatbot response:", response.data);
      setResponse(response.data);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      if (error.code === 'ECONNREFUSED') {
        alert('Error: Unable to connect to the server. Please check your server configuration.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="chatbot-container">
      <h2>Chatbot</h2>
      <div className="chat-message">
        {response && <p className="chatbot-response">{response}</p>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;