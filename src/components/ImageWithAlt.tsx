import React from 'react';
import { FaBox } from 'react-icons/fa6';

interface ImageWithAltProps {
    imageName: string | null;
    className?: string; // Optional className prop
}

const ImageWithAlt: React.FC<ImageWithAltProps> = ({ imageName, className }) => {
    const API_BASE_URL: string = "http://localhost:3000"; // Replace with your actual API or public directory base URL
    const imageUrl = imageName ? `${API_BASE_URL}/images/${imageName}` : null;

    return (
        <div className={`flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden ${className}`}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={imageName || "Image"}
                    className="w-full h-full object-cover" // Ensures the image covers the area
                />
            ) : (
                <FaBox className="text-gray-500 text-4xl" /> // Icon for no image
            )}
        </div>
    );
};

export default ImageWithAlt;