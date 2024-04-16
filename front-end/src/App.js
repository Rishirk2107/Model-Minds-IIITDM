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
import Navbar from './components/Navbar/Navbar';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
    <Router>
      <Navbar />
        <Routes>
            <>
              <Route path="/" element={<Login/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Chat />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/postlist" element={<PostList />} />
              <Route path="/discussion/list" element={<DiscussionList />} />
              <Route path="/discussion/create" element={<DiscussionCreate />} />
              <Route path="/discussion/:id" element={<ViewDiscussion />} />
            </>
         
        </Routes>
      
    </Router>
    </Provider>
  );
}

export default App;
