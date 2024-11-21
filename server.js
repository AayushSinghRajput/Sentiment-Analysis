const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors"); // Import CORS
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json());

// API route
app.post("/api/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    // Send the text to the Python API for sentiment analysis
    const response = await axios.post("http://localhost:8000/predict", {
      text,
    });

    // Return the sentiment result to the client
    res.json({ sentiment: response.data.sentiment });
  } catch (error) {
    console.error("Error connecting to the ML API:", error.message);
    res
      .status(500)
      .json({ error: "Error analyzing sentiment. Please try again." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
