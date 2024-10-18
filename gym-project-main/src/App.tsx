import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/Signup";
import TimeSlotBooking from "./components/ts/TimeSlotBooking";
import HomePage from "./pages/home";
import UserHomePage from "./pages/UserHomePage";
import Admindash from "./pages/admindash";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeslot" element={<TimeSlotBooking />} />
        <Route path="/admindash" element={<Admindash />} />
      </Routes>
    </Router>
  );
};

export default App;
