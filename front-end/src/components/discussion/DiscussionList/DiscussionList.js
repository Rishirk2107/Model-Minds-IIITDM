import React, { useState } from 'react';

function DiscussionList() {
  const topics = [
    { id: 1, name: 'How to gwt out of Drugs', users: ['John', 'Jane'],topicid:"dkjnzlsdcl" },
    { id: 2, name: 'I am feeling dizzy always', users: ['Alice', 'Bob'],topicid:"dkjnzlsdcl" },
    { id: 3, name: 'Plz Help me, I am addicted', users: ['Charlie', 'David'],topicid:"dkjnzlsdcl" },
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (topic) => {
    window.location.href="/discussion/"+topic.topicid;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Topics</h2>
          <ul className="list-group">
            {topics.map((topic) => (
              <li key={topic.id} className="list-group-item">
                <button className="btn btn-link" onClick={() => handleTopicClick(topic)}>
                  {topic.name} ({topic.users.length})
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {selectedTopic && (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Selected Topic: {selectedTopic.name}</h3>
                <p className="card-text">Users: {selectedTopic.users.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscussionList;