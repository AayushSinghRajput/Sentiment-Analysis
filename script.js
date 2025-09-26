// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: "smooth",
    });
  }
}

// Character count for textarea
document.getElementById("userText").addEventListener("input", function() {
  const charCount = this.value.length;
  document.getElementById("charCount").textContent = `${charCount} characters`;
});

// Clear text button
document.getElementById("clearText").addEventListener("click", function() {
  document.getElementById("userText").value = "";
  document.getElementById("charCount").textContent = "0 characters";
});

// File upload handling
document.getElementById("fileUpload").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    document.getElementById("fileName").textContent = file.name;
    
    // Read file content
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("userText").value = e.target.result;
      document.getElementById("charCount").textContent = 
        `${e.target.result.length} characters`;
    };
    reader.readAsText(file);
  } else {
    document.getElementById("fileName").textContent = "No file selected";
  }
});

// Form submission and sentiment analysis
document
  .getElementById("sentimentForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const userText = document.getElementById("userText").value;

    if (!userText.trim()) {
      alert("Please enter some text or upload a file.");
      return;
    }

    try {
      // Show loading indicator
      document.getElementById("loadingIndicator").style.display = "flex";
      document.getElementById("sentimentResult").style.display = "none";
      document.getElementById("sentimentDetails").style.display = "none";
      
      // Scroll to results section
      scrollToSection("results");

      const response = await fetch(`${CONFIG.BACKEND_API_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userText }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment");
      }

      const result = await response.json();
      
      // Hide loading indicator
      document.getElementById("loadingIndicator").style.display = "none";
      document.getElementById("sentimentResult").style.display = "block";
      
      const resultElement = document.getElementById("sentimentResult");
      
      // Remove any existing sentiment classes
      resultElement.classList.remove("positive", "negative", "neutral");
      
      // Determine sentiment and score position (sample calculation)
      let scorePosition = 50; // Default to neutral (50%)
      let sentimentClass = "neutral";
      let sentimentIcon = "😐"; // Neutral face emoji
      
      if (result.sentiment === "Positive") {
        sentimentClass = "positive";
        scorePosition = 85; // 85% to the right
        sentimentIcon = "😄"; // Happy face emoji
      } else if (result.sentiment === "Negative") {
        sentimentClass = "negative";
        scorePosition = 15; // 15% to the right (left side)
        sentimentIcon = "😔"; // Sad face emoji
      }
      
      // Add the appropriate class based on sentiment
      resultElement.classList.add(sentimentClass);
      resultElement.innerHTML = `<i class="fas fa-check-circle"></i> ${sentimentIcon} ${result.sentiment} Sentiment Detected`;
      
      // Animate the result
      resultElement.style.animation = 'none';
      resultElement.offsetHeight; // Trigger reflow
      resultElement.style.animation = 'fadeIn 0.5s ease';
      
      // Update and show sentiment details
      document.getElementById("sentimentDetails").style.display = "block";
      document.getElementById("scoreIndicator").style.left = `${scorePosition}%`;
      
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("loadingIndicator").style.display = "none";
      document.getElementById("sentimentResult").style.display = "block";
      
      const resultElement = document.getElementById("sentimentResult");
      resultElement.classList.remove("positive", "negative", "neutral");
      resultElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Error: Could not analyze sentiment`;
      resultElement.style.color = "#f44336";
    }
  });
