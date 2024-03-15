import React, { useState } from 'react';

function DiscussionList() {
  const topics = [
    { id: 1, name: 'React Basics', users: ['John', 'Jane'],topicid:"dkjnzlsdcl" },
    { id: 2, name: 'JavaScript', users: ['Alice', 'Bob'],topicid:"dkjnzlsdcl" },
    { id: 3, name: 'CSS Styling', users: ['Charlie', 'David'],topicid:"dkjnzlsdcl" },
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (topic) => {
    window.location.href="/discussion/"+topic.topicid;
  };

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button onClick={() => handleTopicClick(topic)}>
              {topic.name} ({topic.users.length})
            </button>
          </li>
        ))}
      </ul>
      {selectedTopic && (
        <div className="selected-topic">
          <h3>Selected Topic: {selectedTopic.name}</h3>
          <p>Users: {selectedTopic.users.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default DiscussionList;