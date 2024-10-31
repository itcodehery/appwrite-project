import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "../css/AppBar.css"; // Import the CSS file for styling
import "../../helpers/appwrite.ts"; // Import the Appwrite helpers
import { logOut } from "../../helpers/appwrite.ts";

interface AppBarType {
  is_for_user: boolean;
}

// Import the components
const AppBar = ({ is_for_user }: AppBarType) => {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const logItOut = async () => {
    logOut().then(() => {
      console.log("Logged out");
      navigate("/");
    });
  };
  if (!is_for_user) {
    return (
      <header className="navbar">
        <div>
          <h1>SpotFit</h1>
        </div>
        <div className="buttons">
          <Link to="/" className="action">
            Home
          </Link>
          <Link to="/trainers" className="action">
            Trainers
          </Link>
        </div>
        <div className="action-row">
          <Link to="/login" className="login-but">
            Log In
          </Link>
          <Link to="/signup" className="signup-but">
            Sign Up
          </Link>
        </div>
      </header>
    );
  } else {
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
        <div className="buttons">
          <Link to="/" className="action">
            Home
          </Link>
          <Link to="/trainers" className="action">
            Trainers
          </Link>
        </div>
        <button className="login-but" onClick={logItOut}>
          Log Out
        </button>
      </header>
    );
  }
};

export default AppBar;
