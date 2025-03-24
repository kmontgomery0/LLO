##########################################################################################
### This code provides samples of two ways of image to text interaction
### 1) Send a local image (e.g. image from your object's camera)
### 2) Send an image link (e.g. you are performing web crawling)
##########################################################################################

import os
import base64
from openai import OpenAI
from dotenv import load_dotenv

if (not os.path.isfile(".env")):
	print("API key not found!")
	quit()

load_dotenv()
client = OpenAI()

def encode_image(image_path):
	with open(image_path, "rb") as image_file:
		return base64.b64encode(image_file.read()).decode("utf-8")

def local_image_completion(prompt, image_path, model = "gpt-4o-mini"):
	base64_image = encode_image(image_path)
	completion = client.chat.completions.create(
		model = model,
		messages=[
			{
				"role": "user",
				"content": [
					{ "type": "text", "text": prompt },
					{
						"type": "image_url",
						"image_url": {
							"url": f"data:image/jpeg;base64,{base64_image}",
						},
					},
				],
			}
		],
	)
	return completion.choices[0].message.content

def online_image_completion(prompt, image_url, model = "gpt-4o-mini"):
	completion = client.chat.completions.create(
		model = model,
		messages=[
			{
				"role": "user",
				"content": [
					{ "type": "text", "text": prompt },
					{
						"type": "image_url",
						"image_url": {
							"url": image_url,
						},
					},
				],
			}
		],
	)
	return completion.choices[0].message.content

# print(local_image_completion(
# 	prompt = "what's in this image?",
# 	image_path = "./sample_image.jpg"
# ))

print(online_image_completion(
	prompt = "what's in this image?",
	image_url = "https://en.wikipedia.org/wiki/Iceland#/media/File:Norsemen_Landing_in_Iceland.jpg"
))