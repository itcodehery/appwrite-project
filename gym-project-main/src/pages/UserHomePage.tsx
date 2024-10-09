import React, { useState, useEffect } from "react";
import "./UserHomePage.css";

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
      <h1>User Dashboard</h1>
      <h2>Available Gym Time Slots</h2>
      <ul>
        {timeSlots.map((slot) => (
          <li key={slot.id}>
            {slot.time} - {slot.available ? "Available" : "Booked"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHomePage;
