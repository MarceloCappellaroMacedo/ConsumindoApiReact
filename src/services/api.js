import axios from 'axios';

// URL base da API
const API_URL = 'http://sua-api-url/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL
});

// Interceptador para adicionar token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Serviço para influencers
export const influencerService = {
  // Autenticação
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  // Operações com influencers
  getById: async (id) => {
    const response = await api.get(`/influencers/${id}`);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/influencers/${id}`, data);
    return response.data;
  },
  
  // Adicione outros métodos conforme necessário
};

// Serviço com tratamento de erro
export const apiWithErrorHandling = {
  influencer: {
    getById: async (id) => {
      try {
        return await influencerService.getById(id);
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    update: async (id, data) => {
      try {
        return await influencerService.update(id, data);
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    // Mais métodos aqui
  }
};

// Função auxiliar para tratar erros
function handleApiError(error) {
  if (error.response) {
    // O servidor respondeu com um status fora do intervalo 2xx
    console.error('Erro de resposta:', error.response.data);
    console.error('Status:', error.response.status);
    
    // Se for erro de autenticação, redirecionar para login
    if (error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Se estiver usando react-router, você pode redirecionar aqui
    }
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    console.error('Erro de requisição:', error.request);
  } else {
    // Algo aconteceu na configuração da requisição
    console.error('Erro:', error.message);
  }
}

export default api;