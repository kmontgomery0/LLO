// One piece of user prompt (simplest interaction)
async function sendRequest() {
	const resultElement = document.getElementById('result1');
	resultElement.textContent = "Loading...";

	try {
		const prompt = document.getElementById('promptInput').value;
		if (!prompt) {
			resultElement.textContent = "Please enter a prompt";
			return;
		}
		
		const apiKey = document.getElementById('apiKeyInput').value;
		if (!apiKey) {
			resultElement.textContent = "Please enter your api key";
			return;
		}
		
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "user",
						content: prompt
					}
				]
			})
		});
		
		const data = await response.json();
		if (response.ok) {
			resultElement.textContent = data.choices[0].message.content;
		} else {
			resultElement.textContent = `Error: ${data.error ? data.error.message : 'Unknown error'}`;
		}
	} catch (error) {
		resultElement.textContent = `Error: ${error.message}`;
		console.error("Request error:", error);
	}
}

async function sendRequestDeveloper() {
	const resultElement = document.getElementById('result2');
	resultElement.textContent = "Loading...";

	try {
		const userPrompt = document.getElementById('promptInputUser').value;
		if (!userPrompt) {
			resultElement.textContent = "Please enter a user prompt";
			return;
		}
		const developerPrompt = document.getElementById('promptInputDeveloper').value;
		if (!developerPrompt) {
			resultElement.textContent = "Please enter a developer prompt";
			return;
		}
		
		const apiKey = document.getElementById('apiKeyInput').value;
		if (!apiKey) {
			resultElement.textContent = "Please enter your api key";
			return;
		}
		
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "developer",
						content: developerPrompt
					},
					{
						role: "user",
						content: userPrompt
					}
				]
			})
		});
		
		const data = await response.json();
		if (response.ok) {
			resultElement.textContent = data.choices[0].message.content;
		} else {
			resultElement.textContent = `Error: ${data.error ? data.error.message : 'Unknown error'}`;
		}
	} catch (error) {
		resultElement.textContent = `Error: ${error.message}`;
		console.error("Request error:", error);
	}
}

async function sendRequestHistory() {
	const resultElement = document.getElementById('result3');
	resultElement.textContent = "Loading...";

	try {
		const prompt = document.getElementById('promptInputHistory').value;
		if (!prompt) {
			resultElement.textContent = "Please enter a prompt";
			return;
		}
		
		const apiKey = document.getElementById('apiKeyInput').value;
		if (!apiKey) {
			resultElement.textContent = "Please enter your api key";
			return;
		}

		messages = [
			{
				role: "developer",
				content: "Talk like characters from Shakespeare's writing"
			},
			{
				role: "user",
				content: "Do you know who is Marcelo Coelho?"
			},
			{
				role: "assistant",
				content: "Good sir or fair lady, prithee, I am but a humble wraith of knowledge, and the name Marcelo Coelho doth not ring a bell in the grand annals of my understanding."
			}
		];
		
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: messages
			})
		});
		
		const data = await response.json();
		if (response.ok) {
			resultElement.textContent = data.choices[0].message.content;
		} else {
			resultElement.textContent = `Error: ${data.error ? data.error.message : 'Unknown error'}`;
		}
	} catch (error) {
		resultElement.textContent = `Error: ${error.message}`;
		console.error("Request error:", error);
	}
}