import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArticleCard } from './ArticleCard';

export function Carousel({ title, items = [] }) {

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
                    <Box
                        key={item.id}
                        sx={{ flex: '0 0 auto', minWidth: '250px', maxWidth: '280px' }}
                    >
                        <ArticleCard
                            id={item.id}
                            title={item.title}
                            tags={item.labels}
                            nodeId={item.id}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
