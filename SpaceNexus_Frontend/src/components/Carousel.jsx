import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export function Carousel({ title }) {
    return (
        <Box sx={{ mb: 4, p: 2 }}>
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    color: 'var(--color-text)',
                    mb: 2,
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    gap: 2,
                    pb: 2,
                    '&::-webkit-scrollbar': {
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--color-primary-40)',
                        borderRadius: '4px',
                    },
                }}
            >
                {[...Array(8)].map((_, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            minWidth: '200px',
                            height: '280px',
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: '12px',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
