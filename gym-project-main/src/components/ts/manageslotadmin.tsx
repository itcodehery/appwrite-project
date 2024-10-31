import React, { useEffect, useState } from 'react';
import { Query, Models } from 'appwrite';
import { databases } from "../../helpers/appwrite";
import '../css/TomorrowBookings.css'; // Import the CSS file

// Define the Booking interface
interface Booking {
    id: string;
    user_id: string;
    gym_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
}

const DATABASE_ID = '6704c99a003ba58938df';
const COLLECTION_ID = '6714e5bd0032f6416f89';

const TomorrowBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDate = tomorrow.toISOString().split('T')[0];

            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTION_ID,
                    [Query.equal('booking_date', tomorrowDate)]
                );

                const bookingsData = response.documents.map((doc: Models.Document) => ({
                    id: doc.$id,
                    user_id: doc.user_id,
                    gym_id: doc.gym_id,
                    booking_date: doc.booking_date,
                    start_time: doc.start_time,
                    end_time: doc.end_time,
                })) as Booking[];

                setBookings(bookingsData);
            } catch (err) {
                setError('Error retrieving bookings');
                console.error(err);
            }
        };

        fetchBookings();
    }, []);

    const deleteBooking = async (bookingId: string) => {
        try {
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, bookingId);
            setBookings(prev => prev.filter(booking => booking.id !== bookingId));
        } catch (err) {
            setError('Error deleting booking');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1 className="heading">Tomorrow's Bookings</h1>
            {error && <p className="error">{error}</p>}
            <ul className="bookings-list">
                {bookings.map(booking => (
                    <li key={booking.id} className="booking-item">
                        <span className="booking-text">
                            Name: {booking.user_id}, Slot: {booking.start_time} - {booking.end_time}
                        </span>
                        <button className="delete-button" onClick={() => deleteBooking(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TomorrowBookings;
