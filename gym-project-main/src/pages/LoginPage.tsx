import React, { useState } from 'react';
import { Client, Account } from 'appwrite'; // Import Client and Account from Appwrite
import { motion } from 'framer-motion';
import './Login.css'; // Import your styles
import Image from '../assets/images/white.png'; // Ensure this path is correct

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-wrapper">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 20 }} // Initial state for the container
        animate={{ opacity: 1, y: 0 }} // Final state when animated
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h2>Welcome back</h2>
        <p>Please enter your details.</p>

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label>Email</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label>Password</label>
          </div>

          <div className="login-options">
            <div>
              <a href="#">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="login-btn">Log In</button>
        </form>
        <div className="i">
          <p>Don't have an account? <a href="#">Sign up for free</a></p>
        </div>
      </motion.div>

      {/* Right side where you can add your own image */}
      <motion.div 
        className="login-image-container"
        initial={{ x: 100, opacity: 0 }} // Initial state for the image
        animate={{ x: 0, opacity: 1 }} // Final state when animated
        transition={{ duration: 0.5 }} // Animation duration
      >
        <img src={Image} alt="Custom" className="custom-image" />
      </motion.div>
    </div>

  );
};

export default Login;
