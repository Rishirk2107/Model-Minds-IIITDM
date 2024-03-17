import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ViewDiscussion.css"

function ViewDiscussion() {
  const [messages, setMessages] = useState([]); // Array to store chat messages
  const [topic, setTopic] = useState('Chat Topic'); // Topic displayed at the tops
  const [username, setUsername] = useState(''); // User's username (optional)

  const discussionid = window.location.href.split("/").pop()

  // Function to handle message submission
  const handleSubmitMessage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newMessage = {
      sender: username || 'You', // Use username if provided, otherwise default to 'You'
      content: messageInput.current.value,
      isSentByUser: true, // Flag to indicate message sent by user
    };
    setMessages([...messages, newMessage]); // Add new message to state
    messageInput.current.value = ''; // Clear input field after sending
  };

  // Fetch username from an endpoint
  useEffect(() => {
    axios.post('http://localhost:5000/username')
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching username:', error);
      });
  }, []); // Run the effect only once, when the component mounts

  // Simulate receiving messages from other users (replace with actual backend integration)
  useEffect(() => {
    const receivedMessage = {
      sender: 'Star_boy_89', // Name of the other user
      content: 'Please help me to overcome drug addiction',
      isSentByUser: false,
    };
    setMessages([...messages, receivedMessage]);
  }, []); // Run the effect only once, when the component mounts

  const messageInput = React.createRef(); // Reference for the message input field

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">{topic}</h1>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.isSentByUser ? 'sent-by-user' : 'sent-by-other'
            }`}
          >
            <span className="chat-message-sender">{message.sender}</span>
            <p className="chat-message-content">{message.content}</p>
          </div>
        ))}
      </div>
      <form className="chat-form mt-4 row" onSubmit={handleSubmitMessage}>
        <div className="col-md-6 mb-3">
          <br></br>
          <input
            type="text"
            ref={messageInput}
            className="form-control"
            placeholder="Type your message..."
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <br></br>
          <button type="submit" className="btn btn-primary btn-block">Send</button>
        </div>
      </form>
    </div>
  );
}

export default ViewDiscussion;
