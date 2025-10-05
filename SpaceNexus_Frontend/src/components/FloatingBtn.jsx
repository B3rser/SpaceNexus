import { Fab, Tooltip } from '@mui/material'
import React from 'react'

export function FloatingBtn({ onClick, tooltipTitle, children, bgColor, color, hoverColor }) {
    return (
        <Tooltip title={tooltipTitle} placement="left" arrow>
            <Fab
                sx={{
                    bgcolor: bgColor,
                    color: color,
                    '&:hover': {
                        bgcolor: hoverColor,
                    },
                }}
                aria-label={tooltipTitle} 
                onClick={onClick}
            >
                {children}
            </Fab>
        </Tooltip>
    )
}