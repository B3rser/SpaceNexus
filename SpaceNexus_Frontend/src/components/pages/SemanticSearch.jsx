
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import CustomizedInputBase from '../CustomizedInputBase';
import { ArticlesGrid } from '../ArticleGrid';
import { ArticleCard } from '../ArticleCard';
import { semanticSearch } from '../../services/search.service';
import { getArticlesByIds } from '../../services/articles.service';
import { NavigateMenu } from '../NavigateMenu';


export default function SemanticSearch() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.title = "Semantic Search";
    }, []);

    const handleSearch = async (term) => {
        const query = term.trim();
        setHasSearched(true);

        if (!query) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const fullArticles = await semanticSearch(query);

            console.log("Artículos completos recibidos directamente:", fullArticles);

            setSearchResults(fullArticles || []);

        } catch (error) {
            console.error("Error en la búsqueda semántica:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };


    const handleOpenGraph = (nodeId) => {
        navigate(`/knowledgeGraph/${nodeId}`);
    };

    const hasResults = searchResults.length > 0;
    
    const handleOpenMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <Box sx={{ position: "relative", maxWidth: '100vw', padding: 2 }}>
            <NavigateMenu open={isMenuOpen} onClick={handleOpenMenu} />

            <Typography variant="h3" sx={{ color: 'var(--color-text)', textAlign: 'center', mb: 3 }}>
                Semantic Search
            </Typography>

            <CustomizedInputBase onSearch={handleSearch} />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, width: "100%" }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && hasResults && (
                <Grid container spacing={3} sx={{ p: 2, mt: 2 }}>
                    {searchResults.map((article) => (
                        <ArticleCard node={article} id={article.id} title={article.title} />
                    ))}
                </Grid>
            )}

            {!loading && !hasResults && (
                <Box sx={{ width: '80vw', margin: '16px auto', opacity: 0.6, textAlign: 'center', color: 'var(--color-text)' }}>
                    {hasSearched ? "No se encontraron resultados para tu búsqueda." : "Ingresa un término para comenzar la búsqueda."}
                </Box>
            )}
        </Box>
    );
}