import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/categories'; // adjust base URL as necessary

// Fetch all categories
export const getAllCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
};

// Create a new category
export const createCategory = async (categoryData: { name: string }) => {
    const response = await axios.post(`${API_BASE_URL}`, categoryData);
    return response.data;
};

// Delete a category by ID
export const deleteCategory = async (categoryId: number) => {
    await axios.delete(`${API_BASE_URL}/${categoryId}`);
};