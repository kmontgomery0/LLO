import os
import openai
from dotenv import load_dotenv

if (not os.path.isfile(".env")):
	print("API key not found!")
	quit()

load_dotenv()

def text_to_speech(text, output_path):
	response = openai.audio.speech.create(
		model = "gpt-4o-mini-tts",
		voice = "alloy",
		input = text
	)
	response.stream_to_file( output_path)
	print("Generation completed!")

def voice_transcription(audio_path):
	client = openai.OpenAI()
	audio_file = open(audio_path, "rb")
	transcript = client.audio.transcriptions.create(
		model = "gpt-4o-transcribe",
		file = audio_file
	)
	return transcript.text

text_to_speech("The quick brown fox jumped over the lazy dog.", "./sample.mp3")
print(voice_transcription("./sample.mp3"))