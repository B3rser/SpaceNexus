import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export function Carousel({ title, items = [] }) {
    const navigate = useNavigate();

    const handleCardClick = (articleId) => {
        navigate(`/article/${articleId}`);
    };

    return (
        <Box sx={{ mb: 4, p: 2 }}>
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    color: 'var(--color-text)',
                    mb: 2,
                    textAlign: 'left'
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
                {items.map((item) => (
                    <Paper
                        key={item.id}
                        elevation={3}
                        onClick={() => handleCardClick(item.id)}
                        sx={{
                            minWidth: '250px',
                            height: '280px',
                            backgroundColor: 'var(--color-primary)',
                            borderRadius: '12px',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="body1" component="h3" sx={{ color: 'var(--color-text)', fontWeight: 'bold' }}>
                                {item.title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'var(--color-neutral)', mt: 1 }}>
                                {item.year}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                            {/* Usamos .slice(0, 5) para tomar solo las primeras 5 etiquetas */}
                            {item.labels.slice(0, 5).map((label) => (
                                <Chip
                                    key={label}
                                    label={label}
                                    size="medium"
                                    sx={{
                                        backgroundColor: 'var(--color-secondary)',
                                        color: 'var(--color-text)'
                                    }}
                                />
                            ))}
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
