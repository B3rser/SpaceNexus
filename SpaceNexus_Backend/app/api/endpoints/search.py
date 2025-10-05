# app/api/endpoints/search.py

from fastapi import APIRouter, HTTPException
from app.schemas.models import SearchQuery

router = APIRouter()

@router.post("/search/semantic")
def post_semantic_search(query: SearchQuery):
    """
    Realiza una búsqueda semántica en los artículos.
    Busca por significado en el título, contenido y etiquetas.
    """
    raise HTTPException(
        status_code=501, 
        detail="Búsqueda semántica aún no implementada."
    )