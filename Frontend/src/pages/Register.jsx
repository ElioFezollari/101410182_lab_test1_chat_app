import React, { useState } from 'react';
import user from '../assets/user.svg';
import lock from "../assets/lock.svg";
import { Link } from 'react-router';
import axios from 'axios';
import { register } from '../services/API';

const baseUrl = 'http://localhost:3000';

function Register() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const registerUser = async (e) => {
        e.preventDefault(); 
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await register({username,firstName,lastName,password,confirmPassword})
            if (response.status === 201) {
              console.log(response.data.token)
                localStorage.setItem('token', response.data.token); 
                setSuccess("Registration successful!");
            }
        } catch (err) {
          console.log(err)
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="login-div-wrapper">
            <div className="login-wrapper register-wrapper">
                <div className="login-header-div">
                    <h1>Register</h1>
                </div>
                <form onSubmit={registerUser}>
                    <div className="login-input-wrapper">
                        <img src={user} alt="user icon" className="login-input-icon" />
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" required />
                    </div>
                    <div className="login-input-wrapper">
                        <img src={user} alt="user icon" className="login-input-icon" />
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" placeholder="First Name" required />
                    </div>
                    <div className="login-input-wrapper">
                        <img src={user} alt="user icon" className="login-input-icon" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" placeholder="Last Name" required />
                    </div>
                    <div className="login-input-wrapper">
                        <img src={lock} alt="lock icon" className="login-input-icon" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <div className="login-input-wrapper">
                        <img src={lock} alt="lock icon" className="login-input-icon" />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input type="submit" value="Register" />
                </form>
                <Link to="/">Or login here</Link>
            </div>
        </div>
    );
}

export default Register;
