import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

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

      const response = await axios.post('http://localhost:5000/upload', formData, {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userid">User ID:</label>
        <input type="text" id="userid" name="userid" value={userid} onChange={(e) => setUserid(e.target.value)} />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label htmlFor="hashtags">Hashtags (comma-separated):</label>
        <input type="text" id="hashtags" name="hashtags" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
      </div>
      <div>
        <label htmlFor="productImage">Product Image:</label>
        <input type="file" id="productImage" name="productImage" onChange={handleFileChange} />
      </div>
      <div>
        <button type="submit" disabled={uploadStatus === 'uploading'}>
          {uploadStatus === 'idle' ? 'Create Post' : uploadStatus === 'uploading' ? 'Creating Post...' : 'Post Creation Failed'}
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default CreatePost;