import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

export function InfoNode({ selectedNode = null, onRelationClick, onTagClick }) {
    if (!selectedNode) {
        return null;
    }

    return (
        <Card
            sx={{
                position: 'absolute',
                zIndex: 1000,
                top: 20,
                right: 20,
                width: 280,
                borderRadius: '15px',
                boxShadow: '0 2px 10px var(--shadow-10)',
                bgcolor: 'var(--color-primary-40)',
                border: '2px solid var(--color-primary)',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                    {selectedNode.id}
                </Typography>

                {selectedNode.links?.length > 0 && (
                    <>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
                            Relaciones:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {selectedNode.links.map((rel, i) => (
                                <Button
                                    key={i}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        borderRadius: "16px",
                                        textTransform: "none",
                                        fontSize: "0.8rem",
                                        padding: "2px 8px",
                                        minHeight: "unset"
                                    }}
                                    onClick={() => onRelationClick?.(rel)}
                                >
                                    {rel}
                                </Button>
                            ))}
                        </Stack>
                    </>
                )}

                {selectedNode.labels?.length > 0 && (
                    <>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                            Etiquetas:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {selectedNode.labels.map((tag, i) => (
                                <Button
                                    key={i}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        borderRadius: "16px",
                                        textTransform: "none",
                                        fontSize: "0.8rem",
                                        padding: "2px 8px",
                                        minHeight: "unset"
                                    }}
                                    onClick={() => onTagClick?.(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Stack>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
