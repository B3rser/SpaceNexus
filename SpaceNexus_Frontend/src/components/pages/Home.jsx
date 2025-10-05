import React, { useState, useEffect } from 'react';
import { Carousel } from '../Carousel';
import { Box, CircularProgress } from '@mui/material';
import { getRecentArticles, getTopWeightArticles } from '../../services/articles.service';
import { NavigateMenu } from '../NavigateMenu';


export function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.title = "Home";
    });

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


    const handleOpenMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error}</Box>;
    }
    return (
        <Box sx={{ width: "100%", position: 'relative', boxSizing: 'border-box', p: 2 }}>
            <NavigateMenu open={isMenuOpen} onClick={handleOpenMenu} />

            <Box>
                <Carousel title="Recent" items={recentArticles} />
                <Carousel title="More Relationships" items={topWeightArticles} />
            </Box>
        </Box>
    );
}