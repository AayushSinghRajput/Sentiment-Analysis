document
  .getElementById("sentimentForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const userText = document.getElementById("userText").value;

    if (!userText.trim()) {
      alert("Please enter some text.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
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
      document.getElementById(
        "sentimentResult"
      ).innerText = `Sentiment: ${result.sentiment}`;
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while analyzing the sentiment.");
    }
  });
