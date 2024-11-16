import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CreateMaterialDTO} from "../../../models/material.models.ts";
import {ErrorMessage} from "../../../components/Message.tsx";
import {FaImage} from "react-icons/fa6";

interface Category {
    id: number;
    name: string;
}

const CreateMaterialForm = () => {
    const initialFormData = {
        name: '',
        costPerUnit: 0,  // Initialize costPerUnit
        categoryId: undefined,
        image: null,   // Updated imageUrl instead of image
    };

    const [formData, setFormData] = useState<CreateMaterialDTO>(initialFormData);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRes = await axios.get('http://localhost:3000/api/categories');
                setCategories(categoryRes.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load form data. Please try again later.');
            }
        };
        fetchCategories();
    }, []);

    // Image preview effect
    useEffect(() => {
        if (selectedImage) {
            const previewUrl = URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);

            return () => {
                URL.revokeObjectURL(previewUrl); // Cleanup preview URL when component unmounts
            };
        } else {
            setImagePreview(null);
        }
    }, [selectedImage]);

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'costPerUnit' || name === 'units' ? parseFloat(value) : value,
        }));
    };

    // Handle image input change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name || !formData.costPerUnit) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('costPerUnit', formData.costPerUnit.toString()); // Ensure costPerUnit is appended as a string
        if (formData.categoryId) formDataWithImage.append('categoryId', formData.categoryId.toString());
        if (selectedImage) formDataWithImage.append('image', selectedImage);

        try {
            await axios.post('http://localhost:3000/api/materials', formDataWithImage, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            setFormData(initialFormData); // Reset form after successful submission
            setSelectedImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error creating material:', error);
            setError('Failed to create material. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (error) return <ErrorMessage message={error}/>;

    return (
        <div className="form-wrapper">
            {/* Display selected image preview */}
            <div className="image-preview-container">
                {!imagePreview ? (
                    <FaImage size={64} className="placeholder-icon"/>
                ) : (
                    <img
                        src={imagePreview}
                        alt="Selected Material"
                        className="selected-image" // Custom class for the uploaded image
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label htmlFor="name" className="form-label">Material Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="costPerUnit" className="form-label">Cost Per Unit</label>
                    <input
                        type="number"
                        id="costPerUnit"
                        name="costPerUnit"
                        value={formData.costPerUnit}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="categoryId" className="form-label">Category (Optional)</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId || ''}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="image" className="form-label">Attach Image (Optional)</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="form-input"
                    />
                </div>

                <button type="submit" disabled={loading} className="form-button">
                    {loading ? 'Creating...' : 'Create Material'}
                </button>
            </form>
        </div>
    );
};

export default CreateMaterialForm;