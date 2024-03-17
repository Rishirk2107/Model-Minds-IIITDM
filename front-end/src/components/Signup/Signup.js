// Signup.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setusername]=useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.235.245.167:5000/signup', {
        username,
        email,
        password,
      });
      console.log(response.data);
      if(response.data.message==1){
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded">
            <div className="card-body p-5">
            <h4 className="card-subtitle mb-4 text-muted card-title text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif',fontSize:'2em'}}>Life Redemption</h4>

              <h2 className="card-title text-center mb-4">Signup</h2>
              <form onSubmit={handleSignup}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                <label htmlFor="username">Email Id</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                <label htmlFor="username">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-block">Signup</button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
