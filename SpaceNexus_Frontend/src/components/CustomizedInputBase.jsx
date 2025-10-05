import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Collapse from '@mui/material/Collapse';
import FilterChips from './FilterChips';

export default function CustomizedInputBase({ onSearch, FilterComponent, chips = [] }) {
  const [query, setQuery] = React.useState('');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [selectedChips, setSelectedChips] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    if (onSearch) onSearch(q);
    else console.log('Buscar:', q); 
  };

  const handleToggleFilters = () => setFiltersOpen((v) => !v);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '80vw',
          bgcolor: 'var(--color-white)',
          borderRadius: '50px',
          position:"relative" 
        }}
      >
        <IconButton
          sx={{ p: '10px' }}
          aria-label="filter"
          onClick={handleToggleFilters}
        >
          <FilterListIcon sx={{ color: 'var(--color-accent-60)' }} />
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Article"
          inputProps={{ 'aria-label': 'search article' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* La lupa envía el formulario */}
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon sx={{ color: 'var(--color-accent-60)' }} />
        </IconButton>
      </Paper>

      {/* Panel de filtros plegable */}
      <Collapse in={filtersOpen} unmountOnExit sx={{position:'relative'}}>
        {FilterComponent ? (
          <FilterComponent
            onClose={() => setFiltersOpen(false)}
            selectedChips={selectedChips}
            onChangeSelected={setSelectedChips}
          />
        ) : (
          <Paper elevation={0} sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: 'var(--color-white)', width: '78vw', mx: 'auto' }}>
            <strong>Filtrar por etiquetas</strong>
            <Box sx={{ mt: 1 }}>
              <FilterChips
                chips={chips}
                selected={selectedChips}
                onChangeSelected={setSelectedChips}
              />
            </Box>
          </Paper>
        )}
      </Collapse>
    </Box>
  );
}
