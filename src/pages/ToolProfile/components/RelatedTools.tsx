import React from "react";
import { ToolDTO } from "../../../models/tool.models.ts";
import { useFetchToolsByCategory } from "../../../hooks/useFetchTools.ts";
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";
import { ErrorMessage } from "../../../components/Message.tsx";
import {MdArrowForwardIos} from "react-icons/md"; // Import the arrow icon

const RelatedTools: React.FC<{ categoryId: number; itemId: number }> = ({ categoryId, itemId }) => {
    const { items, error, loading } = useFetchToolsByCategory(categoryId);

    // Filter out the current tool from the related tools
    const filteredItems = items.filter((item: ToolDTO) => item.id !== itemId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (filteredItems.length === 0) {
        return <ErrorMessage message="No related tools found." />;
    }

    return (
        <div className="flex flex-col"> {/* Adds spacing between items */}
            {filteredItems.map((tool: ToolDTO) => (
                <div
                    key={tool.id}
                    onClick={() => console.log(`Clicked on ${tool.name}`)} // Replace with your navigation or action
                    className="flex items-center overflow-hidden cursor-pointer hover:bg-gray-50 border-b border-gray-200 p-2" // Adds border, padding, rounded corners, and shadow
                >
                    <ImageWithAlt
                        imageName={tool.imageUrl || ''}
                        className="h-24 w-24 object-cover rounded-md" // Adds rounded corners to the image
                    />
                    <div className="flex-1 px-4 flex flex-col justify-center"> {/* Adds horizontal padding */}
                        <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
                        <p className="text-sm text-gray-600">{tool.status}</p>
                    </div>
                    <MdArrowForwardIos className="text-gray-400 mr-4" /> {/* Arrow icon */}
                </div>
            ))}
        </div>
    );
};

export default RelatedTools;