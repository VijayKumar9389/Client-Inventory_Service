import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CreateMaterialDTO} from "../../../../models/material.models.ts";
import {ErrorMessage} from "../../../../components/layout/Message.tsx";
import {FaTape} from "react-icons/fa6";
import CategoryDropDownList from "../../../../components/common/Input/CategoryDropDownList.tsx";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {InputField, FileUploadField} from "../../../../components/common/Input/FormFields.tsx";

const CreateMaterialForm = () => {
    const initialFormData = {
        name: '',
        costPerUnit: 0,  // Initialize costPerUnit
        categoryId: undefined,
        image: null,   // Updated imageUrl instead of image
    };

    const [formData, setFormData] = useState<CreateMaterialDTO>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
                    <ImageWithAlt imageName={null} altIcon={FaTape}/>
                ) : (
                    <img
                        src={imagePreview}
                        alt="Selected Material"
                        className="selected-image" // Custom class for the uploaded image
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className="form-container">

                <InputField
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Material Name"
                    required
                />

                <InputField
                    type="text"
                    id="costPerUnit"
                    name="costPerUnit"
                    value={formData?.costPerUnit?.toString() || ''}
                    onChange={handleChange}
                    label="Cost Per Unit"
                    required
                />

                <CategoryDropDownList
                    id="categoryId"
                    name="categoryId"
                    value={''}
                    onChange={handleChange}
                    type={'materials'}
                />

                <FileUploadField
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    label="Attach Image (Optional)"
                />

                <button type="submit" disabled={loading} className="form-button">
                    {loading ? 'Creating...' : 'Create Material'}
                </button>
            </form>
        </div>
    );
};

export default CreateMaterialForm;