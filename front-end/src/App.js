import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <div>
        <nav>
          <ul>
            {isLoggedIn && (
              <>
                 <Route path="/home" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/postlist" element={<PostList />} />
              <Route path="/discussion/list" element={<DiscussionList />} />
              <Route path="/discussion/create" element={<DiscussionCreate />} />
              <Route path="/discussion/:id" element={<ViewDiscussion />} />
                {/* You can add more links here */}
              </>
            )}
          </ul>
        </nav>

        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/postlist" element={<PostList />} />
              <Route path="/discussion/list" element={<DiscussionList />} />
              <Route path="/discussion/create" element={<DiscussionCreate />} />
              <Route path="/discussion/:id" element={<ViewDiscussion />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/home" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/postlist" element={<PostList />} />
              <Route path="/discussion/list" element={<DiscussionList />} />
              <Route path="/discussion/create" element={<DiscussionCreate />} />
              <Route path="/discussion/:id" element={<ViewDiscussion />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
