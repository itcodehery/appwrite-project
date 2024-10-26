import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Client, Account, Databases, ID, Permission, Role, Query } from 'appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6700b592001d71931ab9");

client.headers["X-Appwrite-Key"] = "standard_60d8a20948776a704fad854478d5b0a62caf085adab5c511a3eb38ba0f5a7dd6f2e96bec1d6fce072bc755631927fcfa2666432749132841137d81e971c8423932ef65a55005f3f6e603faac50edda40566141a5516c35a33c633ea701f30564b75f48c9afe8aaaee46f6970a9f890c75051d7798f54538d070319e36aea9c0c";

const account = new Account(client);
const databases = new Databases(client);
const databaseId = "671d0563002639d0fd79"; // Your database ID
const collectionId = "YOUR_COLLECTION_ID"; // Your collection ID

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
    const userId = Cookies.get('userId'); // Directly retrieve userId from cookies 
    const [bookingData, setBookingData] = useState<any>(null);
    const [bookDate, setBookDate] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            // Check if userId is defined
            const userId = Cookies.get("userId");
           

           
            
            if (!userId) return;
            

            try {
                const response = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal("userId", userId), // Use userId only if it's defined
                ]);

                if (response.total > 0) {
                    setBookingData(response.documents[0]);
                    setBookDate(response.documents[0].bookdate);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleBooking = async () => {
        if (!userId) {
            alert("User not logged in.");
            return; // Prevent booking if userId is undefined
        }

        if (!validateBookingDate(bookDate)) {
            alert("Bookings are allowed only for the next two days.");
            return;
        }

        const data = { userId, time: new Date().toISOString(), bookdate: bookDate };

        try {
            if (bookingData) {
                await databases.updateDocument(databaseId, collectionId, bookingData.$id, data);
                alert("Booking updated successfully!");
            } else {
                await databases.createDocument(databaseId, collectionId, ID.unique(), data, [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ]);
                alert("Booking created successfully!");
            }
            setBookingData(data);
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
            <button onClick={handleBooking}>
                {bookingData ? "Update Booking" : "Create Booking"}
            </button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default BookingPage;
