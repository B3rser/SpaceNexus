# app/schemas/models.py

from pydantic import BaseModel
from typing import List

class GraphStats(BaseModel):
    """
    Este es nuestro modelo de datos para las estadísticas del grafo.
    Define los campos y sus tipos de datos esperados en la respuesta.
    """
    node_count: int
    relationship_count: int
    labels: List[str]
    #average_node_degree: float
    
class GraphNode(BaseModel):
    id: str
    labels: List[str] # Ahora es una lista de etiquetas
    #properties: dict

class GraphLink(BaseModel):
    source: str
    target: str
    type: str

class GraphSample(BaseModel):
    nodes: List[GraphNode]
    links: List[GraphLink]