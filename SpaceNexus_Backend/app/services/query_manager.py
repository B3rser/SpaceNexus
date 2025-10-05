# app/services/query_manager.py

from typing import Optional, List


class QueryManager:
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
        """
        Simula una consulta que obtiene una muestra de nodos y relaciones.
        """
        print(f"LOG: Obteniendo muestra del grafo con límite de {limit} nodos.")

        return {
            "nodes": [
                {
                    "id": "Paper A", "weight": 8, "links": ["Paper B", "Paper D"],
                    "labels": ["fundamentos", "teoría", "base conceptual"] # CAMBIO: 'tags' vuelve a ser 'labels'
                },
                {
                    "id": "Paper B", "weight": 5, "links": ["Paper A", "Paper C"],
                    "labels": ["expansión", "fundamentos", "desarrollo"] # CAMBIO: 'tags' vuelve a ser 'labels'
                },
                {
                    "id": "Paper C", "weight": 3, "links": ["Paper B", "Paper D"],
                    "labels": ["reciente", "citas", "aplicaciones"] # CAMBIO: 'tags' vuelve a ser 'labels'
                },
                {
                    "id": "Paper D", "weight": 4, "links": ["Paper A", "Paper C"],
                    "labels": ["técnica", "innovación", "metodología"] # CAMBIO: 'tags' vuelve a ser 'labels'
                },
                {
                    "id": "Paper E", "weight": 2, "links": [],
                    "labels": ["nicho", "especializado", "baja influencia"] # CAMBIO: 'tags' vuelve a ser 'labels'
                }
            ],
            "links": [
                {"source": "Paper A", "target": "Paper B"},
                {"source": "Paper A", "target": "Paper D"},
                {"source": "Paper B", "target": "Paper C"},
                {"source": "Paper D", "target": "Paper C"}
            ]
        }
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
        """
        Filtra nodos por etiquetas y además incluye a todos sus vecinos de primer nivel.
        """
        print(f"LOG: Filtrando nodos por {required_labels} e incluyendo vecinos.")

        full_graph = self.get_graph_sample(limit=0) # Usamos el método que ya teníamos
        all_nodes = full_graph["nodes"]
        all_links = full_graph["links"]

        required_set = set(required_labels)
        seed_nodes = [
            node for node in all_nodes if required_set.issubset(set(node["labels"]))
        ]

        final_node_ids = set(node['id'] for node in seed_nodes)
        for node in seed_nodes:
            for neighbor_id in node['links']:
                final_node_ids.add(neighbor_id)

        final_nodes = [node for node in all_nodes if node['id'] in final_node_ids]
        final_links = [
            link for link in all_links
            if link['source'] in final_node_ids and link['target'] in final_node_ids
        ]

        return {"nodes": final_nodes, "links": final_links}