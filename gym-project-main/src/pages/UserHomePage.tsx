import React, { useEffect } from "react";
import "./UserHomePage.css";
import AppBar from "../components/AppBar";
import ActionCard from "../components/ActionCard";
import ChatBox from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { account } from "../helpers/appwrite.ts"; // Import account from Appwrite
import { Client, Databases, Query } from "appwrite";

const UserHomePage: React.FC = () => {
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
    <div className="user-home-wrapper">
      <AppBar is_for_user={true} />
      <div className="user-home-row">
        <div className="left-content">
          <div className="your-gym">
            <div className="column">
              <div className="column">
                <p>Your Gym</p>
                <h2>Ripped 2.0</h2>
                <p>Open from 06:00 to 08:00</p>
              </div>
              <div className="row-spread">
                <div></div>
                <div className="row">
                  <button className="main-but-sec">Contact Gym</button>
                  <button className="main-but-pri">Check for Slots</button>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            <ActionCard
              action={{
                title: "Find Gyms in your Area",
                subtitle: "Search",
                onPressed: () => console.log("Find Gyms function"),
              }}
            />
            <ActionCard
              action={{
                title: "Book a Personalized Trainer",
                subtitle: "Online Mentor",
                onPressed: () => console.log("Book Trainer function"),
              }}
            />
          </div>
        </div>
        <div className="chat-wrapper">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
