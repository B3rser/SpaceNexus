import React, { useState, useEffect } from 'react'
import { Graph } from '../Graph'
import { InfoNode } from '../InfoNode';
import { useParams } from 'react-router-dom';

import { getFullGraph, getNodeSubgraph } from '../../services/graph.service';

import graphData from '../../assets/graph-data.json';
import CustomizedInputBase from '../CustomizedInputBase';

export function KnowledgeGraph() {
  const { name } = useParams();

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    document.title = "Knowledge Galaxy";
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        let dataFromApi;
        if (name) {

          console.log(`Buscando subgrafo para el nodo: ${name}`);
          dataFromApi = await getNodeSubgraph(name);
        } else {
          console.log("Buscando el grafo completo...");
          dataFromApi = await getFullGraph();
        }
        setGraphData(dataFromApi);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos del grafo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [name]);

  useEffect(() => {
    if (name && graphData.nodes.length > 0) {
      const node = graphData.nodes.find(n => n.id === name);
      if (node) {
        setSelectedNode(node);
      }
    } else {
      setSelectedNode(null);
    }
  }, [name, graphData]);

  const handleRelationClick = (relationId) => {
    const relatedNode = graphData.nodes.find(node => node.id === relationId);
    if (relatedNode) {
      setSelectedNode(relatedNode);
    }
  };

  const handleSearch = (relationId) => {
    const relatedNode = graphData.nodes.find(node => node.id === relationId);
    if (relatedNode) {
      setSelectedNode(relatedNode);
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center" }}>
      <InfoNode
        selectedNode={selectedNode}
        onRelationClick={handleRelationClick}
        allNodes={graphData.nodes}
      />
      <div style={{ flexShrink: 0, position: "absolute", zIndex: 2, width: "80%", margin: "15px" }}>
        <CustomizedInputBase onSearch={handleSearch} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Graph data={graphData} selectedNode={selectedNode} setSelectedNode={setSelectedNode} nodeLabel="title"
        />
      </div>
    </div>
  )
}

