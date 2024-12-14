import React, {useState} from 'react';
import axios from 'axios';
import {ToolDTO, ToolStatus} from '../../../../models/tool.models.ts';
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {
    DateSelectorField,
    DropdownListField,
    FileUploadField,
    InputField
} from "../../../../components/common/Input/FormFields.tsx";
import LocationDropDownList from "../../../../components/common/Input/LocationDropDownList.tsx";
import CategoryDropDownList from "../../../../components/common/Input/CategoryDropDownList.tsx";

interface UpdateItemFormProps {
    tool: ToolDTO; // ToolDTO to populate the form for updating
}

const UpdateToolForm: React.FC<UpdateItemFormProps> = ({tool}) => {
    const initialFormData = {
        name: tool.name,
        serialNumber: tool.serialNumber || '',
        cost: tool.cost || 0,
        locationId: tool.locationId,
        categoryId: tool.categoryId || '',
        status: tool.status,
        warrantyExpDate: tool.warrantyExpDate || '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Map ToolStatus enum to options
    const statusOptions = Object.values(ToolStatus).map((status) => ({
        value: status,
        label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
    }));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
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
        formDataWithImage.append('serialNumber', formData.serialNumber);

        if (formData.cost) {
            formDataWithImage.append('cost', formData.cost.toString());
        }

        // Ensure locationId and categoryId are passed as numbers
        formDataWithImage.append('locationId', Number(formData.locationId).toString());

        if (formData.categoryId) {
            formDataWithImage.append('categoryId', Number(formData.categoryId).toString());
        }

        formDataWithImage.append('status', formData.status);

        if (selectedImage) {
            formDataWithImage.append('image', selectedImage);
        }

        try {
            const res = await axios.put(`http://localhost:3000/api/tools/${tool.id}`, formDataWithImage, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log('Item updated successfully:', res.data);
            resetForm();
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            {/* Display the current or newly selected image */}

            <div className="image-preview-container"> {/* Wrapper for image display */}
                {!selectedImage ? (
                    <ImageWithAlt
                        imageName={tool.imageUrl || null}
                        className="selected-image" // Optional class for the icon
                    />
                ) : (
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Tool"
                        className="selected-image" // Custom class for the uploaded image
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className="form-container">

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

                <FileUploadField
                    label="Upload Image"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                />

                <LocationDropDownList
                    id="locationId"
                    name="locationId"
                    value={formData.locationId.toString()}
                    onChange={handleInputChange}
                />

                <CategoryDropDownList
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId.toString()}
                    onChange={handleInputChange}
                    type={'tools'}
                />

                <DropdownListField
                    label="Status:"
                    id="status"
                    name="status"
                    value={formData.status}
                    options={statusOptions}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit" className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Item'}
                </button>
            </form>
        </div>
    );
};

export default UpdateToolForm;