import * as React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Stack, Box } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

/**
 * Props esperadas:
 * - id, title (string)
 * - tags (string[]) opcional -> se muestran hasta 5
 * - nodeId (string|number) opcional -> id del nodo en el grafo
 * - graphUrl (string) opcional -> si viene, se abre en una pestaña nueva
 * - onOpenGraph (fn) opcional -> callback preferido para abrir el grafo (recibe nodeId)
 * - renderTag (fn) opcional -> (tag, idx) => ReactNode para reemplazar el placeholder de etiqueta
 */

export function ArticleCard({
  id,
  title,
  tags = [],
  nodeId,
  graphUrl,
  onOpenGraph,
  renderTag,
}) {
  const tagsToShow = Array.isArray(tags) ? tags.slice(0, 5) : [];

  const handleOpen = () => {
    const finalNodeId = nodeId ?? id;
    if (onOpenGraph) return onOpenGraph(finalNodeId);
    if (graphUrl) return window.open(graphUrl, '_blank', 'noopener,noreferrer');
    console.warn('No onOpenGraph ni graphUrl proporcionados.');
  };

  const TAG_ROW_PX = 28; 
  const ROW_GAP_PX = 8;  

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        bgcolor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // permite igualar altura con otros ítems de la fila
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Título: clamp a 2 líneas con “…” */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          title={title}
        >
          {title}
        </Typography>


        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{
            gap: 1, // 8px
            maxHeight: TAG_ROW_PX * 2 + ROW_GAP_PX, 
            overflow: 'hidden',
            alignContent: 'flex-start',
          }}
        >
          {tagsToShow.length ? (
            tagsToShow.map((t, i) =>
              renderTag ? (
                <React.Fragment key={i}>{renderTag(t, i)}</React.Fragment>
              ) : (
                <Box
                  key={i}
                  sx={{
                    px: 1,
                    py: 0.5,
                    borderRadius: '999px',
                    fontSize: 12,
                    lineHeight: '20px',
                    bgcolor: 'rgba(0,0,0,0.05)',
                    color: 'var(--color-accent-60)',
                    whiteSpace: 'nowrap',
                  }}
                  title={t}
                >
                  {t}
                </Box>
              )
            )
          ) : (
            <Box sx={{ fontSize: 12, opacity: 0.7 }}>Sin etiquetas</Box>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleOpen}
          startIcon={<AccountTreeIcon />}
          sx={{ ml: 'auto', borderRadius: '999px' }}
          aria-label={`Abrir en grafo: ${title}`}
        >
            Ver grafo
        </Button>
      </CardActions>
    </Card>
  );
}


