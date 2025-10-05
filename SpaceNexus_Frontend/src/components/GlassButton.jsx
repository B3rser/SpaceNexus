import { Button } from '@mui/material';
import React from 'react'

export function GlassButton({ children, onClick }) {
    return (
        <Button
            variant="text"
            size="small"
            onClick={onClick}
            sx={{
                color: 'var(--color-text, #ffffff)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                textTransform: 'none',
                width: '100%',
                mb: 1.25,
                fontSize: '0.8rem',
                padding: '4px 12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                },
            }}
        >
            {children}
        </Button>
    );
}
