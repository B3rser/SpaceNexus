// /src/components/ArticleCard.jsx
import * as React from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Stack, Box
} from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export function ArticleCard({
  node,
  id,
  title,
  tags,
  nodeId,
  graphUrl,
  onOpenGraph,
  renderTag,
}) {
  // Mapea al esquema del back
  const resolvedTitle  = title ?? node?.id ?? id ?? '';
  const resolvedTags   = Array.isArray(tags) ? tags : (Array.isArray(node?.labels) ? node.labels : []);
  const resolvedNodeId = nodeId ?? node?.id ?? id;

  // Límite de 5 por reglas previas; además el contenedor corta a 2 filas visibles
  const tagsToShow = resolvedTags.slice(0, 5);

  const handleOpen = () => {
    const finalNodeId = resolvedNodeId ?? resolvedTitle;
    if (onOpenGraph) return onOpenGraph(finalNodeId);
    if (graphUrl) return window.open(graphUrl, '_blank', 'noopener,noreferrer');
    console.warn('No onOpenGraph ni graphUrl proporcionados. nodeId:', finalNodeId);
  };

  // Si NO pasas onOpenGraph y SÍ pasas graphUrl, renderizamos como <a> (soporta ctrl/cmd-click)
  const clickableProps =
    graphUrl && !onOpenGraph
      ? { component: 'a', href: graphUrl, target: '_blank', rel: 'noopener noreferrer' }
      : { onClick: handleOpen };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '10px',
        bgcolor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '180PX',    
        overflow: 'hidden',
        transition: 'box-shadow .2s ease, transform .2s ease',
        '&:hover': { boxShadow: 3, transform: 'translateY(-1px)' },
      }}
    >
      {/* Toda esta área es clickeable */}
      <CardActionArea sx={{ flexGrow: 1, alignSelf: 'stretch' }} {...clickableProps}>
        <CardContent sx={{ p: '10px' }}>
          {/* Título: 2 líneas con “…” */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              fontSize: '18px',
              lineHeight: 1.25,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={resolvedTitle}
          >
            {resolvedTitle}
          </Typography>

          {/* Etiquetas: solo las que quepan en 2 filas */}
          <Stack
            direction="row"
            useFlexGap
            flexWrap="wrap"
            sx={{
              gap: 0.75,
              maxHeight: 24 * 2 + 8, 
              overflow: 'hidden',
              alignContent: 'flex-start',
            }}
          >
            {tagsToShow.length ? (
              tagsToShow.map((t, i) =>
                renderTag ? (
                  <React.Fragment key={i}>{renderTag(t, i)}</React.Fragment>
                ) : (
                  // Placeholder de etiqueta (reemplazarás con tu componente real)
                  <Box
                    key={i}
                    sx={{
                      px: 0.75,
                      py: 0.25,
                      borderRadius: '999px',
                      fontSize: 12,
                      lineHeight: '18px',
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
      </CardActionArea>


      <CardActions sx={{ p: 1, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleOpen}
          startIcon={<AccountTreeIcon />}
          sx={{ ml: 'auto', borderRadius: '999px', background: 'var(--color-cosmic-purple)' }}
          aria-label={`Abrir en grafo: ${resolvedTitle}`}
        >
          Ver grafo
        </Button>
      </CardActions>
    </Card>
  );
}
