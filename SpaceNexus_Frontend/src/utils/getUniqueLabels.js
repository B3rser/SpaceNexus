// utils/getUniqueLabels.js (opcional)
export function getUniqueLabels(graph) {
  const out = [];
  const seen = new Set();
  for (const n of graph?.nodes ?? []) {
    for (const l of n?.labels ?? []) {
      if (!seen.has(l)) {
        seen.add(l);
        out.push(l);
      }
    }
  }
  // ordena alfabéticamente (español)
  return out.sort((a, b) => a.localeCompare(b, 'es'));
}

// Variante insensible a mayúsculas y preservando el primer formato visto:
// export function getUniqueLabelsCI(graph) {
//   const map = new Map(); // key=lower, val=primera forma vista
//   for (const n of graph?.nodes ?? []) {
//     for (const raw of n?.labels ?? []) {
//       const key = raw.trim().toLocaleLowerCase('es');
//       if (!map.has(key)) map.set(key, raw.trim());
//     }
//   }
//   return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'es'));
// }
