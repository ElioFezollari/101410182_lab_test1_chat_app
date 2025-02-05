import React, { useState } from 'react';
import user from '../assets/user.svg';
import lock from "../assets/lock.svg";
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { login } from '../services/API';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await login({username,password});
      console.log(response)
      if (response.status === 201) {

        localStorage.setItem('token', response.data.token); 
        navigate('/chat')
        setSuccess("Login successful!");

    
      }
    } catch (err) {
      console.log("Login Error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-div-wrapper">
      <div className="login-wrapper">
        <div className="login-header-div">
          <h1>Login</h1>
        </div>
        <form onSubmit={loginUser}>
          <div className="login-input-wrapper">
            <img src={user} alt="user icon" className="login-input-icon" />
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              name="username" 
              placeholder="Username" 
              required 
            />
          </div>
          <div className="login-input-wrapper">
            <img src={lock} alt="lock icon" className="login-input-icon" />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          
          <input type="submit" value="Login" />
        </form>
        <Link to="/register">Or register here</Link>
      </div>
    </div>
  );
}

export default Login;
