import React from "react";
import SearchBar from "../../../components/SearchBar.tsx";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const LocationFilter: React.FC<FilterProps> = ({ value, onChange, placeholder }) => {

    return(
        <div className="w-full">
            <SearchBar value={value} onChange={onChange} placeholder={placeholder} />
        </div>
    )

}

export default LocationFilter;