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
                                                          disabled = false,
                                                      }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center bg-primary-color text-white 
                py-2 px-6 rounded-full shadow-md 
                hover:bg-primary-color-hover transition duration-300 
                focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 
                disabled:bg-gray-400 disabled:cursor-not-allowed 
                ${className} w-auto`}
        >
            {Icon && <Icon className="h-5 w-5 mr-3" />} {/* Increased space between icon and label */}
            <span className="font-medium text-sm sm:text-base">{label}</span> {/* Adjusted font size */}
        </button>
    );
};

export default PrimaryButton;