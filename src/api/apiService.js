import axios from 'axios';

axios.defaults.withCredentials = true;

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Function to fetch one post
export const fetchPost = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`, { withCredentials: true });
  return response.data;
};

// Function to update a post
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Function to delete a post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// The apiService constant is an object that aggregates all API functions for a single default import, providing a convenient way to access multiple API operations through one imported module. May not need if I continue to use React Query
const apiService = {
  fetchPosts,
  updatePost,
  deletePost,
};

export default apiService;
