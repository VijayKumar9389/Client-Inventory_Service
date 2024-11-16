import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Category} from '../../../models/workHour.models.ts';
import {Location} from '../../../models/location.models.ts';
import {ToolStatus} from '../../../models/tool.models.ts';
import {FaImage} from "react-icons/fa6";

const CreateToolForm = () => {
    const initialFormData = {
        name: '',
        serialNumber: '',
        cost: '',
        image: '',
        locationId: '',
        categoryId: '',
        status: ToolStatus.ACTIVE,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [locations, setLocations] = useState<Location[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationRes, categoryRes] = await Promise.all([
                    axios.get('http://localhost:3000/api/locations'),
                    axios.get('http://localhost:3000/api/categories'),
                ]);
                setLocations(locationRes.data);
                setCategories(categoryRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Create a preview URL for the selected image
        if (selectedImage) {
            const previewUrl = URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);

            // Clean up the URL object on component unmount
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setImagePreview(null); // Reset the preview if no image is selected
        }
    }, [selectedImage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('serialNumber', formData.serialNumber);
        if (formData.cost) formDataWithImage.append('cost', formData.cost);
        formDataWithImage.append('locationId', formData.locationId);
        if (formData.categoryId) formDataWithImage.append('categoryId', formData.categoryId);
        formDataWithImage.append('status', formData.status);

        if (selectedImage) {
            formDataWithImage.append('image', selectedImage);
        }

        try {
            const res = await axios.post('http://localhost:3000/api/tools', formDataWithImage, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log('Item created successfully:', res.data);
            resetForm();
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            {/* Display selected image preview */}
            <div className="image-preview-container">
                {!imagePreview ? (
                    <FaImage size={64} className="placeholder-icon"/>
                    ) : (
                    <img
                        src={imagePreview}  // Set the src attribute to the preview URL
                        alt="Selected Tool"
                        className="selected-image"
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                <label className="form-label">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                           className="form-input" required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Serial Number (Optional):</label>
                    <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange}
                           className="form-input"/>
                </div>
                <div className="form-group">
                    <label className="form-label">Cost (Optional):</label>
                    <input type="number" name="cost" value={formData.cost} onChange={handleInputChange}
                           className="form-input" step="0.01"/>
                </div>
                <div className="form-group">
                    <label className="form-label">Location:</label>
                    <select name="locationId" value={formData.locationId} onChange={handleInputChange}
                            className="form-select" required>
                        <option value="">Select Location</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Category (Optional):</label>
                    <select name="categoryId" value={formData.categoryId} onChange={handleInputChange}
                            className="form-select">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Status:</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="form-select"
                            required>
                        {Object.values(ToolStatus).map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Image (Optional):</label>
                    <input type="file" name="imageUrl" onChange={handleImageChange} accept="image/*"
                           className="form-input"/>
                </div>
                <button type="submit" className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Create Item'}
                </button>
            </form>
        </div>
    );
};

export default CreateToolForm;