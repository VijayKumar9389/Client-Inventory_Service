import React, { useEffect, useState } from 'react';
import { Location } from '../../../../models/location.models.ts';
import { updateLocation } from '../../../../services/location.services.ts';
import PrimaryButton from "../../../../components/common/PrimaryButton.tsx";
import { FaSync } from "react-icons/fa";

interface UpdateLocationProps {
    location: Location;  // Accept Location as a prop
}

const UpdateLocation: React.FC<UpdateLocationProps> = ({ location }) => {
    const [name, setName] = useState<string>(location.name || '');
    const [address, setAddress] = useState<string>(location.address || '');

    useEffect(() => {
        // Populate fields with the passed location data
        if (location) {
            setName(location.name);
            setAddress(location.address || '');
        }
    }, [location]);

    const handleUpdateLocation = async () => {
        try {
            const updatedLocation = await updateLocation(location.id, { name, address });
            console.log('Location updated:', updatedLocation);
        } catch (error) {
            console.error('Error updating location:', error);
        }
    };

    return (
        <div className="form-container">
            {location ? (
                <form>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="name">
                            Location Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <PrimaryButton
                        onClick={handleUpdateLocation}
                        label="Update Location"
                        Icon={FaSync}
                        className="form-button"
                        disabled={!name || !address}
                    />
                </form>
            ) : (
                <p className="text-gray-500">Loading location data...</p>
            )}
        </div>
    );
};

export default UpdateLocation;