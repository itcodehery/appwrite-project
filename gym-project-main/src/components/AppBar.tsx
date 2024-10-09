import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Import the components
const AppBar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        {/* Typewriter effect for the logo */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            words={["SpotFit"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </motion.h1>
      </div>
      <nav className="nav-links">
        {/* Animated navigation links */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Link to="/home">Home</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link to="/gyms">Gyms</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <Link to="/trainers">Trainers</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Link to="/membership">Membership</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link to="/userhome">T: UserHome</Link>
        </motion.div>
      </nav>
      <motion.div
        className="nav-actions"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <Link to="/cart" className="cart-icon">
          <span role="img" aria-label="cart">
            🛒
          </span>
        </Link>
        <Link to="/login" className="login-btn">
          Log In
        </Link>
        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      </motion.div>
    </header>
  );
};

export default AppBar;
