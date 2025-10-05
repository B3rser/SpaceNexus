# app/api/endpoints/articles.py

from fastapi import APIRouter, HTTPException, Query 
from app.services.query_manager import QueryManager
from typing import List
from app.schemas.models import (
    UserRole,
    ArticleScientistView,
    ArticleInvestorView,
    ArticleArchitectView,
    ArticleSummaryView,
    ArticleIdList 
)

router = APIRouter()
query_manager = QueryManager()

@router.get("/articles/", response_model=List[ArticleSummaryView])
def filter_articles(labels: List[str] = Query(..., min_length=1, description="Lista de etiquetas para filtrar. Deben coincidir todas.")):
    """
    Obtiene una lista de artículos que contienen TODAS las etiquetas proporcionadas.
    """
    return query_manager.filter_articles_by_labels(required_labels=labels)


@router.get("/articles/{article_id}")
def get_article(article_id: str, role: UserRole):
    """
    Obtiene la información de un artículo específico.
    La vista de la información devuelta depende del `rol` proporcionado.
    """
    full_article_data = query_manager.get_article_by_id(article_id)

    if not full_article_data:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")

    if role == UserRole.cientifico:
        return ArticleScientistView(**full_article_data)
    elif role == UserRole.inversionista:
        return ArticleInvestorView(**full_article_data)
    elif role == UserRole.arquitecto_de_mision:
        return ArticleArchitectView(**full_article_data)
    
@router.get("/articles/recent/", response_model=List[ArticleSummaryView])
def get_recent_articles(limit: int = 10):
    """
    Obtiene los N artículos más recientes, ordenados por año de publicación.
    """
    return query_manager.get_most_recent_articles(limit=limit)


@router.get("/articles/top-weight/", response_model=List[ArticleSummaryView])
def get_top_weight_articles(limit: int = 10):
    """
    Obtiene los N artículos con mayor peso (más etiquetas), indicando mayor interconexión.
    """
    return query_manager.get_top_weight_articles(limit=limit)

@router.post("/articles/batch", response_model=List[ArticleSummaryView])
def get_articles_in_batch(id_list: ArticleIdList):
    """
    Obtiene los detalles completos de una lista de artículos a partir de sus IDs.
    """
    return query_manager.get_articles_by_ids(article_ids=id_list.ids)
