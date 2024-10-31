import React, { useEffect } from "react";
import "./HomePage.css";
import Card from "../components/ts/Card.tsx"; // Import the Card component
import Time from "../components/ts/Time.tsx";
import Footer from "../components/ts/Footer.tsx";
import AppBar from "../components/ts/AppBar.tsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { account } from "../helpers/appwrite.ts"; // Import account from Appwrite
import Adminpic from "../assets/images/Adminrole.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const checkSession = async () => {
    // This helps if the user directly enters the url of the home page.
    // if they are not signed in, this checks that and redirects to the
    try {
      // Retrieve session from cookies
      const sessionId = Cookies.get("session");

      if (sessionId) {
        // Get the current session data from Appwrite
        const session = await account.getSession(sessionId);

        console.log("Session valid:", session);
        navigate("/userhome");
      } else {
        console.log("No active session found");
        navigate("/");
      }
    } catch (error) {
      console.error("Session retrieval failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    // Check for existing session when the component mounts
    checkSession();
  }, []);
  return (
    <>
      <AppBar is_for_user={false} />

      {/* Hero Section with animated image */}

      <div className="admin" onClick={() => navigate("/loginadmin")}>
        <img src={Adminpic} alt="hero" />
      </div>
      <section className="hi">
        <div>
          <h2 className="hi-text">
            Unlock your full potential with your fitness hub.
          </h2>
          <p className="hi-p">Join SpotFit Gyms and book Time Slots at ease.</p>
        </div>
      </section>

      <section className="time-slot-booking">
        <Time />
      </section>

      {/* Membership Section with Card and Timeslot */}
      <section className="membership-section">
        <Card /> {/* Add the Card component here */}
      </section>
      <section>
        <Footer /> {/* Add the Card component here */}
      </section>
    </>
  );
};

export default HomePage;
