import React, { useState } from 'react';
import user from '../assets/user.svg';
import lock from "../assets/lock.svg";
import { Link } from 'react-router';

function Register() {
    const [username,setUsername] = useState()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
  return (
    <div className="login-div-wrapper ">
      <div className="login-wrapper register-wrapper">
        <div className="login-header-div">
          <h1>Register</h1>
        </div>
        <form action="">
          <div className="login-input-wrapper">
            <img src={user} alt="user icon" className="login-input-icon" />
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" placeholder="Username" />
          </div>
          <div className="login-input-wrapper">
            <img src={user} alt="user icon" className="login-input-icon" />
            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} name="firstName" placeholder="First Name" />
          </div>
          <div className="login-input-wrapper">
            <img src={user} alt="user icon" className="login-input-icon" />
            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} name="lastName" placeholder="Last Name" />
          </div>
          <div className="login-input-wrapper">
            <img src={lock} alt="lock icon" className="login-input-icon" />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className="login-input-wrapper">
            <img src={lock} alt="lock icon" className="login-input-icon" />
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          </div>
          <input type="submit" value="Register" />
        </form>
        <Link to="/">Or login here</Link>
      </div>
    </div>
  );
}

export default Register;
