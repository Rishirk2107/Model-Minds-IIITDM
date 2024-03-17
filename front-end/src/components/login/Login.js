import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://13.235.245.167:5000/login', { username, password });
      console.log(response.data)
      if (response.data.message == '1') {
        navigate('/home');
        // Optionally store login state for persistence (e.g., localStorage)
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg rounded">
          <div className="card-body p-5">
          <h4 className="card-subtitle mb-4 text-muted card-title text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif',fontSize:'2em'}}>Life Redemption</h4>
            <h2 className="card-title text-center mb-4">Welcome Back!</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">Login</button>
            </form>
            <div className="text-center mt-3">
            <p className="text-center mt-3">
            Don't have an account?  <Link to="/signup">Sign up here</Link>
            </p>
            </div>
            {errorMessage && <p className="error-message text-center mt-3">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
