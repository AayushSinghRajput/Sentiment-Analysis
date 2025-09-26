# Sentiment Analysis Web Application

This web application provides real-time sentiment analysis for text inputs. It analyzes whether the provided text has a positive, negative, or neutral sentiment.

## Features

- Simple and intuitive user interface
- Real-time sentiment analysis
- Support for both direct text input and file uploads
- Responsive design for various screen sizes

## Architecture

The application is built with a multi-tier architecture:

1. **Frontend**: HTML, CSS, and JavaScript
2. **Backend API**: Node.js with Express
3. **ML Service**: Python Flask API using TextBlob for sentiment analysis

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Machine Learning API**: Python, Flask, TextBlob
- **Communication**: RESTful API, JSON

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm (Node Package Manager)
- pip (Python Package Manager)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/AayushSinghRajput/Sentiment-Analysis.git
cd Sentiment-Analysis
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Install Python dependencies

```bash
pip install flask textblob
```

## Running the Application

### 1. Start the ML API (Python)

```bash
python ml_api.py
```
This will start the Flask server at http://localhost:8000

### 2. Start the Node.js server

```bash
npm start
```
This will start the Express server at http://localhost:5000

### 3. Open the web application

Open `index.html` in your browser or set up a local web server to serve the static files.

## Usage

1. Navigate to the "Upload" section of the application
2. Enter text in the provided textarea or upload a text file
3. Click "Analyze Sentiment"
4. View the sentiment analysis results

## API Endpoints

### Node.js Server

- `POST /api/analyze`: Accepts JSON with a `text` field and returns the sentiment analysis

### Python ML API

- `POST /predict`: Accepts JSON with a `text` field and returns the sentiment analysis result

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Author

Aayush Singh Rajput

## Acknowledgments

- TextBlob for providing the sentiment analysis functionality
- Express.js team for the robust server framework