
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import CustomizedInputBase from '../CustomizedInputBase';
import { ArticlesGrid } from '../ArticleGrid';

import { semanticSearch } from '../../services/search.service';
import { getArticlesByIds } from '../../services/articles.service';


export default function SemanticSearch() {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (term) => {
        const query = term.trim();
        setHasSearched(true);

        if (!query) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const idResponse = await semanticSearch(query);
            const articleIds = idResponse.results;
            console.log("IDs obtenidos de la búsqueda semántica:", articleIds);
            if (articleIds && articleIds.length > 0) {
                const fullArticles = await getArticlesByIds(articleIds);
                setSearchResults(fullArticles);
            } else {
                setSearchResults([]);
            }

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

    return (
        <Box sx={{ maxWidth: '100vw', padding: 2 }}>
            <Typography variant="h3" sx={{ color: 'var(--color-text)', textAlign: 'center', mb: 3 }}>
                Búsqueda Semántica
            </Typography>

            <CustomizedInputBase onSearch={handleSearch} />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && hasResults && (
                <ArticlesGrid
                    graphResponse={{ nodes: searchResults, links: [] }}
                    onOpenGraph={handleOpenGraph}
                />
            )}

            {!loading && !hasResults && (
                <Box sx={{ width: '80vw', margin: '16px auto', opacity: 0.6, textAlign: 'center', color: 'var(--color-text)' }}>
                    {hasSearched ? "No se encontraron resultados para tu búsqueda." : "Ingresa un término para comenzar la búsqueda."}
                </Box>
            )}
        </Box>
    );
}