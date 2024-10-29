import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Client, Account, Databases, ID, Permission, Role, Query } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("6700b592001d71931ab9"); // Your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);
const databaseId = "6704c99a003ba58938df"; // Your database ID
const collectionId = "6714e5bd0032f6416f89"; // Your collection ID

const logOut = async () => {
    try {
        await account.deleteSession('current');
        Cookies.remove('userId'); // Remove userId cookie on logout
        console.log("Logged out");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

const BookingPage = () => {
    const userId = Cookies.get("userId"); // Retrieve userId from cookies
    const [bookingData, setBookingData] = useState<any>(null);
    const [bookDate, setBookDate] = useState<string>("");
    const [slotTime, setSlotTime] = useState<string>("");
    const [tomorrowSlots, setTomorrowSlots] = useState<string[]>([]); // State for tomorrow's slot times

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                // Fetch all bookings for tomorrow's date
                const tomorrow = getTomorrowDate();
                const response = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal("booking_date", tomorrow),
                ]);

                // Extract slot times for tomorrow's bookings
                const slots = response.documents.map((booking) => booking.slot_time);
                setTomorrowSlots(slots);

                // Fetch current user's booking if it exists
                const userResponse = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal("user_id", userId),
                ]);

                if (userResponse.total > 0) {
                    setBookingData(userResponse.documents[0]);
                    setBookDate(userResponse.documents[0].booking_date);
                    setSlotTime(userResponse.documents[0].slot_time);
                } else {
                    await createBooking();
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    };

    const createBooking = async () => {
        const data = { 
            user_id: userId as string, 
            gym_id: "your_gym_id", // replace with actual gym ID if available
            slot_time: slotTime, 
            booking_date: bookDate 
        };

        try {
            const newBooking = await databases.createDocument(databaseId, collectionId, ID.unique(), data, [
                Permission.read(Role.user(userId as string)),
                Permission.update(Role.user(userId as string)),
                Permission.delete(Role.user(userId as string)),
            ]);
            setBookingData(newBooking); // Set the created booking data to display
            alert("Booking created successfully!");
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    const handleBooking = async () => {
        if (!userId) {
            alert("User not logged in.");
            return;
        }

        if (!validateBookingDate(bookDate)) {
            alert("Bookings are allowed only for tomorrow.");
            return;
        }

        const data = { 
            user_id: userId as string, 
            gym_id: "your_gym_id", 
            slot_time: slotTime, 
            booking_date: bookDate 
        };

        try {
            if (bookingData) {
                // Update existing booking
                const updatedBooking = await databases.updateDocument(databaseId, collectionId, bookingData.$id, data);
                setBookingData(updatedBooking); // Update displayed data after edit
                alert("Booking updated successfully!");
            } else {
                await createBooking();
            }
        } catch (error) {
            console.error("Booking failed:", error);
        }
    };

    const validateBookingDate = (date: string) => {
        const tomorrow = getTomorrowDate();
        return date === tomorrow;
    };

    return (
        <div>
            <h2>Booking</h2>
            <input
                type="date"
                value={bookDate}
                onChange={(e) => setBookDate(e.target.value)}
            />
            <input
                type="time"
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
            />
            <button onClick={handleBooking}>
                {bookingData ? "Update Booking" : "Create Booking"}
            </button>
            <button onClick={logOut}>Log Out</button>
            
            {bookingData && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Your Booking Details:</h3>
                    <p><strong>Gym ID:</strong> {bookingData.gym_id}</p>
                    <p><strong>Slot Time:</strong> {bookingData.slot_time}</p>
                    <p><strong>Booking Date:</strong> {bookingData.booking_date}</p>
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                <h3>Available Timeslots for Tomorrow:</h3>
                {tomorrowSlots.length > 0 ? (
                    <ul>
                        {tomorrowSlots.map((time, index) => (
                            <li key={index}>
                                <p><strong>Slot Time:</strong> {time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings for tomorrow yet.</p>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
