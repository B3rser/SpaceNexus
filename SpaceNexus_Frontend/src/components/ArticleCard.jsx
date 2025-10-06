// /src/components/ArticleCard.jsx
import * as React from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Stack, Box
} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useNavigate } from 'react-router-dom';

export function ArticleCard({
  node,
  id,
  title,
  tags,
  nodeId,
  graphUrl,
  renderTag,
}) {
  const resolvedTitle = title ?? node?.id ?? id ?? '';
  const resolvedTags = Array.isArray(tags) ? tags : (Array.isArray(node?.labels) ? node.labels : []);
  const resolvedNodeId = nodeId ?? node?.id ?? id;

  const navigate = useNavigate();

  // --- acciones ---
  const handleOpenGraph = (e) => {
    e.stopPropagation();
    if (graphUrl) {
      return window.open(graphUrl, '_blank', 'noopener,noreferrer');
    }
    navigate(`/knowledgeGalaxy/${resolvedNodeId}`);
  };

  const handleOpenArticle = () => {
    if (!resolvedNodeId) {
      console.warn("No valid article id found");
      return;
    }
    navigate(`/article/${resolvedNodeId}`);
  };

  const tagsToShow = resolvedTags.slice(0, 5);

  return (
    <Card
      onClick={handleOpenArticle}
      sx={{
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(50, 100, 255, 0.2), rgba(200, 0, 255, 0.2))',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width:'100%',
        minHeight: '200px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow .25s ease, transform .25s ease',
        '&:hover': {
          boxShadow: '0 0 25px rgba(120, 200, 255, 0.4)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: '18px',
            lineHeight: 1.25,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: 'var(--color-text, #fff)',
          }}
          title={resolvedTitle}
        >
          {resolvedTitle}
        </Typography>

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
                <Box
                  key={i}
                  sx={{
                    px: 0.75,
                    py: 0.25,
                    borderRadius: '999px',
                    fontSize: 12,
                    lineHeight: '18px',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'var(--color-text, #fff)',
                    whiteSpace: 'nowrap',
                  }}
                  title={t}
                >
                  {t}
                </Box>
              )
            )
          ) : (
            <Box sx={{ fontSize: 12, opacity: 0.7, color: 'var(--color-text, #fff)' }}>No tags</Box>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 1, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleOpenGraph}
          startIcon={<AccountTreeIcon />}
          sx={{
            ml: 'auto',
            borderRadius: '999px',
            textTransform: 'none',
            fontWeight: 600,
            background: 'var(--color-secondary)',
            color: 'var(--color-text)',
            '&:hover': {
              background: 'var(--color-secondary-40)',
            },
          }}
          aria-label={`Open in Knowledge Galaxy: ${resolvedTitle}`}
        >
          Open in Knowledge Galaxy
        </Button>
      </CardActions>
    </Card>
  );
}
