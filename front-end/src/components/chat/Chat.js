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
    <div>
      <h1>Chatbot</h1>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

function ChatMessage({ text, isUser }) {
  return (
    <div style={{ textAlign: isUser ? 'left' : 'right', margin: '10px 0', padding: '10px', borderRadius: '8px', background: isUser ? '#ddd' : 'blue' }}>
      {text}
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
