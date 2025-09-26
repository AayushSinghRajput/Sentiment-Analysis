from flask import Flask, request, jsonify
from textblob import TextBlob  # Example ML library for sentiment analysis

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_sentiment():
    # Get the input text from the request JSON
    data = request.json
    text = data.get('text', '')

    # If no text is provided, return an error
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Sentiment Analysis using TextBlob
    analysis = TextBlob(text)
    
    # Determine sentiment based on the polarity score
    sentiment = "Positive" if analysis.sentiment.polarity > 0 else "Negative" if analysis.sentiment.polarity < 0 else "Neutral"

    # Return the sentiment result as JSON
    return jsonify({'sentiment': sentiment})

# Enable CORS to allow requests from different origins
from flask_cors import CORS
import os

# Enable CORS for all routes
CORS(app)

# Run the Flask app
if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
