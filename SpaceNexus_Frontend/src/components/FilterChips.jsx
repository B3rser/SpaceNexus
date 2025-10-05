import * as React from 'react';
import Stack from '@mui/material/Stack';
import SelectableChip from './SelectableChip';

export default function FilterChips({ chips = [], selected = [], onChangeSelected }) {
  const [sel, setSel] = React.useState(selected);

  React.useEffect(() => setSel(selected), [selected]);

  const toggle = (label, willSelect) => {
    setSel(prev => {
      let next = willSelect
        ? (prev.includes(label) ? prev : [...prev, label])
        : prev.filter(l => l !== label);
      onChangeSelected?.(next);
      return next;
    });
  };


  const display = React.useMemo(() => {
    const selectedSet = new Set(sel);
    const unselected = chips.filter(c => !selectedSet.has(c));
    return [...sel, ...unselected];
  }, [chips, sel]);

  return (
    <Stack direction="row" useFlexGap flexWrap="wrap" gap={1} sx={{position:'relative'}}>
      {display.map((label) => (
        <SelectableChip
          key={label}
          label={label}
          selected={sel.includes(label)}
          onToggle={toggle}
        />
      ))}
    </Stack>
  );
}
