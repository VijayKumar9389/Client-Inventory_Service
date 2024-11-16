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
            className={`flex flex-col items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg 
                         hover:bg-gray-100 transition duration-200 ease-in-out`}
        >
            <div className="flex items-center justify-center gap-2 px-10 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg
                        shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-200 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                        disabled:bg-gray-400 disabled:cursor-not-allowed ">
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
            </div>
            <span>{label}</span>
        </button>
    );
};

export default ProfileButton;