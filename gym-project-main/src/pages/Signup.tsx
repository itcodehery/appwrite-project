import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Signup.css"; // Import your styles
import Image from "../assets/images/white.png"; // Ensure this path is correct
import { account, ID } from "../helpers/appwrite"; // Import Appwrite account and ID

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.length < 6 || !email.includes("@")) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsSubmitting(true); // Indicate submission
    setErrorMessage(""); // Clear previous errors

    try {
      // Create a new user with Appwrite
      await account.create(ID.unique(), email, password, name);

      // After successful signup, log the user in and navigate to HomePage
      await account.createEmailPasswordSession(email, password);
      navigate("/userhome");
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.");
      console.error(error); // Log the error for debugging
    } finally {
      setIsSubmitting(false); // Reset submitting state
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

        {/* Display error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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

          <button
            type="submit"
            className="signup-btn"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
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
