import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import your styles
import Image from '../assets/images/white.png'; // Ensure this path is correct

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log({ name, email, password });
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="signup-wrapper">
      <motion.div 
        className="signup-container"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2>Create an account</h2>
        <p>Please fill in the details below.</p>

        <form onSubmit={handleSignup}>
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
            />
            <label>Name</label>
          </div>

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

          <div className="input-container">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label>Confirm Password</label>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/login">Log in</Link></p>
        <Link to="/timeslot">Book a Time Slot</Link>
      </motion.div>

      {/* Right side where you can add your own image */}
      <motion.div 
        className="signup-image-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={Image} alt="Custom" className="custom-image" />
      </motion.div>
    </div>
  );
};

export default Signup;
