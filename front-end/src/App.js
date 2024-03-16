import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/chat/Chat'
import CreatePost from './components/Posts/CreatePost/CreatePost';
import PostList from './components/Posts/ViewPosts/PostList';
import ViewDiscussion from './components/discussion/ViewDiscussion/ViewDiscussion';
import DiscussionList from './components/discussion/DiscussionList/DiscussionList';
import DiscussionCreate from './components/discussion/DiscussionCreate/DiscussionCreate';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for existing login state (optional, for persistence)
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<CreatePost/>}/>
            <Route path="/posts" element={<PostList/>}/>
            <Route path="/discussion/:id" element={<ViewDiscussion/>}/>
            <Route path="/discussion/lists" element={<DiscussionList/>}/>
            <Route path="/discussion/create" element={<DiscussionCreate/>}/>
            <Route path="/chatbot" element={<Chat />} />
            {/* <Apps/> */}
          </>
        )}
        {isLoggedIn && <Route path="/home" element={<Chat />} />}
      </Routes>
    </Router>
  );
}

export default App;