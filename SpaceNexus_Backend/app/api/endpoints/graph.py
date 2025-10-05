# app/api/endpoints/graph.py

from fastapi import APIRouter, Query
from pydantic import BaseModel 
from typing import List       
from app.services.query_manager import QueryManager
from app.schemas.models import GraphStats, GraphSample, GraphNode, GraphLink


router = APIRouter()
query_manager = QueryManager()

@router.get("/graph/stats", response_model=GraphStats)
def get_stats():
    """
    Endpoint para obtener estadísticas generales del Knowledge Graph.
    """
    stats_data = query_manager.get_graph_stats()
    return stats_data

@router.get("/graph/sample", response_model=GraphSample)
def get_sample(limit: int = 20):
    """
    Endpoint para obtener una muestra de nodos y relaciones del grafo,
    ideal para visualizaciones.
    """
    return query_manager.get_graph_sample(limit=limit)

@router.get("/graph/nodes/", response_model=GraphSample)
def filter_nodes(labels: List[str] = Query(..., min_length=1, description="Lista de etiquetas para filtrar los nodos. Deben coincidir todas.")):
    """
    Obtiene un subgrafo que contiene los nodos que coinciden con TODAS las
    etiquetas proporcionadas, además de sus vecinos de primer nivel.
    """
    # CAMBIO: Llamamos a la nueva función del servicio
    return query_manager.filter_nodes_and_get_neighbors(required_labels=labels)