import axios from 'axios';

axios.defaults.withCredentials = true;

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to create a post
export const createPost = async (post) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post, { withCredentials: true });
  return response.data;
};

// Function to fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`, { withCredentials: true });
  return response.data;
};

// Function to fetch one post
export const fetchPost = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`, { withCredentials: true });
  return response.data;
};

// Function to update a post
export const updatePost = async ({ id, updatedPost }) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost, {
    withCredentials: true,
  });
  return response.data;
};

// Function to delete a post
export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, { withCredentials: true });
  return response.data;
};

export const registerUser = async ({ email, password }) => {
  const response = await axios.post(
    `${API_BASE_URL}/register`,
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    { email, password },
    { withCredentials: true },
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
  return response.data;
};

// The apiService constant is an object that aggregates all API functions for a single default import, providing a convenient way to access multiple API operations through one imported module. May not need if I continue to use React Query
const apiService = {
  fetchPosts,
  updatePost,
  deletePost,
  createPost,
};

export default apiService;
