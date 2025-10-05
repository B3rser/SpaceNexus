from collections import Counter 
from typing import Optional, List
import json


class QueryManager:
    def __init__(self):
        """
        Inicializamos la clase con una única fuente de datos para el grafo,
        así evitamos inconsistencias. El peso se calculará dinámicamente.
        """
        with open("mockGraph.json", "r", encoding="utf-8") as f:
            self._mock_graph_db = json.load(f)

        with open("mockArticles.json", "r", encoding="utf-8") as f:
            self._mock_articles_db = json.load(f)
    
    def _add_dynamic_weights(self, nodes: List[dict]) -> List[dict]:
        """
        Un método auxiliar para añadir el 'weight' a una lista de nodos.
        El peso es la cantidad de etiquetas que tiene el nodo.
        """
        for node in nodes:
            node['weight'] = len(node.get('labels', []))
        return nodes
    
    
    
    def get_graph_stats(self) -> dict:
        """
        Calcula y devuelve estadísticas reales basadas en la base de datos
        """
        print("LOG: Calculando estadísticas del grafo desde el servicio.")

        node_count = len(self._mock_graph_db["nodes"])

        relationship_count = len(self._mock_graph_db["links"])

        all_labels = set()
        for node in self._mock_graph_db["nodes"]:
            all_labels.update(node.get("labels", []))

        return {
            "node_count": node_count,
            "relationship_count": relationship_count,
            "labels": sorted(list(all_labels)) # Convertimos el set a una lista ordenada
        }

    def get_all_labels(self) -> list[str]:
        print("LOG: Obteniendo todas las etiquetas únicas desde los datos de prueba.")
        
        all_labels = set()

        # 1. Recolecta etiquetas del grafo
        for node in self._mock_graph_db["nodes"]:
            all_labels.update(node.get("labels", []))

        # 2. Recolecta etiquetas de los artículos
        for article in self._mock_articles_db.values():
            all_labels.update(article.get("labels", []))
            
        return sorted(list(all_labels))
    
    def get_graph_sample(self) -> dict:
        nodes_with_weights = self._add_dynamic_weights(self._mock_graph_db["nodes"])
        return {"nodes": nodes_with_weights, "links": self._mock_graph_db["links"]}


    def get_article_by_id(self, article_id: str) -> Optional[dict]:
        print(f"LOG: Buscando el artículo con ID: {article_id}")
        return self._mock_articles_db.get(article_id)
    
    def filter_articles_by_labels(self, required_labels: List[str]) -> List[dict]:
        print(f"LOG: Filtrando artículos que contengan todas las etiquetas: {required_labels}")
        all_articles = list(self._mock_articles_db.values()) # Convertimos el dict a una lista
        
        if not required_labels:
            return all_articles
            
        required_set = set(required_labels)
        matching_articles = [
            article for article in all_articles
            if required_set.issubset(set(article["labels"]))
        ]
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
    
    def get_most_recent_articles(self, limit: int) -> List[dict]:
        """
        Ordena todos los artículos por año (de más nuevo a más viejo)
        y devuelve la cantidad especificada por 'limit'.
        """
        print(f"LOG: Obteniendo los {limit} artículos más recientes.")
        
        all_articles = list(self._mock_articles_db.values())
        
        sorted_articles = sorted(all_articles, key=lambda article: article['year'], reverse=True)
        
        return sorted_articles[:limit]

    def get_top_weight_articles(self, limit: int) -> List[dict]:
        """
        Ordena todos los artículos por peso (cantidad de etiquetas)
        y devuelve la cantidad especificada por 'limit'.
        """
        print(f"LOG: Obteniendo los {limit} artículos con mayor peso.")
        
        all_articles = list(self._mock_articles_db.values())

        sorted_articles = sorted(all_articles, key=lambda article: len(article.get('labels', [])), reverse=True)
        
        return sorted_articles[:limit]
    
    def get_top_labels(self, limit: int) -> List[dict]:
        """
        Calcula la frecuencia de todas las etiquetas y devuelve las más comunes.
        """
        print(f"LOG: Obteniendo las {limit} etiquetas más comunes.")
        
        all_labels_flat_list = []
        for node in self._mock_graph_db["nodes"]:
            all_labels_flat_list.extend(node.get("labels", []))
        for article in self._mock_articles_db.values():
            all_labels_flat_list.extend(article.get("labels", []))
            
        label_counts = Counter(all_labels_flat_list)
        
        top_labels_tuples = label_counts.most_common(limit)
        
        return [{"label": label, "count": count} for label, count in top_labels_tuples]
