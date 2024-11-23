import {BiSearch, BiX} from "react-icons/bi";
import React, {ChangeEvent, useState} from "react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState(value);

    // Handles input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    // Handles clear button click
    const handleClear = () => {
        setInputValue('');
        onChange('');
    };

    return (
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm w-full">
            {/* Search Icon */}
            <button
                onClick={inputValue ? handleClear : undefined}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-md"
            >
                {inputValue ? <BiX size={20}/> : <BiSearch size={20}/>}
            </button>
            {/* Input Field */}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full text-gray-700 focus:outline-none rounded-r-md"
            />
        </div>
    );
}

export default SearchBar;