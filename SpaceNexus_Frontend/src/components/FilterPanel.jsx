// /src/components/FilterPanel.jsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function FilterPanel({ onClose, onApply }) {
  // estado de filtros (ejemplo)
  // const [tags, setTags] = React.useState([]);

  return (
    <Paper variant="outlined" sx={{ mt: 1, p: 2, borderRadius: 2, position: "relative"}}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        <div><strong>Filtros</strong> (aquí tus controles)</div>
        <div>
          <Button size="small" onClick={onClose}>Cerrar</Button>
          <Button
            size="small"
            variant="contained"
            sx={{ ml: 1 }}
            onClick={() => {
              if (onApply) onApply(/* { tags } */);
              if (onClose) onClose();
            }}
          >
            Aplicar
          </Button>
        </div>
      </Stack>
    </Paper>
  );
}
