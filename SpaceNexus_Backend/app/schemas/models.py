# app/schemas/models.py

from enum import Enum
from pydantic import BaseModel
from typing import List
from typing import Dict, Any

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
    title: str

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
    url: str
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
    url: str
    abstract: str
    key_points: str
    results_and_conclusions: str
    knowledge_gaps: str | None = None
    consensus_disagreement: str | None = None
    actionable_insights: str | None = None
    scientific_progress: str | None = None


class ArticleInvestorView(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    url: str
    abstract: str
    impact_and_application: str
    results_and_conclusions: str
    knowledge_gaps: str | None = None
    consensus_disagreement: str | None = None
    actionable_insights: str | None = None
    scientific_progress: str | None = None


class ArticleArchitectView(BaseModel):
    id: str
    title: str
    authors: List[str]
    year: int
    labels: List[str]
    url: str
    abstract: str
    risks_and_mitigation: str
    results_and_conclusions: str
    knowledge_gaps: str | None = None
    consensus_disagreement: str | None = None
    actionable_insights: str | None = None
    scientific_progress: str | None = None

    
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
    
class LabelFrequency(BaseModel):
    label: str
    count: int

class ChatbotResponse(BaseModel):
    answer: str

class ChatbotRequest(BaseModel):
    json_data: Dict[str, Any]
    question: str