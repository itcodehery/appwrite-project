import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TimeSlotBooking from "./components/TimeSlotBooking";
import HomePage from "./pages/home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeslot" element={<TimeSlotBooking />} />
      </Routes>
    </Router>
  );
};

export default App;
