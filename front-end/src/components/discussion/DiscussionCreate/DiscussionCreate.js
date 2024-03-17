import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './DiscussionCreate.css'; 

function DiscussionCreate() {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDetails, setTopicDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Track error messages

  const handleTopicTitleChange = (event) => {
    setTopicTitle(event.target.value);
  };

  const handleTopicDetailsChange = (event) => {
    setTopicDetails(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!topicTitle || !topicDetails) {
      setErrorMessage('Please enter both topic title and details.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/create/discussion', {
        title: topicTitle,
        details: topicDetails,
      });

      console.log('Topic created:', response.data); // Handle successful response (e.g., show success message)
      setTopicTitle(''); // Clear input fields after successful submission
      setTopicDetails('');
    } catch (error) {
      console.error('Error creating topic:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container discussion-create-container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Create a Topic</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="topic-title">Topic Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="topic-title"
                    value={topicTitle}
                    onChange={handleTopicTitleChange}
                    placeholder="Enter the topic title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="topic-details">Topic Details:</label>
                  <textarea
                    className="form-control"
                    id="topic-details"
                    value={topicDetails}
                    onChange={handleTopicDetailsChange}
                    placeholder="Enter detailed information about the topic"
                    required
                  />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <br></br>
                <button type="submit" className="btn btn-primary">Create Topic</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscussionCreate;