import { useEffect, useState } from "react";
import {getAllSites} from "../../../services/location.services.ts";
import {Site} from "../../../models/location.models.ts";

interface DropdownListFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const SiteDropDownList: React.FC<DropdownListFieldProps> = ({
                                                                    id,
                                                                    name,
                                                                    value,
                                                                    onChange,
                                                                    required = false,
                                                                }) => {
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Indicate loading state
                const response = await getAllSites(); // Fetch response by type
                setSites(response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false); // Remove loading state
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-field-wrapper">
            <label htmlFor={id} className="form-label">Categories</label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="form-input"
                required={required}
                disabled={loading}
            >
                <option value="">{loading ? "Loading..." : "Select an option"}</option>
                {sites.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SiteDropDownList;