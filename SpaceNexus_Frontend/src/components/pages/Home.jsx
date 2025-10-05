import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HubIcon from '@mui/icons-material/Hub';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { Carousel } from '../Carousel';
import { Box, CircularProgress } from '@mui/material';
import { FloatingBtn } from '../FloatingBtn';
import { getRecentArticles, getTopWeightArticles } from '../../services/articles.service';

const menuVariants = {
    open: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 100, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};


export function Home() {
    const navigate = useNavigate();
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

    const handleNavigateToSemanticSearch = () => {
        navigate('/semanticSearch');
    };

    const handleNavigateToGraph = () => {
        navigate('/knowledgeGalaxy');
    };

    const handleNavigateToWelcome = () => {
        navigate('/welcome');
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error}</Box>;
    }
    return (
        <Box sx={{ width: "100%", position: 'relative', boxSizing: 'border-box', p: 2 }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <FloatingBtn
                    bgColor="var(--color-secondary)"
                    color="var(--color-text)"
                    hoverColor="var(--color-secondary-40)"
                    tooltipTitle={isMenuOpen ? "Close Menu" : "Open Menu"}
                    onClick={handleOpenMenu}
                >
                    <motion.div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                        }}
                        animate={{ rotate: isMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </motion.div>
                </FloatingBtn>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}
                        >
                            <motion.div variants={itemVariants}>
                                <FloatingBtn
                                    bgColor="var(--color-accent)"
                                    color='var(--color-text)'
                                    hoverColor="var(--color-accent-40)"
                                    tooltipTitle="Semantic Search"
                                    onClick={() => navigate('/semanticSearch')}
                                >
                                    <SearchIcon />
                                </FloatingBtn>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FloatingBtn
                                    bgColor="var(--color-accent)"
                                    color='var(--color-text)'
                                    hoverColor="var(--color-accent-40)"
                                    tooltipTitle="Knowledge Galaxy"
                                    onClick={() => navigate('/knowledgeGalaxy')}
                                >
                                    <HubIcon />
                                </FloatingBtn>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FloatingBtn
                                    bgColor="var(--color-accent)"
                                    color='var(--color-text)'
                                    hoverColor="var(--color-accent-40)"
                                    tooltipTitle="Change role"
                                    onClick={() => navigate('/welcome')}
                                >
                                    <PeopleIcon />
                                </FloatingBtn>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            <Box>
                <Carousel title="Recent" items={recentArticles} />
                <Carousel title="More Relationships" items={topWeightArticles} />
            </Box>
        </Box>
    );
}