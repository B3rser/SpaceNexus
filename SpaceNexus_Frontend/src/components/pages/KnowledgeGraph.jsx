import React from 'react'
import { Graph } from '../Graph'
import { InfoNode } from '../InfoNode';

import graphData from '../../assets/graph-data.json';

export function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = React.useState(null);

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <InfoNode selectedNode={selectedNode} onRelationClick={handleRelationClick} onTagClick={handleTagClick} />
      <div style={{ flexShrink: 0 }}>

      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Graph data={graphData} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      </div>
    </div>
  )
}

