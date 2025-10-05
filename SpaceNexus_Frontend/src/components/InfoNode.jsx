import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from './GlassButton';
import { GlassChip } from './GlassChip';

const MotionCard = motion(Card);

export function InfoNode({ selectedNode = null, onRelationClick }) {
    return (
        <AnimatePresence>
            {selectedNode && (
                <MotionCard
                    key={selectedNode.id}
                    elevation={0}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        zIndex: 10,
                        width: 280,
                        background: 'linear-gradient(135deg, rgba(50, 100, 255, 0.15), rgba(200, 0, 255, 0.15))',
                        backdropFilter: 'blur(100px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 0 25px rgba(120, 200, 255, 0.5)',
                        color: 'var(--color-text, #ffffff)',
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {selectedNode.id}
                        </Typography>

                        {selectedNode.links?.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Relations:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {selectedNode.links.slice(0, 5).map((rel, i) => (
                                        <GlassButton key={i} onClick={() => onRelationClick?.(rel)}>
                                            {rel}
                                        </GlassButton>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {selectedNode.labels?.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    Labels:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {selectedNode.labels.slice(0, 5).map((tag, i) => (
                                        <GlassChip key={i} label={tag} />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </CardContent>
                </MotionCard>
            )}
        </AnimatePresence>
    );
}