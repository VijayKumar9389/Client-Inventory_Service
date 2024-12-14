import React, { useState, useEffect } from 'react';
import { getAllCategories, createCategory, deleteCategory } from '../services/category.services';
import { FaTrash } from 'react-icons/fa';

interface Category {
    id: number;
    name: string;
}

const CategoryManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [categoryType, setCategoryType] = useState<'tools' | 'materials'>('tools'); // State to toggle between tool and material categories

    // Fetch categories based on type (tools or materials)
    useEffect(() => {
        fetchCategories();
    }, [categoryType]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getAllCategories(categoryType); // Use the general service function
            setCategories(response);
        } catch (err) {
            setError(`Error fetching ${categoryType} categories`);
        } finally {
            setLoading(false);
        }
    };

    // Handle new category creation
    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        try {
            setError(null);
            setLoading(true);
            const createdCategory = await createCategory(categoryType, newCategoryName);
            setCategories((prev) => [...prev, createdCategory]);
            setNewCategoryName('');
            setMessage('Category created successfully');
        } catch (err) {
            setError('Error creating category');
        } finally {
            setLoading(false);
        }
    };

    // Handle category deletion
    const handleDeleteCategory = async (categoryId: number) => {
        try {
            setLoading(true);
            await deleteCategory(categoryType, categoryId );
            setCategories((prev) => prev.filter((category) => category.id !== categoryId));
            setMessage('Category deleted successfully');
        } catch (err) {
            setError('Error deleting category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Category Manager</h1>

            {/* Toggle buttons for tools or materials */}
            <div className="text-center mb-6">
                <button
                    onClick={() => setCategoryType('tools')}
                    className={`px-4 py-2 mr-4 ${categoryType === 'tools' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Tool Categories
                </button>
                <button
                    onClick={() => setCategoryType('materials')}
                    className={`px-4 py-2 ${categoryType === 'materials' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Material Categories
                </button>
            </div>

            {/* Form to create a new category */}
            <form
                onSubmit={handleCreateCategory}
                className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto"
            >
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300 ${
                        loading || !newCategoryName.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading || !newCategoryName.trim()}
                >
                    {loading ? 'Creating...' : 'Create Category'}
                </button>
            </form>

            {/* Display any error or success messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-green-500 text-center">{message}</p>}

            {/* List all categories */}
            <ul className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
                {loading && <li className="text-center">Loading categories...</li>}
                {!loading && categories.length === 0 && (
                    <li className="text-center text-gray-500">No categories available</li>
                )}
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex justify-between items-center py-2 border-b last:border-none"
                    >
                        <span className="text-gray-700">{category.name}</span>
                        <span className="text-gray-700">{category.id}</span>
                        <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-500 hover:text-red-700 transition duration-300"
                            disabled={loading}
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;