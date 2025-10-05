import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HubIcon from '@mui/icons-material/Hub';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { FloatingBtn } from './FloatingBtn';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

export function NavigateMenu({ open, onClick }) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                zIndex: 10,
            }}
        >
            <FloatingBtn
                bgColor="var(--color-secondary)"
                color="var(--color-text)"
                hoverColor="var(--color-secondary-40)"
                tooltipTitle={open ? "Close Menu" : "Open Menu"}
                onClick={onClick}
            >
                <motion.div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
            </FloatingBtn>

            <AnimatePresence>
                {open && (
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
    )
}
