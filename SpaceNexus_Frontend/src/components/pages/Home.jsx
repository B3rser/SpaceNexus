import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HubIcon from '@mui/icons-material/Hub';
import SearchIcon from '@mui/icons-material/Search'
import { Carousel } from '../Carousel';
import { Box, CircularProgress } from '@mui/material';
import { FloatingBtn } from '../FloatingBtn';

import { getRecentArticles, getTopWeightArticles } from '../../services/articles.service';


export function Home() {
    const navigate = useNavigate();
    const [recentArticles, setRecentArticles] = useState([]);
    const [topWeightArticles, setTopWeightArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [recentData, topWeightData] = await Promise.all([
                    getRecentArticles(10),
                    getTopWeightArticles(10)
                ]);

                setRecentArticles(recentData);
                setTopWeightArticles(topWeightData);
                setError(null);
            } catch (err) {
                setError("No se pudieron cargar los artículos. Inténtalo de nuevo más tarde.");
                console.error("Error fetching home page data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNavigateToGraph = () => {
        navigate('/knowledgeGraph');
    };
    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error}</Box>;
    }
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
                <FloatingBtn bgColor="var(--color-secondary)" color='var(--color-text)' hoverColor="var(--color-secondary-40)" tooltipTitle="Ir a Búsqueda Semántica">
                    <SearchIcon />
                </FloatingBtn>
                <FloatingBtn
                    bgColor="var(--color-accent)"
                    color='var(--color-text)'
                    hoverColor="var(--color-accent-40)"
                    tooltipTitle="Ir al Grafo de Conocimiento"
                    onClick={handleNavigateToGraph}
                >
                    <HubIcon />
                </FloatingBtn>
            </Box>

            <Box>
                <Carousel title="Recientes" items={recentArticles} />
                <Carousel title="Más relaciones" items={topWeightArticles} />
            </Box>
        </Box>
    );
}
