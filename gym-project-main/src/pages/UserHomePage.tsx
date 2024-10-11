import React, { useState, useEffect } from "react";
import "./UserHomePage.css";
import AppBar from "../components/AppBar";
import ActionCard from "../components/ActionCard";
import ChatBox from "../components/ChatBox";

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

const UserHomePage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Fetch time slots from an API or database
    const fetchTimeSlots = async () => {
      // Replace with your actual API call
      const response = await fetch("/api/timeslots");
      const data = await response.json();
      setTimeSlots(data);
    };

    fetchTimeSlots();
  }, []);

  return (
    <div className="user-home-wrapper">
      <AppBar is_for_user={true} />
      {/* <h1>User Dashboard</h1>
      <h2>Available Gym Time Slots</h2>
      <ul>
        {timeSlots.map((slot) => (
          <li key={slot.id}>
            {slot.time} - {slot.available ? "Available" : "Booked"}
          </li>
        ))}
      </ul> */}
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
