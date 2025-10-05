import dotenv
import os
import json
from openai import AzureOpenAI

class ChatBot:
    def __init__(self):
        """
        Inicializa el cliente de Azure OpenAI.
        """
        dotenv.load_dotenv()
        self.model_name = "gpt-5-nano"
        self.deployment = "space-apps-llm"

        self.client = AzureOpenAI(
            api_version="2024-12-01-preview",
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            api_key=os.getenv("AZURE_OPENAI_KEY")
        )

    def answer_question(self, json_data: dict, question: str) -> str:
        """
        Answers a question based on the contents of a JSON dictionary.
        """
        json_string = json.dumps(json_data, indent=2)

        messages = [
            {
                "role": "system",
                "content": "You are a helpful AI assistant that answers questions concisely based 'solely' on the provided JSON data. Don't use any external knowledge. If the answer isn't in the JSON, it indicates that you don't know the answer."
            },
            {
                "role": "user",
                "content": f"Based on the following data:\n\n---\n{json_string}\n---\n\nPlease, answer the next question: {question}"
            }
        ]

        try:
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=messages
            )

            return response.choices[0].message.content
        except Exception as e:
            return f"Connection error: {e}"