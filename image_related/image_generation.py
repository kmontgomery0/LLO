##########################################################################################
### This code provides samples of two features of 
### 1) Send a local image (e.g. image from your object's camera)
### 2) Send an image link (e.g. you are performing web crawling)
##########################################################################################

import os
import base64
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

if (not os.path.isfile(".env")):
	print("API key not found!")
	quit()

load_dotenv()
client = OpenAI()

def load_image(path):
	image = Image.open(path)
	byte_stream = BytesIO()
	image.save(byte_stream, format='PNG')
	return byte_stream.getvalue()

def decode_and_save_image(encoded_image, output_path):
	image_bytes = base64.b64decode(encoded_image)
	with open(output_path, "wb") as image_file:
		image_file.write(image_bytes)

def image_generation(prompt, model = "dall-e-3"):
	response = client.images.generate(
		model = model,
		prompt = prompt,
		n = 1,
		size = "1024x1024",
		response_format = "b64_json"
	)
	return response.data[0]

def image_edition(prompt, image_path, mask_path):
	image = load_image(image_path)
	mask = load_image(mask_path)
	response = client.images.edit(
		model = "dall-e-2",
		image = image,
		mask = mask,
		prompt = prompt,
		n = 1,
		size="1024x1024",
		response_format = "b64_json"
	)
	return response.data[0]

# response = image_generation("A key building that represents MIT")
# decode_and_save_image(response.b64_json, "sample_output.png")
# # Dall-e-3 will revise your prompt and you can check it in response object
# print(response.revised_prompt)

response = image_edition("A bus stop", "sample_image.jpg", "sample_mask.png")
decode_and_save_image(response.b64_json, "sample_output.png")