// src/Chatbot.tsx
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Gemini API
import "./css/ChatBox.css"; // Assuming you have your CSS here for styling

// Define the Message interface
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Define the gym-related keywords with a union type for keys
type GymKeywordKey =
  | "workout"
  | "nutrition"
  | "membership"
  | "equipment"
  | "training"
  | "fitness"
  | "classes"
  | "hours"
  | "weightLoss"
  | "muscleGain";

const gymKeywords: Record<GymKeywordKey, string[]> = {
  workout: ["workout", "routine", "exercise"],
  nutrition: ["nutrition", "diet", "meal"],
  membership: ["membership", "join", "sign up"],
  equipment: ["equipment", "gear", "machines"],
  training: ["personal training", "trainer", "coach"],
  fitness: ["fitness", "goals", "progress"],
  classes: ["class", "schedule", "timings"],
  hours: ["hours", "open", "close"],
  weightLoss: ["weight loss", "lose weight"],
  muscleGain: ["muscle gain", "build muscle"],
};

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "AIzaSyCmzEeL5SFS2sWia27dJc60H5fsqLWda3c";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput) return;

    // Add user's message to the chat
    const newMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMessage]);

    // Check if the message contains gym-related keywords
    const isGymRelated = Object.keys(gymKeywords).some((key) =>
      gymKeywords[key as GymKeywordKey].some((keyword) =>
        userInput.toLowerCase().includes(keyword)
      )
    );

    if (!isGymRelated) {
      // Respond with a predefined message if the question is not gym-related
      const customMessage: Message = {
        role: "assistant",
        content:
          "I'm here to help with gym-related questions. Please ask about workouts, nutrition, or anything related to fitness!",
      };
      setMessages((prev) => [...prev, customMessage]);
      setUserInput("");
      return;
    }

    setLoading(true);
    try {
      // Initialize the Google Generative AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(userInput); // Pass user input as prompt

      // Add the chatbot's response to the chat
      const botMessage: Message = {
        role: "assistant",
        content: result.response.text(), // Get the response text from the model
      };
      setMessages((prev) => [...prev, botMessage]);
      setUserInput("");
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "An error occurred while generating content.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spot-container">
      <header className="spot-header">
        <h1>Spot</h1>
        <p>Your AI Fitness Companion</p>
      </header>

      <div className="spot-chat">
        {/* Chatbox content */}
        <div className="spot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user" ? "user" : "assistant"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Spot"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
        </div>
      </div>

      <div className="spot-input">
        <input
          type="text"
          placeholder="Ask anything on fitness to Spot"
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
