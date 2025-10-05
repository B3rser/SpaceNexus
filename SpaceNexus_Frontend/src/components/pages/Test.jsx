import * as React from 'react';
import CustomizedInputBase from '../CustomizedInputBase';
import { ArticlesGrid } from '../ArticleGrid';
import graphData from '../../assets/graph-data.json';
import { FilterPanel } from '../FilterPanel';
import { getUniqueLabels } from '../../utils/getUniqueLabels';

export function Test() {
  // base completa (no renderizar directo)
  const fullGraph = React.useRef(graphData);

  // chips únicas (sin repetidos) calculadas una vez
  const chips = React.useMemo(
    () => getUniqueLabels(fullGraph.current),
    []
  );

  // resultado que sí se muestra
  const [graphResponse, setGraphResponse] = React.useState({ nodes: [], links: [] });
  const [loading, setLoading] = React.useState(false);

  // term: string, selectedChips: string[]
  const handleSearch = (term, selectedChips = []) => {
    setLoading(true);
    const q = term.trim().toLowerCase();

    const baseNodes = fullGraph.current?.nodes ?? [];

    const filteredNodes = baseNodes
      .filter((n) => {
        const title = (n.id || '').toLowerCase();
        const labels = Array.isArray(n.labels) ? n.labels : [];
        const labelsStr = labels.join(' ').toLowerCase();

        // 1) Coincidencia por texto (en título o etiquetas)
        const matchesText = !q || title.includes(q) || labelsStr.includes(q);

        // 2) Coincidencia por chips seleccionadas (AND: deben estar todas)
        const matchesChips =
          selectedChips.length === 0 ||
          selectedChips.every((c) => labels.includes(c));

        return matchesText && matchesChips;
      })
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

    // Subgrafo de links sólo entre nodos filtrados
    const idSet = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = (fullGraph.current?.links ?? []).filter(
      (l) => idSet.has(l.source) && idSet.has(l.target)
    );

    setGraphResponse({ nodes: filteredNodes, links: filteredLinks });
    setLoading(false);
  };

  const handleOpenGraph = (nodeId) => {
    console.log('Ir al grafo, nodo:', nodeId);
  };

  const hasResults = (graphResponse.nodes?.length ?? 0) > 0;

  return (
    <div style={{ maxWidth: '100vw', padding: 16 }}>
      {/* Pasamos las chips únicas al buscador */}
      <CustomizedInputBase onSearch={handleSearch} chips={chips} />

      {loading && (
        <div style={{ width: '80vw', margin: '16px auto', opacity: 0.7 }}>
          Buscando…
        </div>
      )}

      {!loading && hasResults && (
        <ArticlesGrid
          graphResponse={graphResponse}
          onOpenGraph={handleOpenGraph}
        />
      )}

      {!loading && !hasResults && (
        <div style={{ width: '80vw', margin: '16px auto', opacity: 0.6, textAlign: 'center' }}>
        </div>
      )}
    </div>
  );
}
