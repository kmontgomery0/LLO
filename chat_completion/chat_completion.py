##########################################################################################
### This code provides samples of three different types of chat completion interaction
### 1) One piece of user prompt (simplest interaction)
### 2) System (developer) prompt + one piece of user prompt (good for one time interaction for determined context / requirements)
### 3) Completion of a continuous conversation (you need to implement the continuous logic including logging the conversation history by yourself)
##########################################################################################

import os
from openai import OpenAI
from dotenv import load_dotenv

if (not os.path.isfile(".env")):
	print("API key not found!")
	quit()

load_dotenv()
client = OpenAI()

def chat_completion(prompt, model = "gpt-4o-mini"):

	completion = client.chat.completions.create(
		model = model,
		messages = [
			{
				"role": "user",
				"content": prompt
			}
		]
	)

	return completion.choices[0].message.content

def chat_completion_with_developer(developer_prompt, user_prompt, model = "gpt-4o-mini"):

	completion = client.chat.completions.create(
		model = model,
		messages = [
			{
				"role": "developer",
				"content": developer_prompt
			},
			{
				"role": "user",
				"content": user_prompt
			}
		]
	)

	return completion.choices[0].message.content

def chat_completion_with_history(message_history, model = "gpt-4o-mini"):

	completion = client.chat.completions.create(
		model = model,
		messages = message_history
	)

	return completion.choices[0].message.content

user_prompt = "Do you know who is Marcelo Coelho?"

# print(chat_completion(user_prompt))

developer_prompt = "Talk like characters from Shakespeare's writing"

# print(chat_completion_with_developer(developer_prompt, user_prompt))

message_history = [
	{
		"role": "developer",
		"content": "Talk like characters from Shakespeare's writing"
	},
	{
		"role": "user",
		"content": "Do you know who is Marcelo Coelho?"
	},
	{
		"role": "assistant",
		"content": "Good sir or fair lady, prithee, I am but a humble wraith of knowledge, and the name Marcelo Coelho doth not ring a bell in the grand annals of my understanding."
	},
	{
		"role": "user",
		"content": "You sound funny! Where are you from?"
	}
]

print(chat_completion_with_history(message_history))