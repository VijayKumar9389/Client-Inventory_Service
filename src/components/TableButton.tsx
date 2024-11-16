import React from 'react';
import { IconType } from 'react-icons'; // IconType allows flexibility with react-icons
import { FaSpinner } from 'react-icons/fa';

interface TableButtonProps {
    onClick: () => void;
    label: string;
    Icon: IconType; // Accepts an icon component from react-icons
    disabled?: boolean;
    color?: 'blue' | 'red' | 'green' | 'yellow'; // Restrict color to these values
    loading?: boolean;
}

const TableButton: React.FC<TableButtonProps> = ({
                                                     onClick,
                                                     label,
                                                     Icon,
                                                     disabled = false,
                                                     color = 'blue',
                                                     loading = false,
                                                 }) => {
    // Base button styles
    const baseStyles = 'flex items-center justify-center px-3 py-1 text-sm text-white rounded-md shadow transition duration-300 ease-in-out';

    // Map colors to corresponding Tailwind CSS classes
    const colorMap: Record<typeof color, string> = {
        blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
        red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400',
        green: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400',
        yellow: 'bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400',
    };

    // Use the colorMap to pick the correct classes
    const colorStyles = colorMap[color];

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading} // Disable button when loading
            className={`${baseStyles} ${colorStyles} ${disabled || loading ? 'cursor-not-allowed' : ''}`}
            aria-disabled={disabled || loading} // Accessibility attribute
        >
            {loading ? (
                <>
                    <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                    <span className="ml-2">Loading...</span>
                </>
            ) : (
                <>
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{label}</span>
                </>
            )}
        </button>
    );
};

export default TableButton;