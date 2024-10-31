import React, { useEffect, useState } from 'react';
import {  Query, Models } from 'appwrite';
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite


// Define the Booking interface
interface Booking {
    id: string;
    user_id: string;
    gym_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
}

// Appwrite client initialization


const DATABASE_ID = '6704c99a003ba58938df'; // Replace with your actual database ID
const COLLECTION_ID = '6714e5bd0032f6416f89'; // Collection ID provided

const TomorrowBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDate = tomorrow.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTION_ID,
                    [Query.equal('booking_date', tomorrowDate)]
                );

                // Map the response to Booking type
                const bookingsData = response.documents.map((doc: Models.Document) => ({
                    id: doc.$id, // Appwrite Document ID
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
        <div>
            <h1>Tomorrow's Bookings</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id}>
                        <span>Name: {booking.user_id}, Slot: {booking.start_time} - {booking.end_time}</span>
                        <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TomorrowBookings;
