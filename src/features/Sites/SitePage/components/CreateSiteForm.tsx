import React, { useState } from 'react';
import { CreateSiteDTO } from "../../../../models/location.models.ts";
import { createSite } from "../../../../services/location.services.ts";
import { TextAreaField, InputField } from "../../../../components/common/Input/FormFields.tsx";
import {FaSave} from "react-icons/fa"; // Importing the components

const CreateSiteForm: React.FC = () => {
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<CreateSiteDTO>({
        name: '',
        description: '',
        address: '', // Add the address field to the state
    });

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation: Ensure name and address are provided
        if (!formData.name) {
            setError('Site name is required');
            return;
        }

        if (!formData.address) {
            setError('Address is required');
            return;
        }

        try {
            // Create the site by passing the form data (including address)
            await createSite(formData);

            // If the submission is successful, reset the form and error
            setFormData({ name: '', description: '', address: '' });
            setError('');
            alert('Site created successfully!');
        } catch (error) {
            setError('An error occurred while creating the site');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {/* Site Name Field */}
            <InputField
                label="Site Name:"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            {/* Address Field */}
            <InputField
                label="Address:"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />

            {/* Description Field */}
            <TextAreaField
                label="Description (optional):"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            {/* Error message */}
            {error && <div className="form-error">{error}</div>}

            {/* Submit Button */}
            <div className="form-footer">
                <button type="submit" className="form-button">
                    <FaSave className="icon" />
                    Save Site
                </button>
            </div>

        </form>
    );
};

export default CreateSiteForm;