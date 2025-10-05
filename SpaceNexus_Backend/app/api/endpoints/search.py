# app/api/endpoints/search.py

from fastapi import APIRouter, HTTPException
from app.services.query_manager import QueryManager
from typing import List 
from app.schemas.models import ArticleSummaryView
from app.schemas.models import SearchQuery
from app.services.semantic_search import EmbbedingsManager
import os

router = APIRouter()


@router.post("/search/semantic", response_model=List[ArticleSummaryView])
def post_semantic_search(query: SearchQuery) -> dict[str, list[str]]:
    """
    Realiza una búsqueda semántica en los artículos.
    Busca por significado en el título, contenido y etiquetas.
    """

    manager = EmbbedingsManager("./embeddings")

    if manager.db is None:
        raise HTTPException(
            status_code=500, detail="Error al realizar la búsqueda semántica"
        )

    results = manager.similaritySearch(query.query, k=10)
    source_basenames = {os.path.basename(result.metadata["source"]) for result in results}

    # Usamos un set para evitar IDs duplicados y lo convertimos a lista
    #source_ids = list({os.path.basename(result.metadata["source"]) for result in results})
    source_ids = list({f"{os.path.splitext(name)[0]}.json" for name in source_basenames})
    print("LOG: IDs obtenidos de la búsqueda semántica:", source_ids)
    if not source_ids:
        return []

    query_manager = QueryManager()
    
    full_articles = query_manager.get_articles_by_ids(article_ids=source_ids)
    return full_articles