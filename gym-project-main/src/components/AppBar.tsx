import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "./css/AppBar.css"; // Import the CSS file for styling
import "../helpers/appwrite.ts"; // Import the Appwrite helpers
import { logOut } from "../helpers/appwrite.ts";

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
    // return (
    //   <header className="navbar">
    //     <div className="logo">
    //       {/* Typewriter effect for the logo */}
    //       <motion.h1
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1 }}
    //       >
    //         <Typewriter
    //           words={["SpotFit"]}
    //           loop={1}
    //           cursor
    //           cursorStyle=""
    //           typeSpeed={100}
    //           deleteSpeed={50}
    //           delaySpeed={1000}
    //         />
    //       </motion.h1>
    //     </div>
    //     <nav className="nav-links">
    //       {/* Animated navigation links */}
    //       <motion.div
    //         color="red"
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.3 }}
    //       >
    //         <Link to="/home">Home</Link>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.5 }}
    //       >
    //         <Link to="/gyms">Gyms</Link>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.7 }}
    //       >
    //         <Link to="/admindash">T: Admin</Link>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 0.9 }}
    //       >
    //         <Link to="/membership">Membership</Link>
    //       </motion.div>
    //       <motion.div
    //         initial={{ opacity: 0, y: -50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1, delay: 1.1 }}
    //       >
    //         <Link to="/userhome">T: UserHome</Link>
    //       </motion.div>
    //     </nav>
    //     <motion.div
    //       className="nav-actions"
    //       initial={{ scale: 0 }}
    //       animate={{ scale: 1 }}
    //       transition={{ duration: 0.5, delay: 1.3 }}
    //     >
    //       <Link to="/cart" className="cart-icon">
    //         <span role="img" aria-label="cart">
    //           🛒
    //         </span>
    //       </Link>
    //       <Link to="/login" className="login-btn">
    //         Log In
    //       </Link>
    //       <Link to="/signup" className="signup-btn">
    //         Sign Up
    //       </Link>
    //     </motion.div>
    //   </header>
    // );
    return (
      <header className="navbar">
        <div>
          <h1>SpotFit</h1>
        </div>
        <div className="buttons">
          <Link to="/home" className="action">
            Home
          </Link>
          <Link to="/gyms" className="action">
            Gyms
          </Link>
          <Link to="/trainers" className="action">
            Trainers
          </Link>
          <Link to="/membership" className="action">
            Membership
          </Link>
          <Link to="/userhome" className="action">
            UserHome
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
          ></motion.div>
        </nav>
        <button className="login-but" onClick={logItOut}>
          Log Out
        </button>
      </header>
    );
  }
};

export default AppBar;
