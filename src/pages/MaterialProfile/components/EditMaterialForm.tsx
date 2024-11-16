import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MaterialDTO } from '../../../models/material.models.ts';
import { Category } from "../../../models/workHour.models.ts";
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";

interface UpdateMaterialFormProps {
    material: MaterialDTO;  // MaterialDTO to populate the form for updating
}

const UpdateMaterialForm: React.FC<UpdateMaterialFormProps> = ({ material }) => {
    const initialFormData = {
        name: material.name,
        costPerUnit: material.costPerUnit || '',
        categoryId: material.categoryId || '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRes = await axios.get('http://localhost:3000/api/categories');
                setCategories(categoryRes.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setSelectedImage(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('costPerUnit', formData.costPerUnit.toString());

        if (formData.categoryId) {
            formDataWithImage.append('categoryId', formData.categoryId.toString());
        }

        if (selectedImage) {
            formDataWithImage.append('image', selectedImage);
        }

        try {
            const res = await axios.put(
                `http://localhost:3000/api/materials/${material.id}`,
                formDataWithImage,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Material updated successfully:', res.data);
            resetForm();
        } catch (error) {
            console.error('Error updating material:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="image-preview-container">
                {!selectedImage ? (
                    <ImageWithAlt
                        imageName={material.imageUrl || null}
                        className="selected-image" // Optional class for the icon
                    />
                ) : (
                    material.imageUrl && (
                        <img
                            src={material.imageUrl}
                            alt="Current Material"
                            className="selected-image"
                        />
                    )
                )}
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Cost Per Unit (Optional):</label>
                    <input
                        type="number"
                        name="costPerUnit"
                        value={formData.costPerUnit}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter cost per unit"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Image (Optional):</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Category (Optional):</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Material'}
                </button>
            </form>
        </div>
    );
};

export default UpdateMaterialForm;