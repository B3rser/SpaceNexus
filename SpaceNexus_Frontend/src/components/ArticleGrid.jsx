import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { ArticleCard } from './ArticleCard';

/**
 * Ahorita el array de artículos se encuentra estructurado así:
 *   {
 *     id: string|number,
 *     title: string,
 *     tags?: string[],
 *     nodeId?: string|number
 *   }
 *
 * Hay que actualizarlos según lo que el back nos regresa en el json verdaderamente
 */


// export function ArticlesGrid({ items = [], onOpenGraph, graphBaseUrl, renderTag }) {
//   if (!items.length) return null;

//   return (
//     <Box
//       sx={{
//         width: '80vw',        
//         mx: 'auto',           
//         display: 'grid',
//         gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
//         gap: 2,              
//         alignItems: 'stretch',
//         position: 'relative',
//         paddingTop: '10px'
//       }}
//     >
//       {items.map((it, idx) => {
//         const key = it.id ?? `${it.title}-${idx}`;
//         const nodeId = it.nodeId ?? it.id ?? idx;
//         const graphUrl = graphBaseUrl
//           ? `${graphBaseUrl.replace(/\/$/, '')}/${nodeId}`
//           : undefined;

//         return (
//           <ArticleCard
//             key={key}
//             id={it.id}
//             title={it.title}
//             tags={it.tags}
//             nodeId={nodeId}
//             graphUrl={graphUrl}
//             onOpenGraph={onOpenGraph}
//             renderTag={renderTag}
//           />
//         );
//       })}
//     </Box>
//   );
// }


// /src/components/ArticlesGrid.jsx (sin cambios en el layout)
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { ArticleCard } from './ArticleCard';

export function ArticlesGrid({ graphResponse, onOpenGraph, graphBaseUrl, renderTag }) {
  // graphResponse: { nodes: [...], links: [...] }
  const items = Array.isArray(graphResponse?.nodes) ? graphResponse.nodes : [];
  if (!items.length) return null;

  return (
    <Box
      sx={{
        width: '80vw',        
        mx: 'auto',           
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
        gap: 2,              
        alignItems: 'stretch',
        position: 'relative',
        paddingTop: '10px',
      }}
    >
      {items.map((node) => {
        const graphUrl = graphBaseUrl ? `${graphBaseUrl.replace(/\/$/, '')}/${node.id}` : undefined;
        return (
          <ArticleCard
            key={node.id}
            node={node}            // 👈 le pasamos el objeto del back directo
            onOpenGraph={onOpenGraph}
            graphUrl={graphUrl}
            renderTag={renderTag}
          />
        );
      })}
    </Box>
  );
}
