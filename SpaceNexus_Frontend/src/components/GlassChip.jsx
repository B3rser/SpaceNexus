import React from "react";
import { Chip } from "@mui/material";

export function GlassChip({ label }) {
    return (
        <Chip
            label={label}
            sx={{
                color: "var(--color-text, #ffffff)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "15px",
                fontSize: "0.8rem",
                padding: "2px 8px",
                transition: "all 0.3s ease",
                "& .MuiChip-label": {
                    padding: "0 8px",
                },
            }}
        />
    );
}
