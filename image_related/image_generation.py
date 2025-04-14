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
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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

def image_variation(image_path, n=1):
	image = load_image(image_path)
	response = client.images.create_variation(
		image=image,
		n=n,
		size="1024x1024",
		response_format="b64_json"
	)
	return response.data[0]

def create_full_mask(image_path, output_path="full_mask.png"):
	# Open the original image to get its size
	with Image.open(image_path) as img:
		# Create a new white image with the same size
		mask = Image.new('RGB', img.size, (255, 255, 255))
		mask.save(output_path)
	return output_path

# Set your image name here
IMAGE_NAME = "IMG_0969.png"

# List of example prompts
PROMPTS = [
    "Make the image more vibrant and colorful",
    "Add a dreamy, ethereal effect",
    "Convert to a watercolor painting style",
    "Make it look like an oil painting",
    "Add a warm, golden hour lighting effect",
    "Make it look like a vintage photograph",
    "Add a dramatic cinematic lighting",
    "Convert to a pencil sketch style",
    "Add a magical fantasy atmosphere",
    "Make it look like a comic book illustration"
]

# Select which prompt to use (change this number to try different prompts)
PROMPT_INDEX = 0  # Change this number to try different prompts (0-9)

# Create a full white mask for your image
mask_path = create_full_mask(IMAGE_NAME)

# Use the selected prompt to edit the image
response = image_edition(
    prompt=PROMPTS[PROMPT_INDEX],
    image_path=IMAGE_NAME,
    mask_path=mask_path
)
decode_and_save_image(response.b64_json, "sample_output.png")

# Print which prompt was used
print(f"Used prompt: {PROMPTS[PROMPT_INDEX]}")

# response = image_generation("A key building that represents MIT")
# decode_and_save_image(response.b64_json, "sample_output.png")
# # Dall-e-3 will revise your prompt and you can check it in response object
# print(response.revised_prompt)