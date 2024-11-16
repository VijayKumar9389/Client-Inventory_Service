import {useState} from 'react';
import {createLocation} from '../../../services/location.services.ts';
import PrimaryButton from "../../../components/PrimaryButton.tsx";
import {FaSync} from "react-icons/fa";

const CreateLocationForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleCreateLocation = async () => {

        if (!name || !address) {
            setError('Both name and address are required.');
            return;
        }

        try {
            await createLocation({name, address});
            setName('');
            setAddress('');
        } catch {
            setError('Error creating location. Please try again.');
        }
    };

    return (
        <form className="form-container">
            {error && <p className="form-error">{error}</p>}
            <label htmlFor="locationName" className="form-label">
                Location Name
            </label>
            <input
                id="locationName"
                type="text"
                placeholder="Enter Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
            />

            <label htmlFor="address" className="form-label">
                Address
            </label>
            <input
                id="address"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                required
            />

            <PrimaryButton
                onClick={handleCreateLocation}
                label="Create Location"
                Icon={FaSync}
                className="form-button"
                disabled={!name}
            />
        </form>
    );
};

export default CreateLocationForm;