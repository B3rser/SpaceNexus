import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'Ocurrió un error inesperado.';

    if (error.response) {
      console.error('Error de API:', error.response.data);
      errorMessage = error.response.data.detail || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      console.error('Error de Red:', error.request);
      errorMessage = 'Error de Red: No se pudo conectar con el servidor.';
    } else {
      console.error('Error de Configuración:', error.message);
      errorMessage = `Error: ${error.message}`;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'Ocurrió un error inesperado.';

    if (error.response) {
      console.error('Error de API:', error.response.data);
      errorMessage = error.response.data.detail || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      console.error('Error de Red:', error.request);
      errorMessage = 'Error de Red: No se pudo conectar con el servidor.';
    } else {
      console.error('Error de Configuración:', error.message);
      errorMessage = `Error: ${error.message}`;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default apiClient;