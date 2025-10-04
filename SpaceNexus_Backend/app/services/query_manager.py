# app/services/query_manager.py

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
        print(f"LOG: Obteniendo muestra del grafo con límite de {limit} nodos.")
        # Actualizamos los datos para que coincidan con los nuevos modelos
        sample_data = {
            "nodes": [
                {"id": "BRCA1", "labels": ["Gene", "Key Finding", "Human"]},
                {"id": "BRCA1_HUMAN", "labels": ["Protein"]},
                {"id": "Bone Density Loss", "labels": ["PhysiologicalEffect", "Risk"]}
            ],
            "links": [
                {"source": "BRCA1", "target": "BRCA1_HUMAN", "type": "ENCODES"},
                {"source": "BRCA1_HUMAN", "target": "Bone Density Loss", "type": "ASSOCIATED_WITH"}
            ]
        }
        return sample_data