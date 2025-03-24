async function generateImage() {
	const errorElement = document.getElementById('error');
	const imageElement = document.getElementById('imageResult');
	
	// Hide previous results
	errorElement.textContent = "";
	imageElement.style.display = "none";
	
	try {
		// Get inputs
		const prompt = document.getElementById('imagePrompt').value;
		const apiKey = document.getElementById('apiKey').value;
		const model = document.getElementById('imageModel').value;
		
		// Validate inputs
		if (!prompt) {
			errorElement.textContent = "Please enter an image prompt";
			return;
		}
		
		if (!apiKey) {
			errorElement.textContent = "Please enter your OpenAI API key";
			return;
		}
		
		// Show loading message
		errorElement.textContent = "Generating image...";
		
		// Send request to OpenAI API
		const response = await fetch('https://api.openai.com/v1/images/generations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: model,
				prompt: prompt,
				n: 1,
				size: "1024x1024"
			})
		});
		
		// Parse the response
		const data = await response.json();
		
		if (response.ok) {
			// Display the generated image
			errorElement.textContent = "";
			imageElement.src = data.data[0].url;
			imageElement.style.display = "block";
		} else {
			// Show error message
			errorElement.textContent = `Error: ${data.error ? data.error.message : 'Unknown error'}`;
		}
	} catch (error) {
		errorElement.textContent = `Error: ${error.message}`;
		console.error("Request error:", error);
	}
}