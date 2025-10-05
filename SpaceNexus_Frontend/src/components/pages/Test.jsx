// import * as React from 'react';
// import CustomizedInputBase from '../CustomizedInputBase';
// //import { FilterPanel } from '../FilterPanel';

// export function Test() {
//   const handleSearch = (term) => {
//     // Acciones para enviar al back
//     console.log('Buscando:', term);
//   };

//   //<CustomizedInputBase onSearch={handleSearch} FilterComponent={FilterPanel} />
//   return (
//     <div style={{ maxWidth: '90vw' }}>
//       <CustomizedInputBase onSearch={handleSearch} />
//     </div>
//   );
// }



import * as React from 'react';
import CustomizedInputBase from '../CustomizedInputBase';
import { ArticlesGrid } from '../ArticleGrid';
import articlesData from './data.json';

export function Test() {
  const [results, setResults] = React.useState([]);

  const handleSearch = (term) => {
    const q = term.toLowerCase();

    // 📦 Placeholder: adapta al shape real cuando te responda el back
    // Soporta que tu JSON actual pueda venir como array de strings (títulos) o objetos.
    const normalized = (articlesData ?? []).map((a, idx) =>
      typeof a === 'string'
        ? { id: idx, title: a, tags: [], nodeId: idx }
        : {
            id: a.id ?? idx,
            title: a.title ?? a.name ?? `Artículo ${idx + 1}`,
            tags: Array.isArray(a.tags) ? a.tags : [],
            nodeId: a.nodeId ?? a.id ?? idx,
          }
    );

    const filtered = normalized.filter((a) =>
      a.title.toLowerCase().includes(q)
    );

    setResults(filtered);
  };

  const handleOpenGraph = (nodeId) => {
    // 🔗 Aquí conectarás con tu grafo (router interno o URL externa).
    // Ejemplo: window.open(`/grafo/${nodeId}`, '_blank');
    console.log('Ir al grafo, nodo:', nodeId);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
      <CustomizedInputBase onSearch={handleSearch} />
      <ArticlesGrid
        items={results}
        onOpenGraph={handleOpenGraph}
        // graphBaseUrl="https://mi-grafo.app/node" // si prefieres URL directo, quita onOpenGraph
      />
    </div>
  );
}
