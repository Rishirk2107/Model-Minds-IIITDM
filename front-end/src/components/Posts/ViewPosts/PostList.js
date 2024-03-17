import React, { useState, useEffect } from 'react';
import ReactSwipe from 'react-swipe';
import Post from "./Post"
import axios from "axios"
import './StoryList.css';

const PostList = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simulate fetching stories from backend (replace with real API call)
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.post('http://13.235.245.167:5000/posts');
        console.log(response.data.posts);
        setStories(response.data.posts); // Assuming the response contains an array of posts
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
    fetchStories()
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="story-list">
      <ReactSwipe
        className="swipe-container"
        swipeOptions={{ continuous: false }}
        onSwipe={(direction) => handleSwipe(direction)}
      >
        {stories.map((story, index) => (
          <div key={index} className={`story-item ${index === currentIndex ? 'active' : ''}`}>
            <Post {...story} />
          </div>
        ))}
      </ReactSwipe>
    </div>
  );
};

export default PostList;
