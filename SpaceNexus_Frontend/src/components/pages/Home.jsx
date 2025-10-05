import React from 'react'
import HubIcon from '@mui/icons-material/Hub';
import SearchIcon from '@mui/icons-material/Search'
import { Carousel } from '../Carousel';
import { Box } from '@mui/material';
import { FloatingBtn } from '../FloatingBtn';

export function Home() {
    return (
        <Box
            sx={{
                width: "100%",
                position: 'relative',
                boxSizing: 'border-box',
                p: 2,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 32,
                    right: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <FloatingBtn bgColor="var(--color-secondary)" color='var(--color-text)' hoverColor="var(--color-secondary-40)" tooltipTitle="ir-a-otra-pagina">
                    <SearchIcon />
                </FloatingBtn>
                <FloatingBtn bgColor="var(--color-accent)" color='var(--color-text)' hoverColor="var(--color-accent-40)" tooltipTitle="">
                    <HubIcon />
                </FloatingBtn>
            </Box>

            <Box>
                <Carousel title="Recientes" />
                <Carousel title="Más relaciones" />
            </Box>
        </Box>
    );
}
