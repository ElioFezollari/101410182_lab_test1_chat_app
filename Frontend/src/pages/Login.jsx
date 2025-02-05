import React, { useState } from 'react';
import user from '../assets/user.svg';
import lock from "../assets/lock.svg"
import { Link } from 'react-router';
function Login() {
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  return (
    <div className="login-div-wrapper">
      <div className="login-wrapper">
        <div className="login-header-div">
          <h1>Login</h1>
        </div>
        <form action="">
          <div>
          <div className="login-input-wrapper">
            <img src={user} alt="user icon" className="login-input-icon" />
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="Username" />
          </div>
          <div className="login-input-wrapper">
          <img src={lock} alt="lock icon" className="login-input-icon" />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          </div>
          <input type="submit" value="Login" />
        </form>
        <Link to="/register">Or register here</Link>
      </div>
    </div>
  );
}

export default Login;
