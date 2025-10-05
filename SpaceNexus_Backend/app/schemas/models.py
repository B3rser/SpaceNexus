# app/schemas/models.py

from enum import Enum
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
    labels: List[str] 
    weight: int
    links : List[str]
    authors: list[str] 
    year: int

class GraphLink(BaseModel):
    source: str
    target: str

class GraphSample(BaseModel):
    nodes: List[GraphNode]
    links: List[GraphLink]
    
    
class UserRole(str, Enum):
    cientifico = "cientifico"
    inversionista = "inversionista"
    arquitecto_de_mision = "arquitecto_de_mision"

class ArticleBase(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    abstract: str
    key_points: str
    impact_and_application: str
    risks_and_mitigation: str
    results_and_conclusions: str


class ArticleScientistView(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    abstract: str
    key_points: str
    results_and_conclusions: str

class ArticleInvestorView(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    abstract: str
    impact_and_application: str
    results_and_conclusions: str

class ArticleArchitectView(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    abstract: str
    risks_and_mitigation: str
    results_and_conclusions: str
    
class ArticleSummaryView(BaseModel):
    """
    Un modelo de resumen para mostrar artículos en una lista.
    """
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    
class SearchQuery(BaseModel):
    query: str
    max_results: int = 10