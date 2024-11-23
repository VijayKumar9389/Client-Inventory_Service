import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from '../../../models/location.models';
import ProfileButton from "../../../components/ProfileButton.tsx";
import {FaIcons} from "react-icons/fa6";

interface CreateInventoryFormProps {
    materialId: number;
}

interface CreateInventoryDTO {
    materialId: number;
    locationId: number;
    quantity: number;
}

const CreateInventoryForm: React.FC<CreateInventoryFormProps> = ({ materialId }) => {
    const [formData, setFormData] = useState<CreateInventoryDTO>({
        materialId,
        locationId: 0,
        quantity: 1, // Start at 1 to ensure it's not 0
    });
    const [locations, setLocations] = useState<Location[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch locations on mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/locations');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'quantity' ? Math.max(1, +value) : +value, // Ensure quantity is at least 1
        });
    };

    // Submit the form
    const handleSubmit = async () => {
        setIsSubmitting(true);
         window.alert("Inventory created successfully");

        try {
            const res = await axios.post('http://localhost:3000/api/materials/inventory', formData);
            console.log('Inventory created successfully:', res.data);
            // Optionally reset form or provide feedback
        } catch (error) {
            console.error('Error creating inventory:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <tr>
            <td className="form-group">
                <label className="sr-only" htmlFor="locationId">Location</label>
                <select
                    id="locationId"
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleInputChange}
                    className="form-select w-full"
                    required
                >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </td>
            <td className="form-group">
                <label className="sr-only" htmlFor="quantity">Quantity</label>
                <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    min="1"
                    required
                />
            </td>
            <td></td> {/* Empty cell to align with table structure */}
            <td>
                <ProfileButton onClick={() => handleSubmit()} label="Update Material" Icon={FaIcons}/>
            </td>
        </tr>
    );
};

export default CreateInventoryForm;