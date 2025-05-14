// One piece of user prompt (simplest interaction)
async function sendRequest() {
  const resultElement = document.getElementById("result1");
  resultElement.textContent = "Loading...";

  try {
    const prompt = document.getElementById("promptInput").value;
    if (!prompt) {
      resultElement.textContent = "Please enter a prompt";
      return;
    }

    const apiKey = document.getElementById("apiKeyInput").value;
    if (!apiKey) {
      resultElement.textContent = "Please enter your api key";
      return;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      resultElement.textContent = data.choices[0].message.content;
    } else {
      resultElement.textContent = `Error: ${
        data.error ? data.error.message : "Unknown error"
      }`;
    }
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
    console.error("Request error:", error);
  }
}

async function sendRequestDeveloper() {
  const resultElement = document.getElementById("result2");
  resultElement.textContent = "Loading...";

  try {
    const userPrompt = document.getElementById("promptInputUser").value;
    if (!userPrompt) {
      resultElement.textContent = "Please enter a message";
      return;
    }

    const developerPrompt = document
      .getElementById("fixedDeveloperPrompt")
      .textContent.trim();

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: developerPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      resultElement.textContent = data.choices[0].message.content;
    } else {
      resultElement.textContent = `Error: ${
        data.error ? data.error.message : "Unknown error"
      }`;
    }
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
    console.error("Request error:", error);
  }
}

async function sendRequestHistory() {
  const resultElement = document.getElementById("result3");
  resultElement.textContent = "Loading...";

  try {
    const prompt = document.getElementById("promptInputHistory").value;
    if (!prompt) {
      resultElement.textContent = "Please enter a prompt";
      return;
    }

    const apiKey = document.getElementById("apiKeyInput").value;
    if (!apiKey) {
      resultElement.textContent = "Please enter your api key";
      return;
    }

    messages = [
      {
        role: "developer",
        content:
          "Given a number of years from the current year (2025) and a style or culture, generate a concise, vivid visual description of how a real-world scene would appear in that culture and time. For future years, if within 30 years, make subtle, realistic changes (e.g., electric infrastructure, wearable tech, environmental shifts). If the number is large (100 or more), be imaginative or speculative, incorporate advanced materials, futuristic design, utopian or dystopian futures, and unexpected fusions of culture and technology. For past years, ground the description in historical reality or the best-known representations of that era. Output only a single, highly visual descriptive phrase (no title, no full sentences). Include specific visual phrases that describe architecture, people’s appearance, lighting, atmosphere, vehicles, technology, foliage, objects, and materials. Always add “trending on ArtStation, Unreal Engine 5, 8k, cinematic lighting, hyperrealistic” to the end of all outputs. Keep the output to no more than 4 lines total.",
      },
      {
        role: "user",
        content: "Do you know who is Marcelo Coelho?",
      },
      {
        role: "assistant",
        content:
          "Good sir or fair lady, prithee, I am but a humble wraith of knowledge, and the name Marcelo Coelho doth not ring a bell in the grand annals of my understanding.",
      },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      resultElement.textContent = data.choices[0].message.content;
    } else {
      resultElement.textContent = `Error: ${
        data.error ? data.error.message : "Unknown error"
      }`;
    }
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
    console.error("Request error:", error);
  }
}
