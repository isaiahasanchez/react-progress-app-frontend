import axios from 'axios';

axios.defaults.withCredentials = true;


export const API_BASE_URL = 'https://progress-exercise-and-rehab-log-app.onrender.com';

//API_BASE_URL_ONLINE 'https://progress-exercise-and-rehab-log-app.onrender.com'

// API_BASE_URL_LOCAL = 'http://localhost:3000'

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

// Function to update a post
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData, { withCredentials: true });
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

const apiService = {
  fetchPosts,
  updatePost,
  deletePost,
};

export default apiService;
