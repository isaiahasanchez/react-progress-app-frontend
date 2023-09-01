import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500';

// Function to fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Function to update a post
export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Function to delete a post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Other API functions can be added here

// Export the API service functions
export default {
  fetchPosts,
  updatePost,
  deletePost,
};
