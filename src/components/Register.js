import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {auth} from "./firebase"
import toast from 'react-hot-toast';
// import './RegistrationPage.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    try{
        await createUserWithEmailAndPassword(auth,email,password);
        const user=auth.currentUser;
        console.log(user)

        toast.success("Registered Successfully",{
            position:"top-center"
        }) 
    }
    catch(e){
        console.log(e.message)
        toast.error(e.message,{
            position:"top-center"
        })
    }
    // Here you can add your registration logic, such as sending the data to a server
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
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
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;