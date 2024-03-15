import React, { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Initial state: closed

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle state on click
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar content */}
      <button onClick={toggleSidebar}>Close Sidebar</button>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        {/* ... */}
      </ul>
    </div>
  );
}

function Apps() {
  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
      {/* Main content */}
      <Sidebar />
    </div>
  );
}

export default Apps;
