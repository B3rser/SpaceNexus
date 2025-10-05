import apiClient from './apiClient';

export const semanticSearch = async (queryText) => {
  const response = await apiClient.post('/search/semantic', { query: queryText });
  return response.data;
};