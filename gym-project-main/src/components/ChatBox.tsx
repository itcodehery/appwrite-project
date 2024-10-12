import React, { useState } from "react";
import "./ChatBox.css"; // Assuming you have your CSS here for styling

const ChatBox = () => {
  // State to handle user input and AI response
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {
    // Placeholder for sending the message to an AI service or function
    if (query.trim() !== "") {
      // Example of handling the query dynamically and getting a response
      const mockResponse = `You asked: "${query}". Here is how to improve your calves...`; // You can replace this with actual API call logic
      setResponse(mockResponse);

      // Clear the input field after sending the message
      setQuery("");
    }
  };

  return (
    <div className="spot-container">
      <header className="spot-header">
        <h1>Spot</h1>
        <p>Your AI Fitness Companion</p>
      </header>

      <div className="spot-chat">
        {/* User's query */}
        <div className="user-query">
          <p>{query ? `You asked: ${query}` : "Ask anything on fitness!"}</p>
        </div>

        {/* AI's response */}
        <div className="spot-response">
          <p>{response}</p>
        </div>
      </div>

      <div className="spot-input">
        {/* Input for user query */}
        <input
          type="text"
          placeholder="Ask anything on fitness to Spot"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Button to send the query */}
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
