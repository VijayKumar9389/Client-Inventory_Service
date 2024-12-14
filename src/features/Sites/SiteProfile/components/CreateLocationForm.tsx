import { useState } from 'react';
import { createLocation } from '../../../../services/location.services.ts';
import {InputField, TextAreaField} from "../../../../components/common/Input/FormFields.tsx";

const CreateLocationForm: React.FC<{ siteId: number }> = ({ siteId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');  // Changed from 'address' to 'description'
    const [error, setError] = useState('');

    const handleCreateLocation = async () => {
        if (!name || !description) {  // Validate the 'description' field instead of 'address'
            setError('Both name and description are required.');
            return;
        }

        try {
            await createLocation({ siteId, name, description });  // Pass 'description' to the service
            setName('');
            setDescription('');  // Reset 'description' field
        } catch {
            setError('Error creating location. Please try again.');
        }
    };

    return (
        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
            {error && <p className="form-error">{error}</p>}

            {/* Location Name Field */}
            <InputField
                id="locationName"
                name="locationName"
                label="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            {/* Description Field (changed from Address) */}
            <TextAreaField
                id="description"
                name="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // Update to use 'setDescription'
                required
            />

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleCreateLocation}
                className="form-button"
            >
                Create Location
            </button>
        </form>
    );
};

export default CreateLocationForm;