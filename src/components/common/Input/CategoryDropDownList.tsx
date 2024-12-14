import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/category.services.ts";
import { Category } from "../../../models/workHour.models.ts";

interface DropdownListFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
    type: 'tools' | 'materials'; // Specify the category type
}

const CategoryDropDownList: React.FC<DropdownListFieldProps> = ({
                                                                    id,
                                                                    name,
                                                                    value,
                                                                    onChange,
                                                                    required = false,
                                                                    type,
                                                                }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Indicate loading state
                const categories = await getAllCategories(type); // Fetch categories by type
                setCategories(categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false); // Remove loading state
            }
        };

        fetchData();
    }, [type]);

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
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropDownList;