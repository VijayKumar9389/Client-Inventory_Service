import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/categories'; // adjust base URL as necessary

// Fetch all categories (can be tool or material categories)
export const getAllCategories = async (type: 'tools' | 'materials') => {
    const response = await axios.get(`${API_BASE_URL}/${type}`);
    return response.data;
};

// Create a new category (can be tool or material categories)
export const createCategory = async (type: 'tools' | 'materials', name: string) => {
    console.log(name)

    const response = await axios.post(`${API_BASE_URL}/${type}`, {name});
    return response.data;
};

// Delete a category by ID (can be tool or material categories)
export const deleteCategory = async (type: 'tools' | 'materials', categoryId: number) => {
    await axios.delete(`${API_BASE_URL}/${type}/${categoryId}`);
};