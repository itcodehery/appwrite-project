import React from "react";
import "./HomePage.css";
import Card from "../components/Card"; // Import the Card component
import Time from "../components/Time";
import Foter from "../components/Foter";
import AppBar from "../components/AppBar";

const HomePage: React.FC = () => {
  return (
    <>
      <AppBar is_for_user={false} />

      {/* Hero Section with animated image */}
      <section className="hi">
        {/* Add content or image for your hero section here */}
      </section>

      <section className="time-slot-booking">
        <Time />
      </section>

      {/* Membership Section with Card and Timeslot */}
      <section className="membership-section">
        <Card /> {/* Add the Card component here */}
      </section>
      <section>
        <Foter /> {/* Add the Card component here */}
      </section>
    </>
  );
};

export default HomePage;
