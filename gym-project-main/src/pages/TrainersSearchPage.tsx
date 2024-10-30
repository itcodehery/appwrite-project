import React, { useState, useEffect } from "react";
import "./TrainersSearchPage.css";
import AppBar from "../components/ts/AppBar";
import { Databases, Client } from "appwrite";
import { LucideArrowRightCircle } from "lucide-react";
const TrainersSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("6700b592001d71931ab9"); // Replace with your project ID
  // Initialize Database
  const database = new Databases(client);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const [trainers, setTrainers] = useState<any[]>([]); // State to store fetched trainers
  const [isLoading, setIsLoading] = useState(false);
  // Function to fetch all trainers from the database
  const fetchTrainers = async () => {
    setIsLoading(true);
    try {
      const response = await database.listDocuments(
        "6704c99a003ba58938df",
        "6721ae03002c0583966b"
      ); // Replace with your collection ID
      setTrainers(response.documents);
    } catch (error) {
      console.error("Error fetching trainers:", error);
      alert("Failed to fetch trainers");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppBar is_for_user={true} />

      <div className="main-trainers">
        <div
          style={{
            // margin top
            marginTop: "50px",
          }}
        />
        <div className="trainers-banner">
          <h1>All Trainers</h1>
          <p>Select a trainer to know more</p>
        </div>
        <li className="list-item-trainers-container">
          <span>Name</span>

          <span>Experience</span>
          <span>Rate</span>
          <span>Details</span>
        </li>
        {trainers.map((trainer) => (
          <li key={trainer.$id} className="list-item-trainers">
            <span>{trainer.name}</span>

            <span>{trainer.experience}</span>
            <span>{"$" + trainer.rate}</span>
            <LucideArrowRightCircle />
          </li>
        ))}
      </div>
    </div>
  );
};

export default TrainersSearchPage;