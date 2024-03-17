import React, { useState } from 'react';
import axios from 'axios';

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');

    const url = 'http://localhost:5000/process_data'; // Update with your Flask server URL

    try {
      const response = await axios.post(url, { name: message });

      if (response.status === 200) {
        const responseData = response.data;
        const responseMessage = responseData.message;
        setMessages([...messages, { text: responseMessage, isUser: false }]);
        console.log("Response from Flask:", response.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center">HopeGuide</h1>
      <div className="chat-box p-3" style={{ height: '400px', overflowY: 'scroll', background: '#f0f0f0', borderRadius: '10px' }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="input-group mt-4">
        <input
          type="text"
          className="form-control input-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ text, isUser }) {
  return (
    <div className={`message-container ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message p-2" style={{ borderRadius: '8px', background: isUser ? '#e5e5ff' : '#c2f0c2' }}>
        {text}
      </div>
    </div>
  );
}

export default function ChatbotApp() {
  return (
    <div className="App">
      <ChatScreen />
    </div>
  );
}