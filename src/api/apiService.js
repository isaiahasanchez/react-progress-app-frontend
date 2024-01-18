import axios from 'axios';

axios.defaults.withCredentials = true;

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to create a exercise
export const createExercise = async (exercise) => {
  const response = await axios.post(`${API_BASE_URL}/exercises`, exercise, {
    withCredentials: true,
  });
  return response.data;
};

// Function to fetch all exercises
export const fetchExercises = async () => {
  const response = await axios.get(`${API_BASE_URL}/exercises`, { withCredentials: true });
  return response.data;
};

// Function to fetch one exercise
export const fetchExercise = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/exercises/${id}`, { withCredentials: true });
  return response.data;
};

// Function to update a exercise
export const updateExercise = async ({ id, updatedExercise }) => {
  const response = await axios.put(`${API_BASE_URL}/exercises/${id}`, updatedExercise, {
    withCredentials: true,
  });
  return response.data;
};

// Function to delete a exercise
export const deleteExercise = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/exercises/${id}`, { withCredentials: true });
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
  fetchExercises,
  updateExercise,
  deleteExercise,
  createExercise,
};

export default apiService;
