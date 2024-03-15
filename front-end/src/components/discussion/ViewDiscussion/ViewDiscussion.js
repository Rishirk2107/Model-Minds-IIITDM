import React, { useState, useEffect } from 'react';
import "./ViewDiscussion.css"

function ViewDiscussion() {
  const [messages, setMessages] = useState([]); // Array to store chat messages
  const [topic, setTopic] = useState('Chat Topic'); // Topic displayed at the top
  const [username, setUsername] = useState(''); // User's username (optional)

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

  // Simulate receiving messages from other users (replace with actual backend integration)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const receivedMessage = {
        sender: 'Other User', // Name of the other user
        content: 'This is a message from another user.',
        isSentByUser: false,
      };
      setMessages([...messages, receivedMessage]);
    }, 2000); // Simulate receiving messages every 2 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, [messages]); // Run the effect only when messages state changes

  const messageInput = React.createRef(); // Reference for the message input field

  return (
    <div className="chat-app">
      <h1 className="chat-topic">{topic}</h1>
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
      <form className="chat-form" onSubmit={handleSubmitMessage}>
        {username ? null : ( // Only display username input if not set
          <div className="username-input">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
        )}
        <input
          type="text"
          ref={messageInput}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ViewDiscussion;
