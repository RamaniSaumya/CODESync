import React, { useState } from 'react';
import '../App.css'; // Add a CSS file for styling
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {auth} from "./firebase"
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    try{
        await signInWithEmailAndPassword(auth,email,password);
        const user=auth.currentUser;
        console.log(user)
        navigate('/after_login');
    }
    catch(e){
        console.log(e.message)
        toast.error(e.message,{
            position:"top-center"
        })
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <button onClick={handleRegister} className="register-button">Register</button>
    </div>
  );
}

export default LoginPage;
