import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { databases } from "../helpers/appwrite"; 
import "./today.css";
import { Pie } from "react-chartjs-2"; 
import { motion } from "framer-motion"; // Import Framer Motion
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const BookingList = () => {
    const [bookings, setBookings] = useState<{ start_time: string; end_time: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const today = new Date().toISOString().split('T')[0];

            try {
                const response = await databases.listDocuments(
                    "6704c99a003ba58938df",
                    "6714e5bd0032f6416f89",
                    [Query.equal('booking_date', today)]
                );

                const bookingsMap: { [key: string]: { start_time: string; end_time: string; count: number } } = {};

                response.documents.forEach(booking => {
                    const { start_time, end_time } = booking;
                    const key = `${start_time}-${end_time}`;

                    if (bookingsMap[key]) {
                        bookingsMap[key].count++;
                    } else {
                        bookingsMap[key] = { start_time, end_time, count: 1 };
                    }
                });

                setBookings(Object.values(bookingsMap));
            } catch (error) {
                setError("Error retrieving bookings: " + (error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="person">
            <h2>Bookings for Today</h2>
            <motion.div className="pie" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <Pie data={chartData} />
            </motion.div>
            <div className="personlist">
                <ul>
                    {bookings.map(({ start_time, end_time, count }, index) => (
                        <motion.li 
                            key={`${start_time}-${end_time}`}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            {index + 1}. {start_time} to {end_time}: {count} {count > 1 ? "people" : "person"} booked
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookingList;
