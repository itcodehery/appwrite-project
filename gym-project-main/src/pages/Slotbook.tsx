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

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal("user_id", userId), // Query to check if userId exists
                ]);

                if (response.total > 0) {
                    // If userId exists, set booking data and book date
                    setBookingData(response.documents[0]);
                    setBookDate(response.documents[0].booking_date);
                    setSlotTime(response.documents[0].slot_time);
                } else {
                    // If userId doesn't exist, create a new entry
                    await createBooking();
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    const createBooking = async () => {
        const data = { 
            user_id: userId as string, 
            gym_id: "your_gym_id", // replace with actual gym ID if available
            slot_time: slotTime, // replace slot_id with slot_time
            booking_date: bookDate 
        };

        try {
            const newBooking = await databases.createDocument(databaseId, collectionId, ID.unique(), data, [
                Permission.read(Role.user(userId as string)), // Use userId safely
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
            return; // Prevent booking if userId is undefined
        }

        if (!validateBookingDate(bookDate)) {
            alert("Bookings are allowed only for the next two days.");
            return;
        }

        const data = { 
            user_id: userId as string, 
            gym_id: "your_gym_id", // replace with actual gym ID if available
            slot_time: slotTime, // replace slot_id with slot_time
            booking_date: bookDate 
        };

        try {
            if (bookingData) {
                // Update existing booking
                const updatedBooking = await databases.updateDocument(databaseId, collectionId, bookingData.$id, data);
                setBookingData(updatedBooking); // Update displayed data after edit
                alert("Booking updated successfully!");
            } else {
                // Create new booking if bookingData is not set
                await createBooking();
            }
        } catch (error) {
            console.error("Booking failed:", error);
        }
    };

    const validateBookingDate = (date: string) => {
        const today = new Date();
        const bookingDate = new Date(date);
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(today.getDate() + 2);

        return bookingDate >= today && bookingDate <= twoDaysFromNow;
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
        </div>
    );
};

export default BookingPage;
