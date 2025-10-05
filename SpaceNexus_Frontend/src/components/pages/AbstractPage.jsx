
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, CircularProgress, Paper, Button, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { useUser } from '../../context/UserContext';

import { getArticleById } from '../../services/articles.service';

// Paletas temáticas y estilos más audaces
const THEME_STYLES = {
  scientific: {
    primaryColor: '#6b9ac4',
    secondaryColor: '#c86fc9',
    gradient: 'linear-gradient(135deg, #1C2331 0%, #0A1929 100%)',
    icon: '🧪',
    color: '#E0F7FA',
    boxShadow: '0 8px 30px rgba(0, 188, 212, 0.4)',
  },

  investor: {
    primaryColor: '#c86fc9',
    secondaryColor: '#ff9800',
    gradient: 'linear-gradient(135deg, #312031 0%, #4B2142 100%)',
    icon: '💰',
    color: '#FFFDE7',
    boxShadow: '0 8px 30px rgba(255, 3, 230, 0.4)',
  },

  astronaut: {
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
  scientific: ['Abstract', 'Datos Clave', 'Resultados', 'Conclusión'],
  investor: ['Abstract', 'Impacto y Aplicación', 'Resultados', 'Conclusión'],
  astronaut: ['Abstract', 'Riesgos y Mitigación', 'Resultados', 'Conclusión'],
};


export default function ArticleView() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  //Cambiar con el contexto
  const { role } = useUser();
  const [sectionsContent, setSectionsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    document.title = "Articles";
  });

  useEffect(() => {
    if (!articleId || !role) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleById(articleId, role);
        setArticle(data);
        setError(null);
      } catch (err) {
        setError('No se pudo encontrar o cargar el artículo.');
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    console.log(article)
  }, [articleId, role]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRelatedPapersClick = () => {
    if (article) {
      navigate(`/knowledgeGalaxy/${article.id}`);
    }
  };

  if (loading) {
    // ... Carga (mantener tal cual)
    return (
      <Box sx={{ width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Usamos el color primario del rol para el cargador */}
        <CircularProgress sx={{ color: (THEME_STYLES[role] || {}).primaryColor || 'secondary.main' }} />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>Cargando resumen...</Typography>
      </Box>
    );
  }

  if (error || !article) {
    return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error || "Artículo no encontrado."}</Box>;
  }

  // const sections = ROLE_SECTIONS[role] || [];
  const theme = THEME_STYLES[role] || {};

  const availableSections = ['abstract', 'key_points', 'impact_and_application', 'risks_and_mitigation', 'results_and_conclusions'];
  const sections = availableSections.filter(key => article.hasOwnProperty(key));
  const sectionTitles = {
    'abstract': 'Abstract', 'key_points': 'Datos Clave',
    'results_and_conclusions': 'Resultados y Conclusiones', 'impact_and_application': 'Impacto y Aplicación',
    'risks_and_mitigation': 'Riesgos y Mitigación'
  };

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
            onClick={handleRelatedPapersClick}
          >
            Papers Relacionados
          </Button>
        </Box>

        {/* Contenido principal */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          {/* --- Encabezado y Metadatos --- */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ color: theme.primaryColor, fontWeight: 'bold' }}>
              {article.title}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.color }}>
              Autores: <strong>{article.authors.join(', ')}</strong> | Año: <strong>{article.year}</strong>
            </Typography>
          </Box>

          {/* Etiquetas temáticas */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {article.labels.map((tag, i) => (
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
            {sections.map((sectionKey) => (
              <Tab
                key={sectionKey}
                label={sectionTitles[sectionKey]}
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
          <RolePaper role={role} elevation={10}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: theme.primaryColor,
                borderBottom: `1px solid ${theme.secondaryColor}`,
                paddingBottom: '10px',
              }}
            >
              {sectionTitles[sections[selectedTab]]}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
            >
              {article[sections[selectedTab]]}
            </Typography>
          </RolePaper>
        </Box>
      </Box>
    </div>
  );
}