
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, CircularProgress, Paper, Button, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { useUser } from '../../context/UserContext';

import { getArticleById } from '../../services/articles.service';
import ChatBotDrawer from '../ChatBot';

import DescriptionIcon from '@mui/icons-material/Description'; // Paper Completo
import LinkIcon from '@mui/icons-material/Link'; // Papers Relacionados
import ChatIcon from '@mui/icons-material/Chat';
import { NavigateMenu } from '../NavigateMenu';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Cambiar con el contexto
  const { role } = useUser();
  const [sectionsContent, setSectionsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [showAllAuthors, setShowAllAuthors] = React.useState(false);
  const [showAllLabels, setShowAllLabels] = React.useState(false);

  useEffect(() => {
    document.title = "Article";
  });

  useEffect(() => {
    if (!articleId || !role) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleById(articleId, role);
        setArticle(data);
        console.log(data)
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

  const handleChatBot = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(prev => !prev);
  };


  if (loading) {
    return (
      <Box sx={{ width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Usamos el color primario del rol para el cargador */}
        <CircularProgress sx={{ color: (THEME_STYLES[role] || {}).primaryColor || 'secondary.main' }} />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>Cargando resumen...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!article) {
    return null;
  }
  const maxAuthors = 3;
  const maxLabels = 3;

  const visibleAuthors = showAllAuthors ? article.authors : article.authors.slice(0, maxAuthors);
  const visibleLabels = showAllLabels ? article.labels : article.labels.slice(0, maxLabels);

  const hasMoreAuthors = article.authors.length > maxAuthors;
  const hasMoreLabels = article.labels.length > maxLabels;


  if (error || !article) {
    return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error || "Artículo no encontrado."}</Box>;
  }

  // const sections = ROLE_SECTIONS[role] || [];
  const theme = THEME_STYLES[role] || {};

  const availableSections = ['abstract', 'key_points', 'impact_and_application', 'risks_and_mitigation', 'results_and_conclusions'];
  const sections = availableSections.filter(key => article.hasOwnProperty(key));
  const sectionTitles = {
    'abstract': 'Abstract', 'key_points': 'Key Points',
    'results_and_conclusions': 'Results and Conclusions', 'impact_and_application': 'Impact and Application',
    'risks_and_mitigation': 'Risks and Mitigation'
  };
  console.log('articulo', article);

  return (
    <div style={{ minHeight: '100vh' }}>
      <NavigateMenu open={isMenuOpen} onClick={handleOpenMenu} />
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
            right: 'calc((100vw - 120vw) / 2 - 80px)',
            top: '30%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 9999,
          }}
        >
          {/* Paper Completo */}
          <Button
            variant="contained"
            href={article.url}
            target="_blank"
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              minWidth: 0,
              background: theme.primaryColor,
              color: '#fff',
              boxShadow: theme.boxShadow,
              '&:hover': { transform: 'scale(1.1)', background: theme.secondaryColor },
            }}
          >
            <DescriptionIcon />
          </Button>

          {/* Papers Relacionados */}
          <Button
            variant="outlined"
            onClick={handleRelatedPapersClick}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              minWidth: 0,
              color: theme.primaryColor,
              borderColor: theme.primaryColor,
              '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'scale(1.1)' },
            }}
          >
            <LinkIcon />
          </Button>

          {/* ChatBot */}
          <Button
            variant="outlined"
            onClick={handleChatBot}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              minWidth: 0,
              color: theme.primaryColor,
              borderColor: theme.primaryColor,
              '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'scale(1.1)' },
            }}
          >
            <ChatIcon />
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, p: 4 }}>
          {/* --- Encabezado y Metadatos --- */}
          <Box
            sx={{
              mb: 4, // más espacio debajo del bloque
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5, // separación entre título y autores
            }}
          >
            {/* --- Título del artículo --- */}
            <Typography
              variant="h4"
              sx={{
                color: theme.primaryColor,
                fontWeight: 700,
                letterSpacing: '0.5px',
                lineHeight: 1.3,
                fontSize: '1.9rem',
              }}
            >
              {article.title}
            </Typography>

            {/* --- Autores y año --- */}
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.color,
                fontSize: '1rem',
                lineHeight: 1.7,
              }}
            >
              <Box component="span" sx={{ fontWeight: 600, color: theme.secondaryColor }}>
                Authors:
              </Box>{' '}
              <strong>{visibleAuthors.join(', ')}</strong>
              {hasMoreAuthors && (
                <>
                  {!showAllAuthors && '... '}
                  <Button
                    variant="text"
                    onClick={() => setShowAllAuthors(!showAllAuthors)}
                    sx={{
                      color: theme.primaryColor,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      ml: 1,
                      fontSize: '0.9rem',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {showAllAuthors ? 'show less' : 'show more'}
                  </Button>
                </>
              )}
              <Box
                component="span"
                sx={{
                  ml: 2,
                  color: theme.secondaryColor,
                  fontWeight: 600,
                }}
              >
                | Year:
              </Box>{' '}
              <strong>{article.year}</strong>
            </Typography>
          </Box>


          {/* --- Etiquetas temáticas --- */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {visibleLabels.map((tag, i) => (
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
            {hasMoreLabels && (
              <Button
                variant="text"
                onClick={() => setShowAllLabels(!showAllLabels)}
                sx={{
                  color: theme.primaryColor,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {showAllLabels ? 'show less' : 'show more'}
              </Button>
            )}
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

            {/* 🔹 ChatBot lateral */}
            <ChatBotDrawer
              open={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              role={role}
              theme={theme}
              articleContent={article}
            />
          </RolePaper>
        </Box>

      </Box>
    </div>
  );
}