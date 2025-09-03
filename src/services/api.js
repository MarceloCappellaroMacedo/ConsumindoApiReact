import axios from 'axios';

// URL base da API
const API_URL = 'http://localhost:8080/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptor para tratamento de erros
const apiWithErrorHandling = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
apiWithErrorHandling.interceptors.response.use(
  response => response,
  error => {
    // Tratamento de erro personalizado
    if (error.response) {
      // O servidor respondeu com um código de status fora do intervalo 2xx
      console.error("Erro de resposta:", error.response.data);
    } else if (error.request) {
      // A requisição foi feita mas nenhuma resposta foi recebida
      console.error("Erro de requisição:", error.request);
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      console.error("Erro:", error.message);
    }
    return Promise.reject(error);
  }
);

// Serviços para influenciadores
const influencerService = {
  getAll: async () => {
    try {
      const response = await api.get('/influencers');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar influenciadores:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/influencers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar influenciador com ID ${id}:`, error);
      throw error;
    }
  },
  
  create: async (influencer) => {
    try {
      const response = await api.post('/influencers', influencer);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar influenciador:', error);
      throw error;
    }
  },
  
  update: async (id, influencer) => {
    try {
      const response = await api.put(`/influencers/${id}`, influencer);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar influenciador com ID ${id}:`, error);
      throw error;
    }
  },
  
  remove: async (id) => {
    try {
      const response = await api.delete(`/influencers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao excluir influenciador com ID ${id}:`, error);
      throw error;
    }
  }
};

// Funções individuais (mantendo compatibilidade)
export const getAll = async () => {
  return influencerService.getAll();
};

export const getById = async (id) => {
  return influencerService.getById(id);
};

export const create = async (influencer) => {
  return influencerService.create(influencer);
};

export const update = async (id, influencer) => {
  return influencerService.update(id, influencer);
};

export const remove = async (id) => {
  return influencerService.remove(id);
};

// Exportar tudo o que está sendo usado em outros arquivos
export { influencerService, apiWithErrorHandling };
export default api;