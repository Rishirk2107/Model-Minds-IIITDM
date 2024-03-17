// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/chat">Chatbot</Link>
        </li>
        <li>
          <Link to="/postlist">Posts</Link>
        </li>
        <li>
          <Link to="/createpost">Create Post</Link>
        </li>
        <li>
          <Link to="/discussion/list">Discussions</Link>
        </li>
        <li>
          <Link to="/discussion/create">Create Discussion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
