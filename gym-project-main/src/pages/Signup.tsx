import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; 
import "./Signup.css"; 
import Image from "../assets/images/white.png"; 
import { account, ID } from "../helpers/appwrite"; 
import Cookies from "js-cookie"; 

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); 

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

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Create a new user with Appwrite
      await account.create(ID.unique(), email, password, name);

      // After successful signup, log the user in and create a session
      const session = await account.createEmailPasswordSession(email, password);

      // Save the user in cookies
      Cookies.set("session", session.$id, { expires: 7 });

      // Navigate to home
      navigate("/userhome");
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkSession = async () => {
    try {
      const sessionId = Cookies.get("session");

      if (sessionId) {
        // Check if session is active without specifying session ID
        const currentSession = await account.get();
        
        if (currentSession) {
          console.log("Session valid:", currentSession);
          navigate("/userhome");
        }
      } else {
        console.log("No active session found");
      }
    } catch (error) {
      console.error("Session retrieval failed:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </motion.div>

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
