const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

// Load environment variables based on NODE_ENV
require("dotenv").config({
  path: process.env.NODE_ENV === "production" 
    ? path.resolve(__dirname, ".env.production")
    : path.resolve(__dirname, ".env")
});

const app = express();
const PORT = process.env.PORT || 5001;



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
    const response = await axios.post(`${process.env.ML_API_URL}/predict`, {
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
