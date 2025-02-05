import React from 'react';
import user from '../assets/user.svg';
import lock from "../assets/lock.svg"
import { Link } from 'react-router';
function Login() {
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
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="login-input-wrapper">
          <img src={lock} alt="lock icon" className="login-input-icon" />
          <input type="password" placeholder="Password" />
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
