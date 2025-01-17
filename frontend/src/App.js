import React, { useState } from "react";
import axios from "axios";
import "./App.css"

const App = () => {

  const appStyle = {
    color : "ffffff",
    minHeight : "100vh",
    margin : "0px",
    padding : "20px",
  };

  const respStyle = {
    borderTop : "2px solid black",
  }

  const spinnerStyle = {
    width: "30px",
    height: "30px",
    border: "4px solid #ddd",
    borderTop: "4px solid #106eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  // Adding keyframes for spinner animation in inline style
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `@keyframes spin { 
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`,
    styleSheet.cssRules.length
  );

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the spinner
    setResponse(""); // Clears the prev. response
    try {
      const { data } = await axios.post("http://localhost:3000/api/generate", {
        prompt,
      });

      // Organize the response by splitting it into lines or sections
        const organizedResponse = data.response.split("\n").map((line, index) => (
            <p key={index}>{line.trim()}</p>
        ));

      setResponse(organizedResponse);
    } catch (error) {
      console.error("Error generating response", error);
      setResponse("Error Generating Content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={appStyle}>
        <h1>Welcome User!</h1>
        <h2>Gemini Clone</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="5"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        <div>
          <h2>Response:</h2>
          {loading ? (
            <div className="spinner" style={spinnerStyle}></div>
          ) : (
            <p style={respStyle}>{response}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
