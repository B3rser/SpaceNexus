import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HubIcon from '@mui/icons-material/Hub';
import SearchIcon from '@mui/icons-material/Search';
import { Carousel } from '../Carousel';
import { Box } from '@mui/material';
import { FloatingBtn } from '../FloatingBtn';

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Home";
    });

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
                <FloatingBtn
                    onClick={() => navigate('/SemanticSearch')}
                    bgColor="var(--color-secondary)"
                    color='var(--color-text)'
                    hoverColor="var(--color-secondary-40)"
                    tooltipTitle="Semantic Search"
                >
                    <SearchIcon />
                </FloatingBtn>
                <FloatingBtn
                    onClick={() => navigate('/KnowledgeGalaxy')}
                    bgColor="var(--color-accent)"
                    color='var(--color-text)'
                    hoverColor="var(--color-accent-40)"
                    tooltipTitle="Knowledge Galaxy"
                >
                    <HubIcon />
                </FloatingBtn>
            </Box>

            <Box>
                <Carousel title="Recent" />
                <Carousel title="More Relationships" />
            </Box>
        </Box>
    );
}