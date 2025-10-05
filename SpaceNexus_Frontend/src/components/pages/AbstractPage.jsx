
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, CircularProgress, Paper, Button, Chip } from '@mui/material';
import { styled } from '@mui/system';

import { getArticleById } from '../../services/articles.service';

// Paletas temáticas y estilos más audaces
const THEME_STYLES = {
  // 🔬 Científico: Profesional, oscuro, enfocado en el detalle y la precisión.
  cientifico: {
    primaryColor: '#00bcd4', // Cian para tecnología y datos
    secondaryColor: '#f44336', // Rojo de alerta/importancia
    gradient: 'linear-gradient(135deg, #1C2331 0%, #0A1929 100%)', // Fondo oscuro y profundo
    icon: '🧪', // Ícono temático
    color: '#E0F7FA', // Texto claro
    boxShadow: '0 8px 30px rgba(0, 188, 212, 0.4)', // Sombra con acento de color
  },
  // 📈 Inversor: Enérgico, enfocado en el crecimiento y las finanzas.
  inversionista: {
    primaryColor: '#4caf50', // Verde de crecimiento y éxito
    secondaryColor: '#ff9800', // Ámbar de precaución/oportunidad
    gradient: 'linear-gradient(135deg, #1A237E 0%, #295F2D 100%)', // Combinación de azul corporativo y verde
    icon: '💰', // Ícono temático
    color: '#FFFDE7', // Texto cremoso/blanquecino
    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.4)',
  },
  // 🚀 Astronauta: Inspirador, futurista, enfocado en el espacio y la aventura.
  arquitecto_de_mision: {
    primaryColor: '#bbdefb', // Azul claro, espacial
    secondaryColor: '#ff5722', // Naranja espacial/de seguridad
    gradient: 'linear-gradient(135deg, #000000 0%, #151B54 100%)', // Fondo de cielo nocturno a azul oscuro
    icon: '🛰️', // Ícono temático
    color: '#E3F2FD', // Texto azul pálido
    boxShadow: '0 8px 30px rgba(187, 222, 251, 0.4)',
  },
};

const RolePaper = styled(Paper)(({ role }) => {


  const theme = THEME_STYLES[role] || {};
  return {
    width: '85%', // un poco más ancho
    minHeight: '65vh', // altura base
    padding: '40px',
    margin: 'auto', // centra horizontalmente
    background: theme.gradient,
    color: theme.color,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // centra verticalmente el contenido
    alignItems: 'center',
    gap: '20px',
    borderRadius: '20px',
    boxShadow: theme.boxShadow,
    transition: 'all 0.3s ease-in-out',
    border: `2px solid ${theme.primaryColor}`,
  };
});

const ROLE_SECTIONS = {
  cientifico: ['Abstract', 'Datos Clave', 'Resultados', 'Conclusión'],
  inversionista: ['Abstract', 'Impacto y Aplicación', 'Resultados', 'Conclusión'],
  arquitecto_de_mision: ['Abstract', 'Riesgos y Mitigación', 'Resultados', 'Conclusión'],
};


export default function ArticleView() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  //Cambiar con el contexto
  const selectedRole = 'cientifico';
  const [sectionsContent, setSectionsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    document.title = "Articles";
  });

  useEffect(() => {
     if (!articleId) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getArticleById(articleId, selectedRole);
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
  }, [articleId]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

   const handleRelatedPapersClick = () => {
    if (article) {
      navigate(`/knowledgeGraph/${article.id}`);
    }
  };

  if (loading) {
    // ... Carga (mantener tal cual)
    return (
      <Box sx={{ width: '100vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Usamos el color primario del rol para el cargador */}
        <CircularProgress sx={{ color: (THEME_STYLES[selectedRole] || {}).primaryColor || 'secondary.main' }} />
        <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>Cargando resumen...</Typography>
      </Box>
    );
  }

  if (error || !article) {
    return <Box sx={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>{error || "Artículo no encontrado."}</Box>;
  }

  // const sections = ROLE_SECTIONS[selectedRole] || [];
  const theme = THEME_STYLES[selectedRole] || {};

  const availableSections = ['abstract', 'key_points', 'impact_and_application', 'risks_and_mitigation', 'results_and_conclusions'];
  const sections = availableSections.filter(key => article.hasOwnProperty(key));
  const sectionTitles = {
    'abstract': 'Abstract', 'key_points': 'Datos Clave',
    'results_and_conclusions': 'Resultados y Conclusiones', 'impact_and_application': 'Impacto y Aplicación',
    'risks_and_mitigation': 'Riesgos y Mitigación'
  };

  return (
    <Box
      sx={{
        width: '120%', // Mejor usar 100% que 100vw/vh para anidar en un layout
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // Fondo más oscuro para que el RolePaper resalte
        backgroundColor: '#0F1624',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          right: '30px',
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
          onClick={handleRelatedPapersClick}
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
            {theme.icon} {article.title}
          </Typography>
          <Typography variant="h6" sx={{ color: theme.color }}>
            Autores: <strong>{article.authors.join(', ')}</strong> | Año: <strong>{article.year}</strong>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: theme.color }}>
            Vista Personalizada: <strong style={{ color: theme.primaryColor }}>{selectedRole}</strong>
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
        <RolePaper role={selectedRole} elevation={10}>
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
  );
}