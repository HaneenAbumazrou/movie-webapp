import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';// Replace with your API base URL

// Get all products
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllMovies,
  getMovieById,
};