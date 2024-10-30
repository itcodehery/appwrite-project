import React, { useEffect, useState } from "react";
import { Client, Databases, Query } from "appwrite";
import { Pie } from "react-chartjs-2"; // Import the Pie component from react-chartjs-2
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6700b592001d71931ab9");

// Create a Databases instance
const databases = new Databases(client);

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const BookingList = () => {
    const [bookings, setBookings] = useState<{ start_time: string; end_time: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const today = new Date().toISOString().split('T')[0]; // e.g., '2024-10-30'

            try {
                const response = await databases.listDocuments(
                    "6704c99a003ba58938df", // Database ID
                    "6714e5bd0032f6416f89", // Collection ID
                    [Query.equal('booking_date', today)] // Query for today's bookings
                );

                // Initialize an object to count bookings by time
                const bookingsMap: { [key: string]: { start_time: string; end_time: string; count: number } } = {};

                response.documents.forEach(booking => {
                    const { start_time, end_time } = booking;
                    const key = `${start_time}-${end_time}`;

                    // Count bookings for each start and end time combination
                    if (bookingsMap[key]) {
                        bookingsMap[key].count++;
                    } else {
                        bookingsMap[key] = { start_time, end_time, count: 1 };
                    }
                });

                // Convert the bookingsMap to an array for easier rendering
                setBookings(Object.values(bookingsMap));
            } catch (error) {
                setError("Error retrieving bookings: " + (error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Prepare data for Pie Chart
    const chartData = {
        labels: bookings.map(({ start_time, end_time }) => `${start_time} - ${end_time}`),
        datasets: [
            {
                label: "Number of Bookings",
                data: bookings.map(({ count }) => count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>{error}</div>;
    }

    // Render bookings count with start and end times
    return (
        <div>
            <h2>Bookings for Today</h2>
            <div  style={{ width: '30%', height: '20%', margin: '0 auto' }}>
            <Pie data={chartData} /> {/* Render Pie Chart */}
            <ul>
                {bookings.map(({ start_time, end_time, count }) => (
                    <li key={`${start_time}-${end_time}`}>
                        {start_time} to {end_time}: {count} {count > 1 ? "people" : "person"} booked
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default BookingList;
