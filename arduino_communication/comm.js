let port;
let reader;
let writer;
let readLoopRunning = false;

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const connectionStatus = document.getElementById('connectionStatus');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

if ('serial' in navigator) {
	connectButton.addEventListener('click', connectToDevice);
	disconnectButton.addEventListener('click', disconnectFromDevice);
	sendButton.addEventListener('click', sendMessage);
	messageInput.addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			sendMessage();
		}
	});
} else {
	connectionStatus.textContent = 'Web Serial API not supported in this browser. Try Chrome or Edge.';
	connectButton.disabled = true;
}


async function connectToDevice() {
	try {
		port = await navigator.serial.requestPort();
		await port.open({ baudRate: 9600 });
		
		connectButton.disabled = true;
		disconnectButton.disabled = false;
		messageInput.disabled = false;
		sendButton.disabled = false;
		connectionStatus.textContent = 'Connected to Pro Micro';
		
		const textDecoder = new TextDecoderStream();
		const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
		reader = textDecoder.readable.getReader();
		
		const textEncoder = new TextEncoderStream();
		const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
		writer = textEncoder.writable.getWriter();
		
		readLoopRunning = true;
		readLoop();
	} catch (error) {
		console.error('Error connecting to serial device:', error);
		connectionStatus.textContent = `Connection error: ${error.message}`;
	}
}

// Disconnect from the serial device
async function disconnectFromDevice() {
	if (reader) {
		readLoopRunning = false;
		reader.cancel();
		reader.releaseLock();
	}
	
	if (writer) {
		writer.close();
		writer.releaseLock();
	}
	
	if (port) {
		await port.close();
	}
	
	// Update UI
	connectButton.disabled = false;
	disconnectButton.disabled = true;
	messageInput.disabled = true;
	sendButton.disabled = true;
	connectionStatus.textContent = 'Disconnected';
}

// Send a message to the device
async function sendMessage() {
	const message = messageInput.value.trim();
	if (message && writer) {
		try {
			await writer.write(message + '\n');
			messageInput.value = '';
		} catch (error) {
			console.error('Error sending message:', error);
			connectionStatus.textContent = `Send error: ${error.message}`;
		}
	}
}

async function readLoop() {
	while (port.readable && readLoopRunning) {
		try {
			let buffer = '';
			
			while (true) {
				const { value, done } = await reader.read();
				if (done) {
					reader.releaseLock();
					break;
				}
				buffer += value;
				const lines = buffer.split('\n');
				if (lines.length > 1) {
					for (let i = 0; i < lines.length - 1; i++) {
						const line = lines[i].trim();
						if (line) {
							// MESSAGE FROM CHIP RECEIVED HERE
							displayMessage(line);
						}
					}
					
					buffer = lines[lines.length - 1];
				}
			}
		} catch (error) {
			console.error('Error reading data:', error);
			if (readLoopRunning) {
				reader.releaseLock();
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
	}
}

function displayMessage(message) {
	const now = new Date();
	const timeString = now.toLocaleTimeString();
	
	latestMessage.textContent = message;
	timestamp.textContent = timeString;
}
