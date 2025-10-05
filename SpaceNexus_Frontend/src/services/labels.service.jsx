import apiClient from './apiClient';

export const getAllLabels = async () => {
  const response = await apiClient.get('/labels/');
  return response.data;
};