
import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, CircularProgress, Paper, Button, Chip } from '@mui/material';
import { styled } from '@mui/system';


const THEME_STYLES = {
  Cientifico: {
    primaryColor: '#6b9ac4',
    secondaryColor: '#c86fc9',
    gradient: 'linear-gradient(135deg, #1C2331 0%, #0A1929 100%)', 
    icon: '🧪',
    color: '#E0F7FA', 
    boxShadow: '0 8px 30px rgba(0, 188, 212, 0.4)', 
  },

  Inversor: {
    primaryColor: '#c86fc9', 
    secondaryColor: '#ff9800', 
    gradient: 'linear-gradient(135deg, #312031 0%, #4B2142 100%)', 
    icon: '💰', 
    color: '#FFFDE7', 
    boxShadow: '0 8px 30px rgba(255, 3, 230, 0.4)',
  },
  
  Astronauta: {
    primaryColor: '#bbdefb', 
    secondaryColor: '#ff5722',
    gradient: 'linear-gradient(135deg, #000000 0%, #151B54 100%)', 
    icon: '🛰️',
    color: '#E3F2FD',
    boxShadow: '0 8px 30px rgba(187, 222, 251, 0.4)',
  },
};

const RolePaper = styled(Paper)(({ role }) => {
  const theme = THEME_STYLES[role] || {};
  return {
    width: '85%',
    minHeight: '65vh',
    padding: '40px',
    margin: 'auto',
    background: theme.gradient,
    color: theme.color,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    borderRadius: '20px',
    boxShadow: theme.boxShadow,
    transition: 'all 0.3s ease-in-out',
    border: `2px solid ${theme.primaryColor}`,
  };
});

const ROLE_SECTIONS = {
  Cientifico: ['Abstract', 'Datos Clave', 'Resultados', 'Conclusión'],
  Inversor: ['Abstract', 'Impacto y Aplicación', 'Resultados', 'Conclusión'],
  Astronauta: ['Abstract', 'Riesgos y Mitigación', 'Resultados', 'Conclusión'],
};

const MOCK_SUMMARY = {
  Abstract: 'Resumen general adaptado al rol, lenguaje distinto según el rol.',
  'Datos Clave': 'Datos científicos clave y relevantes para análisis técnico.',
  Resultados: 'Resultados cuantitativos y cualitativos del artículo.',
  Conclusiones: 'Síntesis y reflexiones finales desde la perspectiva científica.',
  'Impacto y Aplicación': 'Potencial de inversión y aplicaciones prácticas inmediatas.',
  'Riesgos y Mitigación': 'Riesgos detectados y estrategias de mitigación espacial.',
  Conclusión: 'Cierre resumido con tono adaptado al rol.',
  Etiquetas: ['Biologia', 'Fisica', 'Espacio', 'Investigacion', 'Marte']
};

export default function ArticleView({ rol, nombre }) {
  const [sectionsContent, setSectionsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  // Lógica de carga... (mantener tal cual)
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = ROLE_SECTIONS[rol] || [];
      const data = {};
      sections.forEach((sec) => {
        data[sec] = MOCK_SUMMARY[sec] || 'No hay información disponible.';
      });
      setSectionsContent(data);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [rol]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    // ... Carga (mantener tal cual)
    return (
      <Box sx={{ width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Usamos el color primario del rol para el cargador */}
        <CircularProgress sx={{ color: (THEME_STYLES[rol] || {}).primaryColor || 'secondary.main' }} />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>Cargando resumen...</Typography>
      </Box>
    );
  }

  const sections = ROLE_SECTIONS[rol] || [];
  const theme = THEME_STYLES[rol] || {};

  return (
    <div style={{ minHeight: '100vh' }}>
      <Box
        sx={{
          width: '120vh',              
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F1624',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          transition: 'none',          
          flexShrink: 0,              
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            right: 'calc((100vw - 120vw) / 2 - 120px)', 
            top: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            href="https://www.google.com"
            target="_blank"
            sx={{
              background: theme.primaryColor,
              color: '#fff',
              fontWeight: 'bold',
              boxShadow: theme.boxShadow,
              '&:hover': { transform: 'scale(1.05)', background: theme.secondaryColor },
            }}
          >
            Paper Completo
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: theme.primaryColor,
              borderColor: theme.primaryColor,
              fontWeight: 'bold',
              '&:hover': { background: 'rgba(255,255,255,0.1)' },
            }}
          >
            Papers Relacionados
          </Button>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          {/* --- Encabezado y Metadatos --- */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ color: theme.primaryColor, fontWeight: 'bold' }}>
              {nombre}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.color }}>
              Autores: <strong>{MOCK_SUMMARY.autores}</strong> | Año: <strong>{MOCK_SUMMARY.año}</strong>
            </Typography>
          </Box>

          {/* Etiquetas temáticas */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {MOCK_SUMMARY.Etiquetas.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                sx={{
                  backgroundColor: theme.secondaryColor,
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: theme.primaryColor,
                    transform: 'scale(1.1)',
                  },
                }}
              />
            ))}
          </Box>

          {/* --- Pestañas de Navegación --- */}
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: `2px solid ${theme.secondaryColor}`,
              mb: 3,
              '& .MuiTabs-indicator': { backgroundColor: theme.primaryColor, height: '4px' },
            }}
          >
            {sections.map((section, idx) => (
              <Tab
                key={idx}
                label={section}
                sx={{
                  color: theme.color,
                  '&.Mui-selected': {
                    color: theme.primaryColor,
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                }}
              />
            ))}
          </Tabs>


          {/* --- Contenido del Paper --- */}
          <RolePaper role={rol} elevation={10}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.secondaryColor}`,
                paddingBottom: '10px',
              }}
            >
              {sections[selectedTab]}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
            >
              {sectionsContent[sections[selectedTab]]}
            </Typography>
          </RolePaper>
        </Box>
      </Box>
    </div>
  );
}