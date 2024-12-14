import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    DateSelectorField,
    FileUploadField,
    InputField,
    TextAreaField
} from "../../../../components/common/Input/FormFields.tsx";
import LocationDropDownList from "../../../../components/common/Input/LocationDropDownList.tsx";
import CategoryDropDownList from "../../../../components/common/Input/CategoryDropDownList.tsx";
import {ToolStatus} from "../../../../models/tool.models.ts";
import { FaWrench} from "react-icons/fa6";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";

const CreateToolForm = () => {
    const initialFormData = {
        name: '',
        serialNumber: '',
        cost: '',
        warrantyExpDate: '',
        description: '',
        image: '',
        locationId: '',
        categoryId: '',
        status: ToolStatus.ACTIVE, // Assuming 'active' is the default status
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

    // Image preview effect
    useEffect(() => {
        if (selectedImage) {
            const previewUrl = URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);

            return () => {
                URL.revokeObjectURL(previewUrl); // Cleanup preview URL when component unmounts
            };
        } else {
            setImagePreview(undefined);
        }
    }, [selectedImage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = new FormData();
        form.append('name', formData.name);
        form.append('serialNumber', formData.serialNumber || '');
        form.append('cost', formData.cost || '');
        form.append('warrantyExpDate', formData.warrantyExpDate || '');
        form.append('description', formData.description);
        form.append('locationId', formData.locationId);
        form.append('categoryId', formData.categoryId);
        form.append('status', formData.status);

        if (selectedImage) {
            form.append('image', selectedImage);
        }

        try {
            const res = await axios.post('http://localhost:3000/api/tools', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Item created successfully:', res.data);
            setFormData(initialFormData);
            setSelectedImage(null);
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-wrapper">
                <div className="image-preview-container">
                    {!selectedImage ? (
                        // <FaImage size={64} className="placeholder-icon"/>
                        <ImageWithAlt imageName={null} altIcon={FaWrench} />
                    ) : (
                        <img
                            src={imagePreview}
                            alt="Selected Material"
                            className="selected-image" // Custom class for the uploaded image
                        />
                    )}
                </div>
                <div className="form-container">
                    <InputField
                        label="Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <InputField
                        label="Serial Number"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleInputChange}
                    />

                    <InputField
                        label="Cost"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                    />

                    <DateSelectorField
                        label="Warranty Expiration Date"
                        id="warrantyExpDate"
                        name="warrantyExpDate"
                        value={formData.warrantyExpDate}
                        onChange={handleInputChange}
                    />

                    <TextAreaField
                        label="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    <LocationDropDownList
                        id="locationId"
                        name="locationId"
                        value={formData.locationId}
                        onChange={handleInputChange}
                    />

                    <CategoryDropDownList
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        type={'tools'}
                    />

                    <FileUploadField
                        label="Upload Image"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="form-footer">
                <button type="submit" className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Create Tool'}
                </button>
            </div>

        </form>
    );
};

export default CreateToolForm;