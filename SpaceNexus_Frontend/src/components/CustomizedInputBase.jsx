import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", bgcolor: 'var(--color-white)', borderRadius: '50px' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <FilterListIcon sx={{color: 'var(--color-accent-60)'}}/>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Article"
        inputProps={{ 'aria-label': 'search article' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon sx={{color: 'var(--color-accent-60)'}}/>
      </IconButton>
    </Paper>
  );
}