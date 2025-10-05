# app/api/endpoints/chatbot.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import json

from app.services.chatbot_service import ChatBot

from app.schemas.models import ChatbotResponse, ChatbotRequest

try:
    chatbot_service = ChatBot()
except Exception as e:
    print(f"ERROR: No se pudo inicializar el servicio ChatBot: {e}")
    chatbot_service = None

router = APIRouter()

@router.post("/answer", response_model=ChatbotResponse)
async def get_chatbot_answer(request: ChatbotRequest):
    """
    Genera una respuesta a una pregunta basándose en un documento de artículo
    científico proporcionado en formato JSON, utilizando el LLM de Azure OpenAI.
    """
    if chatbot_service is None:
        raise HTTPException(
            status_code=503,
            detail="El servicio de LLM no está disponible. Revise la configuración de las variables de entorno (AZURE_OPENAI_ENDPOINT/KEY)."
        )

    try:
        respuesta = chatbot_service.answer_question(
            json_data=request.json_data,
            question=request.question
        )

        return {"answer": respuesta}

    except Exception as e:
        print(f"Error inesperado al generar la respuesta del chatbot: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error interno al procesar la solicitud con el modelo de lenguaje."
        )