import React, { useState } from "react";
import "./css/TimeSlotBooking.css"; // Import custom CSS

const TimeSlotBooking: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  // Generate time slots from 6 AM to 10 PM
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 6; hour <= 22; hour++) {
      const start = hour % 24;
      const end = (hour + 1) % 24;
      const startAmPm = start < 12 ? "AM" : "PM";
      const endAmPm = end < 12 ? "AM" : "PM";
      const startHour = start === 0 ? 12 : start % 12;
      const endHour = end === 0 ? 12 : end % 12;
      slots.push(`${startHour} ${startAmPm} - ${endHour} ${endAmPm}`);
    }
    return slots;
  };

  const slots = generateTimeSlots();

  const handleBooking = () => {
    if (!selectedSlot || bookedSlots.includes(selectedSlot)) {
      return;
    }
    setBookedSlots((prev) => [...prev, selectedSlot]);
    setConfirmationMessage(`Slot Booked: ${selectedSlot}`);
    setSelectedSlot("");
    setShowModal(true); // Show confirmation modal
  };

  const handleReset = () => {
    setConfirmationMessage("");
    setSelectedSlot("");
    setShowModal(false); // Close the modal
  };

  return (
    <div className="time-slot-container">
      <h2>Book a Time Slot</h2>
      <div className="slot-selection">
        {slots.map((slot, index) => (
          <button
            key={index}
            className={`slot-button ${
              selectedSlot === slot ? "selected" : ""
            } ${bookedSlots.includes(slot) ? "booked" : ""}`}
            onClick={() => !bookedSlots.includes(slot) && setSelectedSlot(slot)}
            disabled={bookedSlots.includes(slot)} // Disable if already booked
          >
            {slot}
          </button>
        ))}
      </div>
      <button
        className="confirm-button"
        onClick={handleBooking}
        disabled={!selectedSlot}
      >
        Confirm Booking
      </button>
      <button
        className="reset-button"
        onClick={handleReset}
        disabled={!confirmationMessage}
      >
        Reset Booking
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>{confirmationMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <h3>Booked Slots</h3>
      <ul>
        {bookedSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlotBooking;
