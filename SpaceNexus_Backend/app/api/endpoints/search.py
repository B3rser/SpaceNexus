# app/api/endpoints/search.py

from fastapi import APIRouter, HTTPException
from app.schemas.models import SearchQuery
from app.services.semantic_search import EmbbedingsManager
import os

router = APIRouter()


@router.post("/search/semantic")
def post_semantic_search(query: SearchQuery) -> dict[str, list[str]]:
    """
    Realiza una búsqueda semántica en los artículos.
    Busca por significado en el título, contenido y etiquetas.
    """

    manager = EmbbedingsManager("./embeddings_dir")

    if not manager.db:
        raise HTTPException(
            status_code=500, detail="Error al realizar la búsqueda semántica"
        )

    results = manager.similaritySearch(query.query, k=4)
    sources = [os.path.basename(result.metadata["source"]) for result in results]

    return {"results": sources}
