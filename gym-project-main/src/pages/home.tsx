import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "./HomePage.css";
import Card from "../components/Card"; // Import the Card component
import Time from "../components/Time";
import Foter from "../components/Foter";
import AppBar from "../components/AppBar";

const HomePage: React.FC = () => {
  return (
    <>
      {/* <header className="navbar"> */}
      {/* <div className="logo">
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
        </div> */}
      {/* <nav className="nav-links">
         
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
            <Link to="/programs">Programs</Link>
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
        </nav> */}
      {/* <motion.div
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
        </motion.div> */}
      {/* </header> */}
      <AppBar is_for_user={false} />

      {/* Hero Section with animated image */}
      <section className="hi">
        {/* Add content or image for your hero section here */}
      </section>

      <section className="time-slot-booking">
        <Time />
      </section>

      {/* Membership Section with Card and Timeslot */}
      <section className="membership-section">
        <Card /> {/* Add the Card component here */}
      </section>
      <section>
        <Foter /> {/* Add the Card component here */}
      </section>
    </>
  );
};

export default HomePage;
