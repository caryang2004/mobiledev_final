import axios from "axios";

const API_BASE_URL = "https://675a5ab2099e3090dbe4556e.mockapi.io";

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to fetch all posts
export const getPosts = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Function to fetch a single post by ID
export const getPost = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

// Function to delete a post by ID
export const deletePostApi = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
};
