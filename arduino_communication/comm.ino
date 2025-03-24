void setup() {
	Serial.begin(9600);
}

void loop() {
	
	Serial.println("Hello from Pro Micro!");

	if (Serial.available() > 0) {
		String receivedString = Serial.readStringUntil('\n');
		// Process the received string
	}

	delay(1000);
}