import React, { useState, useEffect, useRef } from "react"; // Import useRef and useEffect
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Gemini API
import "../css/ChatBox.css"; // Assuming you have your CSS here for styling
import { marked } from "marked";

// Define the Message interface
interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Reference to the bottom of the chat

  // API key is unchanged
  const API_KEY = "AIzaSyCmzEeL5SFS2sWia27dJc60H5fsqLWda3c";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput) return;

    // Add user's message to the chat
    const newMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMessage]);

    setLoading(true);
    try {
      // Initialize the Google Generative AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create a prompt that includes your instruction
      const prompt = `Only respond with gym-related information reply like to a gym member. User: ${userInput}`;

      const result = await model.generateContent(prompt); // Pass the new prompt to the model

      // Add the chatbot's response to the chat
      const botMessage: Message = {
        role: "assistant",
        content: result.response.text(), // Get the response text from the model
      };
      botMessage.content = await marked(botMessage.content);
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

  // Scroll to the bottom of the chat when messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <strong>{msg.role === "user" ? "\nYou" : "\n\nSpot"}:</strong>{" "}
              {msg.role === "assistant" ? (
                // Render the assistant's content as HTML with Markdown formatting
                <div
                  dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                />
              ) : (
                msg.content
              )}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll to this element */}
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
