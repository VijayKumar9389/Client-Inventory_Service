import React from 'react';

interface ImageWithAltProps {
    imageName: string | null;
    altIcon: React.ElementType; // Accepts a React icon component
    className?: string; // Optional className prop
}

const ImageWithAlt: React.FC<ImageWithAltProps> = ({ imageName, altIcon: AltIcon, className }) => {
    const API_BASE_URL: string = "http://localhost:3000"; // Replace with your actual API or public directory base URL
    const imageUrl = imageName ? `${API_BASE_URL}/images/${imageName}` : null;

    return (
        <div className={`flex items-center justify-center bg-gray-200 w-full h-full rounded-lg overflow-hidden ${className}`}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={imageName || "Image"}
                    className="w-full h-full object-cover" // Ensures the image covers the area
                />
            ) : (
                <AltIcon className="text-gray-500 w-full h-full p-4 object-contain" /> // Custom icon for no image
            )}
        </div>
    );
};

export default ImageWithAlt;