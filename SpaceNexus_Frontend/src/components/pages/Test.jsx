import * as React from 'react';
import CustomizedInputBase from '../CustomizedInputBase';
import { ArticlesGrid } from '../ArticleGrid';
import graphData from '../../assets/graph-data.json';

export function Test() {
  // grafo completo (solo lectura / base)
  const fullGraph = React.useRef(graphData);

  // resultados filtrados que SÍ se renderizan
  const [graphResponse, setGraphResponse] = React.useState({ nodes: [], links: [] });
  const [loading, setLoading] = React.useState(false);

  const handleSearch = (term) => {
    const q = term.trim().toLowerCase();
    setLoading(true);

    if (!q) {
      // sin término => no mostrar nada
      setGraphResponse({ nodes: [], links: [] });
      setLoading(false);
      return;
    }

    const baseNodes = Array.isArray(fullGraph.current?.nodes) ? fullGraph.current.nodes : [];

    // filtra por título (id) o por labels
    const filteredNodes = baseNodes
      .filter((n) => {
        const title = (n.id || '').toLowerCase();
        const labels = Array.isArray(n.labels) ? n.labels : [];
        const labelsStr = labels.join(' ').toLowerCase();
        return title.includes(q) || labelsStr.includes(q);
      })
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0)); // opcional: prioridad por weight

    // subgrafo de links solo entre nodos filtrados
    const idSet = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = (fullGraph.current.links || []).filter(
      (l) => idSet.has(l.source) && idSet.has(l.target)
    );

    setGraphResponse({ nodes: filteredNodes, links: filteredLinks });
    setLoading(false);
  };

  const handleOpenGraph = (nodeId) => {
    // Conecta aquí tu vista/URL del grafo
    console.log('Ir al grafo, nodo:', nodeId);
  };

  const hasResults = (graphResponse.nodes?.length ?? 0) > 0;

  return (
    <div style={{ maxWidth: '100vw', padding: 16 }}>
      <CustomizedInputBase onSearch={handleSearch} />

      {loading && (
        <div style={{ width: '80vw', margin: '16px auto', opacity: 0.7 }}>
          Buscando…
        </div>
      )}

      {!loading && hasResults && (
        <ArticlesGrid
          graphResponse={graphResponse}   // 👈 solo mostramos lo filtrado
          onOpenGraph={handleOpenGraph}
          // graphBaseUrl="https://mi-grafo.app/node" // alternativa si prefieres URL directa
        />
      )}

      {!loading && !hasResults && (
        <div style={{ width: '80vw', margin: '16px auto', opacity: 0.6, textAlign: 'center' }}>
          Ingresa un término para ver resultados.
        </div>
      )}
    </div>
  );
}
