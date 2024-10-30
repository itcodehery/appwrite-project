import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Login.css"; // Import your styles
import Image from "../assets/images/White.png"; // Ensure this path is correct
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { account } from "../helpers/appwrite.ts"; // Import account from Appwrite
import Cookies from "js-cookie";
import ADMINPAGE from "./AdminPage.tsx";

const AdminLogin: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
    setErrorMessage("");
    return true;
  };

  // Handle login request with admin role check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const session = await account.createEmailPasswordSession(email, password);
      const user = await account.get();

      // Check if user has "admin" role using a custom attribute
      if (user.prefs.isAdmin) {
        setLoggedInUser(user);
        Cookies.set("session", session.$id, { expires: 7 });
        Cookies.set("userId", user.$id, { expires: 7 });
      } else {
        setErrorMessage("Access denied. Admin role required.");
        await account.deleteSession(session.$id); // Log out non-admin user immediately
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Conditionally render ADMINPAGE if the user is logged in
  if (loggedInUser) {
    return <ADMINPAGE />;
  }

  return (
    <div className="login-wrapper">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Admin Login</h2>
        <p>Please enter your admin credentials.</p>

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

          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </motion.div>

      <motion.div
        className="login-image-container"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={Image} alt="Admin Login" className="custom-image" />
      </motion.div>
    </div>
  );
};

export default AdminLogin;
