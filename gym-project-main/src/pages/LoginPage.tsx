import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Login.css"; // Import your styles
import Image from "..//assets/images/White.png"; // Ensure this path is correct
import { Models } from "appwrite"; // Ensure this import is correct
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { account } from "../helpers/appwrite.ts"; // Import account from Appwrite
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const [loggedInUser, setLoggedInUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  // Basic form validation
  const validateForm = () => {
    if (!email.includes("@")) {
      setErrorMessage("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    }
    setErrorMessage(""); // Clear any previous errors
    return true;
  };

  // Handle login request
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate the form before proceeding

    try {
      setIsSubmitting(true); // Indicate form submission
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      Cookies.set("session", session.$id, { expires: 7 }); // Save session in cookies
      Cookies.set("userId", user.$id, { expires: 7 });

      navigate("/userhome"); // Navigate to HomePage on successful login
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false); // Reset form submission state
    }
  };

  const checkSession = async () => {
    try {
      // Retrieve session from cookies
      const sessionId = Cookies.get("session");

      if (sessionId) {
        // Get the current session data from Appwrite
        const session = await account.getSession(sessionId);

        console.log("Session valid:", session);
        // Navigate to home
        navigate("/userhome");
      } else {
        console.log("No active session found");
      }
    } catch (error) {
      console.error("Session retrieval failed:", error);
    }
  };

  useEffect(() => {
    // Check for existing session when the component mounts
    checkSession();
  }, []);

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

        {/* Error message display */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
              <Link to="/fogotpas">
                <a>Forgot password?</a>
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? "Logging in..." : "Log In"}{" "}
            {/* Indicate loading state */}
          </button>
        </form>
        <div className="i">
          <p>
            Don't have an account?
            <Link to="/Signup"> Sign up for free </Link>
          </p>
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
