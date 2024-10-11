import "./ChatBox.css"; // Assuming you have your CSS here for styling

const ChatBox = () => {
  return (
    <div className="spot-container">
      <header className="spot-header">
        <h1>Spot</h1>
        <p>Your AI Fitness Companion</p>
      </header>

      <div className="spot-chat">
        <div className="user-query">
          <p>How do I improve my Calves?</p>
        </div>

        <div className="spot-response">
          <h2>How to Improve Your Calves</h2>
          <p>
            Calf exercises are essential for strengthening and toning your lower
            legs. Here are some effective exercises to incorporate into your
            workout routine:
          </p>

          <h3>Calf Raises</h3>
          <ul>
            <li>
              <strong>Standing Calf Raises:</strong>
              <ul>
                <li>Stand with your feet shoulder-width apart.</li>
                <li>
                  Raise your heels as high as you can, then lower them back
                  down.
                </li>
                <li>For added resistance, hold weights in your hands.</li>
              </ul>
            </li>
            <li>
              <strong>Donkey Calf Raises:</strong>
              <ul>
                <li>
                  Get on all fours, with your knees directly under your hips and
                  your hands under your shoulders.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="spot-input">
        <input type="text" placeholder="Ask anything on fitness to Spot" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
