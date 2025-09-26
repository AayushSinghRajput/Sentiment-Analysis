
// Environment-based configuration for the Sentiment Analysis application
const CONFIG = {
  // Determine if we're running in a development environment or production
  get isDevEnvironment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
  },

  // API URL will change depending on environment
  get BACKEND_API_URL() {
    if (this.isDevEnvironment) {
      return 'http://localhost:5001'; // Local Node.js server URL
    } else {
      return 'https://your-deployed-nodejs-api.onrender.com'; // Replace with your deployed Node.js API URL
    }
  }
};

// Log the current environment and API URL for debugging
console.log(`Running in ${CONFIG.isDevEnvironment ? 'development' : 'production'} mode`);
console.log(`Using API URL: ${CONFIG.BACKEND_API_URL}`);
