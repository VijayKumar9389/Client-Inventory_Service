import React from "react";
import { useFetchMaterialsByCategory } from "../../../../hooks/useFetchMaterials.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import { MaterialDTO } from "../../../../models/material.models.ts";
import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon

const RelatedMaterials: React.FC<{ categoryId: number }> = ({ categoryId }) => {
    const { materials, error, loading } = useFetchMaterialsByCategory(categoryId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (materials.length === 0) {
        return <p>No related materials found.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {materials.map((material: MaterialDTO) => (
                <div
                    key={material.id}
                    onClick={() => console.log(`Clicked on ${material.name}`)} // Replace with your navigation or action
                    className="flex items-center overflow-hidden cursor-pointer hover:bg-gray-50 border-b border-gray-200 p-2"
                >
                    <ImageWithAlt
                        imageName={material.imageUrl || ''}
                        className="h-24 w-24 object-cover"
                        altIcon={FaArrowRight}
                    />
                    <div className="flex-1 p-4 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-gray-800">{material.name}</h3>
                    </div>
                    <FaArrowRight className="text-gray-400 mr-4" /> {/* Arrow icon */}
                </div>
            ))}
        </div>
    );
};

export default RelatedMaterials;