import React from 'react';
import './Story.css';

const Post= ({ userId, title, content, pics, likes, comments, shares }) => {
  return (
    <div className="story">
      <header>
        <img src={`https://picsum.photos/id/${userId}/50/50`} alt="Profile Picture" />
        <span>{userId}</span>
      </header>
      <div className="content">
        <h2>{title}</h2>
        <p>{content}</p>
        <img src={pics[0]} alt={title} className="main-pic" />
      </div>
      <footer>
        <span>
          <i className="fas fa-heart"></i> {likes}
        </span>
        <span>
          <i className="fas fa-comment"></i> {comments}
        </span>
        <span>
          <i className="fas fa-share"></i> {shares}
        </span>
      </footer>
    </div>
  );
};

export default Post;
