// PrimaryButton.tsx
import React from 'react';
import { IconType } from 'react-icons';

interface PrimaryButtonProps {
    onClick: () => void;
    label: string;
    Icon?: IconType; // Optional icon prop
    className?: string; // Optional className for additional styles
}

const ProfileButton: React.FC<PrimaryButtonProps> = ({
                                                         onClick,
                                                         label,
                                                         Icon,
                                                         className = '',
                                                     }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 h-fit text-base font-medium rounded-lg
                    bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md
                    hover:from-blue-600 hover:to-blue-700 hover:shadow-lg 
                    transition-transform duration-200 ease-in-out transform hover:-translate-y-1
                    focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 
                    disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
            {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
            {label}
        </button>
    );
};

export default ProfileButton;