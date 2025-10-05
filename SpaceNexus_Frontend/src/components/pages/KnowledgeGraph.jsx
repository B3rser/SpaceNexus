import React from 'react'
import { Graph } from '../Graph'
import { InfoNode } from '../InfoNode';
import { useParams } from 'react-router-dom';

import graphData from '../../assets/graph-data.json';
import CustomizedInputBase from '../CustomizedInputBase';

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const { user } = useParams();

  React.useEffect(() => {
    if (user) {
      const node = graphData.nodes.find(n => n.id === user);
      if (node) setSelectedNode(node);
    }
  }, [user]);

  const handleRelationClick = (relationId) => {
    const relatedNode = graphData.nodes.find(node => node.id === relationId);
    if (relatedNode) {
      setSelectedNode(relatedNode);
    }
  };

  const handleTagClick = (tag) => {
    console.log("Etiqueta clicada:", tag);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center" }}>
      <InfoNode selectedNode={selectedNode} onRelationClick={handleRelationClick} onTagClick={handleTagClick} />
      <div style={{ flexShrink: 0, position: "absolute", zIndex: 2, width: "80%", margin: "15px" }}>
        <CustomizedInputBase />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Graph data={graphData} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      </div>
    </div>
  )
}

