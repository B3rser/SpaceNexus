# app/api/endpoints/labels.py

from fastapi import APIRouter
from app.services.query_manager import QueryManager
from typing import List

router = APIRouter()
query_manager = QueryManager()

@router.get("/labels/", response_model=List[str])
def get_all_labels():
    """
    Endpoint para obtener una lista de todas las etiquetas (labels)
    únicas en el Knowledge Graph.
    """
    return query_manager.get_all_labels()