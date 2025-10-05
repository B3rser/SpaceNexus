# app/services/query_manager.py

from typing import Optional, List


class QueryManager:
    def __init__(self):
        """
        Inicializamos la clase con una única fuente de datos para el grafo,
        así evitamos inconsistencias. El peso se calculará dinámicamente.
        """
        self._mock_graph_db = {
            "nodes": [
                {"id": "Paper A", "links": ["Paper B", "Paper D"], "labels": ["fundamentos", "teoría", "base conceptual"]},
                {"id": "Paper B", "links": ["Paper A", "Paper C"], "labels": ["expansión", "fundamentos", "desarrollo"]},
                {"id": "Paper C", "links": ["Paper B", "Paper D"], "labels": ["reciente", "citas", "aplicaciones"]},
                {"id": "Paper D", "links": ["Paper A", "Paper C"], "labels": ["técnica", "innovación", "metodología"]},
                {"id": "Paper E", "links": [], "labels": ["nicho", "especializado", "baja influencia"]}
            ],
            "links": [
                {"source": "Paper A", "target": "Paper B"},
                {"source": "Paper A", "target": "Paper D"},
                {"source": "Paper B", "target": "Paper C"},
                {"source": "Paper D", "target": "Paper C"}
            ]
        }
    
    def _add_dynamic_weights(self, nodes: List[dict]) -> List[dict]:
        """
        Un método auxiliar para añadir el 'weight' a una lista de nodos.
        El peso es la cantidad de etiquetas que tiene el nodo.
        """
        for node in nodes:
            node['weight'] = len(node.get('labels', []))
        return nodes
    
    
    
    def get_graph_stats(self) -> dict:
        print("LOG: Obteniendo estadísticas del grafo desde el servicio.")
        return {
            "node_count": 15032,
            "relationship_count": 87451,
            "labels": ["Publication", "Organism", "Environment", "Gene"],
            # Se eliminó average_node_degree
        }

    def get_all_labels(self) -> list[str]:
        print("LOG: Obteniendo todas las etiquetas desde el servicio.")
        return ["Publication", "Organism", "Environment", "Gene", "Protein", "PhysiologicalEffect", "Countermeasure"]

    def get_graph_sample(self, limit: int) -> dict:
        nodes_with_weights = self._add_dynamic_weights(self._mock_graph_db["nodes"])
        return {"nodes": nodes_with_weights, "links": self._mock_graph_db["links"]}


    def get_article_by_id(self, article_id: str) -> Optional[dict]:
        print(f"LOG: Buscando el artículo con ID: {article_id}")

        mock_db = {
            "NASA-001": {
                "id": "NASA-001",
                "title": "Efectos de la Microgravedad en Arabidopsis Thaliana",
                "labels": ["Microgravity", "Botany", "ISS Experiment"],
                "abstract": "Un estudio sobre el crecimiento y la expresión génica de Arabidopsis Thaliana en condiciones de microgravedad a bordo de la ISS.",
                "key_points": "Se observaron cambios significativos en la expresión de 112 genes relacionados con el estrés celular y el crecimiento.",
                "impact_and_application": "Los hallazgos podrían llevar al desarrollo de cultivos más resistentes para misiones espaciales de larga duración, con un potencial mercado de 10M USD.",
                "risks_and_mitigation": "El principal riesgo es la atrofia del sistema radicular. Mitigación: sistema de nutrientes hidropónico optimizado.",
                "results_and_conclusions": "La microgravedad induce una respuesta de estrés detectable, pero la planta es capaz de adaptarse. Se concluye que el cultivo es viable."
            }
        }
        return mock_db.get(article_id)
    
    def filter_articles_by_labels(self, required_labels: List[str]) -> List[dict]:
       
        print(f"LOG: Filtrando artículos que contengan todas las etiquetas: {required_labels}")

        # Base de datos de ejemplo más grande
        mock_articles_db = [
            {
                "id": "NASA-001",
                "title": "Efectos de la Microgravedad en Arabidopsis Thaliana",
                "labels": ["Microgravity", "Botany", "ISS Experiment"],
                # ... otros campos ...
            },
            {
                "id": "NASA-002",
                "title": "Pérdida de Densidad Ósea en Misiones de Larga Duración",
                "labels": ["Human", "PhysiologicalEffect", "Risk", "Microgravity"],
                # ... otros campos ...
            },
            {
                "id": "JAXA-005",
                "title": "Cultivo de Lechugas en Entorno Espacial",
                "labels": ["Botany", "ISS Experiment", "Countermeasure"],
                # ... otros campos ...
            }
        ]

        # Convertimos las etiquetas requeridas a un conjunto para una búsqueda eficiente
        required_set = set(required_labels)
        
        # Filtramos la lista de artículos
        matching_articles = []
        for article in mock_articles_db:
            # Un artículo coincide si el conjunto de etiquetas requeridas es un
            # subconjunto del conjunto de etiquetas del artículo.
            if required_set.issubset(set(article["labels"])):
                matching_articles.append(article)
        
        return matching_articles
    
    def filter_nodes_and_get_neighbors(self, required_labels: List[str]) -> dict:
        all_nodes_map = {node['id']: node for node in self._mock_graph_db["nodes"]}
        required_set = set(required_labels)
        
        seed_nodes = [node for node in self._mock_graph_db["nodes"] if required_set.issubset(set(node["labels"]))]
        
        final_node_ids = set(node['id'] for node in seed_nodes)
        for node in seed_nodes:
            final_node_ids.update(node['links'])

        final_nodes = [all_nodes_map[node_id] for node_id in final_node_ids if node_id in all_nodes_map]
        final_links = [link for link in self._mock_graph_db["links"] if link['source'] in final_node_ids and link['target'] in final_node_ids]

        return {"nodes": self._add_dynamic_weights(final_nodes), "links": final_links}

    def get_subgraph_by_node_id(self, node_id: str) -> Optional[dict]:
        """
        NUEVO: Encuentra un nodo por su ID y devuelve un subgrafo con sus vecinos.
        """
        all_nodes_map = {node['id']: node for node in self._mock_graph_db["nodes"]}
        
        seed_node = all_nodes_map.get(node_id)
        if not seed_node:
            return None # El nodo no fue encontrado

        final_node_ids = {seed_node['id']}
        final_node_ids.update(seed_node['links'])

        final_nodes = [all_nodes_map[node_id] for node_id in final_node_ids if node_id in all_nodes_map]
        final_links = [link for link in self._mock_graph_db["links"] if link['source'] in final_node_ids and link['target'] in final_node_ids]

        return {"nodes": self._add_dynamic_weights(final_nodes), "links": final_links}