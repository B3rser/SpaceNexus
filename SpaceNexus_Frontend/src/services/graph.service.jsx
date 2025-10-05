import apiClient from './apiClient';

export const getGraphStats = async () => {
  const response = await apiClient.get('/graph/stats');
  return response.data;
};

export const getFullGraph = async () => {
  const response = await apiClient.get('/graph/sample');
  return response.data;
};

export const filterNodesByLabels = async (labels) => {
  const params = new URLSearchParams();
  labels.forEach(label => params.append("labels", label));
  const response = await apiClient.get(`/graph/nodes/?${params.toString()}`);
  return response.data;
};

export const getNodeSubgraph = async (nodeId) => {
  const response = await apiClient.get(`/graph/node/${nodeId}`);
  return response.data;
};