# app/api/endpoints/labels.py

from fastapi import APIRouter
from app.services.query_manager import QueryManager
from typing import List
from app.schemas.models import LabelFrequency

router = APIRouter()
query_manager = QueryManager()

@router.get("/labels/", response_model=List[str])
def get_all_labels():
    """
    Endpoint para obtener una lista de todas las etiquetas (labels)
    únicas en el Knowledge Graph.
    """
    return query_manager.get_all_labels()

@router.get("/labels/top/", response_model=List[LabelFrequency])
def get_top_labels(limit: int = 10):
    """
    Obtiene las N etiquetas más comunes (con más apariciones) en todo el dataset.
    """
    return query_manager.get_top_labels(limit=limit)