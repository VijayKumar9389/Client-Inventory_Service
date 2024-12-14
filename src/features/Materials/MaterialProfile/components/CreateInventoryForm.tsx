import React, {  useState } from 'react';
import axios from 'axios';
import LocationDropDownList from '../../../../components/common/Input/LocationDropDownList.tsx';
import { InputField, DateSelectorField } from '../../../../components/common/Input/FormFields.tsx';
import {CreateInventoryDTO} from "../../../../models/material.models.ts";
import SiteDropDownList from "../../../../components/common/Input/SiteDropDownList.tsx";

interface CreateInventoryFormProps {
    materialId: number;
}

const CreateInventoryForm: React.FC<CreateInventoryFormProps> = ({ materialId }) => {
    const [siteId, setSiteId] = useState(0);
    const [formData, setFormData] = useState<CreateInventoryDTO>({
        materialId,
        locationId: 0,
        quantity: 1, // Start at 1 to ensure it's not 0
        expiryDate: '',
    });

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'quantity' ? Math.max(1, +value) : value, // Ensure quantity is at least 1
        }));
    };

    // Handle date selector changes
    const handleDateChange = (date: string) => {
        setFormData((prevData) => ({
            ...prevData,
            expiryDate: date, // Update expiry date
        }));
    };

    // Submit the form
    const handleSubmit = async () => {
        if (!formData.locationId || !formData.quantity) {
            window.alert('Please fill in all required fields.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/materials/inventory', formData);
            console.log('Inventory created successfully:', res.data);
            window.alert('Inventory created successfully');
            // Optionally reset form or provide feedback
        } catch (error) {
            console.error('Error creating inventory:', error);
            window.alert('Error creating inventory');
        } finally {
        }
    };

    return (
        <form className="form-container">

            <SiteDropDownList
                id="siteId"
                name="siteId"
                value={siteId.toString()}
                onChange={(e) => setSiteId(+e.target.value)}
                required
            />

                <LocationDropDownList
                    id="locationId"
                    name="locationId"
                    value={formData.locationId.toString()}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Quantity"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity.toString()}
                    onChange={handleInputChange}
                    required
                />
                <DateSelectorField
                    label="Expiry Date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate || ''}
                    onChange={(e) => handleDateChange(e.target.value)}
                />

            <button type="button" onClick={handleSubmit} className="form-button">
                Create Inventory
            </button>
        </form>
    );
};

export default CreateInventoryForm;