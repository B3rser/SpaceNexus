import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const API_BASE_URL = 'http://127.0.0.1:8000'; 
const CHATBOT_ENDPOINT = `${API_BASE_URL}/answer`;

/**
 * ChatBotDrawer ahora recibe `articleContent` como prop.
 * * @param {object} props
 * @param {string} props.articleContent 
 * @param {boolean} props.open 
 * @param {function} props.onClose 
 * @param {string} props.role 
 * @param {object} props.theme 
 */

export default function ChatBotDrawer({ open, onClose, role, theme, articleContent }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `👋 Hola, soy tu asistente ${role}. ¿Sobre qué parte del artículo te gustaría conversar?` },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  // Función de envío ahora asíncrona para la llamada al API
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuestion = input.trim();
    const newUserMessage = { sender: 'user', text: userQuestion };
    
    // 1. Agregar el mensaje del usuario y el indicador de carga
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // El backend espera un JSON con la data del artículo y la pregunta
      const requestBody = {
        json_data: articleContent, 
        question: userQuestion,
      };

      const response = await fetch(CHATBOT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error de servidor: ${response.status}`);
      }

      const data = await response.json();
      
      const botResponse = {
        sender: 'bot',
        text: data.answer || "No se pudo obtener una respuesta válida del LLM.", 
      };

      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error("Error al conectar con el chatbot:", error.message);
      const errorMessage = { 
        sender: 'bot', 
        text: `❌ Error de conexión: No se pudo obtener la respuesta. (${error.message})`,
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };


  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          background: theme.gradient || '#1A2238',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: `3px solid ${theme.primaryColor}`,
        },
      }}
    >
      {/* Encabezado (sin cambios) */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: `1px solid ${theme.secondaryColor}`,
        }}
      >
        <Typography variant="h6" sx={{ color: theme.primaryColor, fontWeight: 'bold' }}>
          ChatBot {role.charAt(0).toUpperCase() + role.slice(1)}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Contenido del chat */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Paper
            key={index}
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor:
                msg.sender === 'user' ? theme.secondaryColor : (msg.isError ? '#D32F2F' : 'rgba(255,255,255,0.1)'), // Color para errores
              color: '#fff',
              p: 1.5,
              maxWidth: '80%',
              borderRadius:
                msg.sender === 'user'
                  ? '12px 12px 0px 12px'
                  : '12px 12px 12px 0px',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </Paper>
        ))}
        
        {/* Indicador de carga del bot */}
        {isLoading && (
            <Box sx={{ alignSelf: 'flex-start', p: 1.5 }}>
                <CircularProgress size={20} sx={{ color: theme.primaryColor }} />
            </Box>
        )}

        <div ref={messagesEndRef} /> {/* Referencia para el scroll */}
      </Box>

      <Divider />

      {/* Caja de texto y botón enviar */}
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={isLoading ? "Esperando respuesta..." : "Escribe tu pregunta..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Manejar Enter
          disabled={isLoading} // Deshabilitar mientras carga
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isLoading || !input.trim()} // Deshabilitar si carga o si está vacío
          sx={{
            backgroundColor: theme.primaryColor,
            '&:hover': { backgroundColor: theme.secondaryColor },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
        </Button>
      </Box>
    </Drawer>
  );
}
