import React, { useState } from 'react';

const TimeSlotBooking: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const slots = ['6 AM - 7 AM', '7 AM - 8 AM', '8 AM - 9 AM', '5 PM - 6 PM'];

  const handleBooking = () => {
    console.log(`Slot Booked: ${selectedSlot}`);
  };

  return (
    <div className="time-slot-container">
      <h2>Book a Time Slot</h2>
      <div className="slot-selection">
        {slots.map((slot, index) => (
          <button
            key={index}
            className={selectedSlot === slot ? 'selected' : ''}
            onClick={() => setSelectedSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <button onClick={handleBooking} disabled={!selectedSlot}>
        Confirm Booking
      </button>
    </div>
  );
};

export default TimeSlotBooking;
