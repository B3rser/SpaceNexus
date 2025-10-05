import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function SelectableChip({ label, selected = false, onToggle, size = 'small' }) {
  const handleClick = () => onToggle?.(label, !selected);

  return (
    <Chip
      clickable
      size={size}
      label={label}
      onClick={handleClick}
      variant={selected ? 'filled' : 'outlined'}
      sx={{
        fontWeight: 600,
        ...(selected
          ? {
              bgcolor: 'var(--color-accent-60)',
              color: 'var(--color-white)',
              borderColor: 'transparent',
              '&:hover': { bgcolor: 'var(--color-accent-60)' },
            }
          : {
              color: 'var(--color-accent-60)',
              borderColor: 'var(--color-accent-60)',
            }),
      }}
    />
  );
}
