import React from 'react';
import { IconType } from 'react-icons';

interface ReusableButtonProps {
    onClick: () => void;
    label: string;
    Icon?: IconType; // Optional icon prop
    className?: string; // Optional className for additional styles
    disabled?: boolean; // Optional disabled state
}

const PrimaryButton: React.FC<ReusableButtonProps> = ({
                                                          onClick,
                                                          label,
                                                          Icon,
                                                          className = '',
                                                          disabled = false, // Added default value for disabled state
                                                      }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex whitespace-nowrap items-center justify-center bg-primary-color text-white py-2 px-4 rounded-md 
                   shadow-md hover:bg-primary-color-hover transition duration-300 
                   focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 
                   disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        >
            {Icon && <Icon className="h-5 w-5 mr-2" />} {/* Render icon if provided */}
            <span className="font-medium">{label}</span>
        </button>
    );
};

export default PrimaryButton;