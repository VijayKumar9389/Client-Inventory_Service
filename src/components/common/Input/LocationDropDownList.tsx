import { useEffect, useState } from "react";
import axios from "axios";
import { Location } from "../../../models/location.models.ts";

interface DropdownListFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const LocationDropDownList: React.FC<DropdownListFieldProps> = ({
    id,
    name,
    value,
    onChange,
    required = false,
}) => {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/locations/getAll');
                console.log('API Response:', data);
                setLocations(data); // Adjust this based on the API response structure.
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if (!locations) {
        return <p>Loading...</p>;
    }

    if (!locations.length) {
        return <p>Loading...</p>;
    }

    return (
        <div className="form-field-wrapper">
            <label htmlFor={id} className="form-label">Locations</label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="form-input"
                required={required}
            >
                <option value="">Select an option</option>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LocationDropDownList;