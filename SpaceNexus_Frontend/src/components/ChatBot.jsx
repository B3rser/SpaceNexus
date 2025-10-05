import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatBotDrawer({ open, onClose, role, theme }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `👋 Hola, soy tu asistente ${role}. ¿Sobre qué parte del artículo te gustaría conversar?` },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];

    const simulatedResponse = {
      sender: 'bot',
      text: `Procesando tu pregunta sobre "${input}"... 🚀\n\n[${role}] Aquí vendría la respuesta del modelo.`,
    };

    setMessages([...newMessages, simulatedResponse]);
    setInput('');
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
      {/* Encabezado */}
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
          ChatBot {role}
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
                msg.sender === 'user' ? theme.secondaryColor : 'rgba(255,255,255,0.1)',
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
      </Box>

      <Divider />

      {/* Caja de texto y botón enviar */}
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          sx={{
            backgroundColor: theme.primaryColor,
            '&:hover': { backgroundColor: theme.secondaryColor },
          }}
        >
          Enviar
        </Button>
      </Box>
    </Drawer>
  );
}
