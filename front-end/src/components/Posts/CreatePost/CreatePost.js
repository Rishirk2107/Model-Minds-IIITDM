import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import './CreatePost.css';

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // Initial upload status
  const [errorMessage, setErrorMessage] = useState(''); // To store any errors
  const [userid,setUserid]=useState('');
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [hashtags,setHashtags]=useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    

    setUploadStatus('uploading'); // Update status for UI feedback

    try {
      const formData = new FormData();
      formData.append('productImage', selectedFile);
      // Append additional data fields here
      formData.append('userid', userid);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('hashtags', hashtags);

      const response = await axios.post('http://13.235.245.167:5000/upload', formData, {
        headers: {
          // Add any necessary headers for authentication or content type, if applicable
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      console.log('Upload response:', response.data);
      setUploadStatus('success');
      setSelectedFile(null);
      setUserid(''); // Clear other fields after successful upload (optional)
      setTitle('');
      setContent('');
      setHashtags('');
      setErrorMessage(''); // Clear any previous errors
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('failed');
      setErrorMessage('An error occurred during upload. Please try again.');
    }
  };
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="mb-3">
          <label htmlFor="userid" className="form-label">User ID:</label>
          <input type="text" className="form-control" id="userid" name="userid" value={userid} onChange={(e) => setUserid(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea className="form-control" id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="hashtags" className="form-label">Hashtags (comma-separated):</label>
          <input type="text" className="form-control" id="hashtags" name="hashtags" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Product Image:</label>
          <input type="file" className="form-control" id="productImage" name="productImage" onChange={handleFileChange} />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" disabled={uploadStatus === 'uploading'}>
            {uploadStatus === 'idle' ? 'Create Post' : uploadStatus === 'uploading' ? 'Creating Post...' : 'Post Creation Failed'}
          </button>
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CreatePost;