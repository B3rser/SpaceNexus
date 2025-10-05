import apiClient from './apiClient';

export const getArticleById = async (articleId, role) => {
  const response = await apiClient.get(`/articles/${articleId}?role=${role}`);
  return response.data;
};

export const getRecentArticles = async (limit = 10) => {
  const response = await apiClient.get(`/articles/recent/?limit=${limit}`);
  return response.data;
};

export const getTopWeightArticles = async (limit = 10) => {
  const response = await apiClient.get(`/articles/top-weight/?limit=${limit}`);
  return response.data;
};

export const filterArticlesByLabels = async (labels) => {
    const params = new URLSearchParams();
    labels.forEach(label => params.append("labels", label));
    const response = await apiClient.get(`/articles/?${params.toString()}`);
    return response.data;
};