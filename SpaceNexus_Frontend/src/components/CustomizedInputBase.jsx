// /src/CustomizedInputBase.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';

export default function CustomizedInputBase({ onSearch = () => { } }) {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query == "") return;
    onSearch(query);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxSizing: "border-box",
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 0 12px rgba(255,255,255,0.25)',
          },
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: 'var(--color-text, #fff)',
            fontSize: '0.95rem',
            '::placeholder': {
              color: 'rgba(255,255,255,0.6)',
              opacity: 1,
            },
          }}
          placeholder="Buscar artículo..."
          inputProps={{ 'aria-label': 'buscar artículo' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon sx={{ color: 'var(--color-accent-60, #90caf9)' }} />
        </IconButton>
      </Paper>
    </Box>
  );
}
