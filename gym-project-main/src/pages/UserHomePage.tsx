import React, { useEffect, useState } from "react";
import "./UserHomePage.css";
import AppBar from "../components/AppBar";
import ActionCard from "../components/ActionCard";
import ChatBox from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { account, databases } from "../helpers/appwrite.ts"; // Import account from Appwrite
import { GymInfo } from "../helpers/GymInfo.ts";
// import { Client, Databases, Query } from "appwrite";

const UserHomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [gyminfo, setInfo] = useState(
    new GymInfo("", "", "", "", "", "", false, "")
  );

  const fetchGymInfo = async () => {
    try {
      const response = await databases.listDocuments(
        "6704c99a003ba58938df",
        "67125e450014869460e4"
      );
      console.log(response.documents);
      // alert("Gym info fetched");
      setInfo(GymInfo.from_json(response.documents[0]));
    } catch (error) {
      console.error("Error fetching gym info:", error);
      alert("Error fetching gym info: ");
    }
  };

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

  function handleContactGym() {
    navigator.clipboard.writeText(gyminfo.manager_email);
    alert("Email copied to clipboard");
    // open email client
    window.open(`mailto:${gyminfo.manager_email}`);
  }

  useEffect(() => {
    // Check for existing session when the component mounts
    checkSession().then(() => {
      fetchGymInfo();
    });
  }, []);

  return (
    <div className="user-home-wrapper">
      <AppBar is_for_user={true} />
      <div className="user-home-row">
        <div className="left-content">
          <div className="your-gym">
            <div className="column">
              <div className="column-int">
                <p>Your Gym</p>
                <h2>{gyminfo.gym_name}</h2>
                <div className="row">
                  <div className="chip">
                    {gyminfo.is_open ? "Open" : "Closed"}
                  </div>
                  <p>
                    from {gyminfo.open_time} to {gyminfo.close_time}
                  </p>
                </div>
              </div>
              <div className="row-spread">
                <div></div>
                <div className="row">
                  <button className="main-but-sec" onClick={handleContactGym}>
                    Contact Gym
                  </button>
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
