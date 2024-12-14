import React from "react";
import { ToolDTO } from "../../../../models/tool.models.ts";
import { useFetchToolsByCategory } from "../../../../hooks/useFetchTools.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {ErrorMessage, WarningMessage} from "../../../../components/layout/Message.tsx";
import {FaWrench} from "react-icons/fa6"; // Import the arrow icon

interface RelatedToolsProps {
    categoryId: number | null;
    itemId: number;
}

const RelatedToolsTable: React.FC<RelatedToolsProps> = ({ categoryId, itemId }) => {

    if (!categoryId) {
        return <WarningMessage message="No Catergory Assigned." />;
    }

    const { items, error, loading } = useFetchToolsByCategory(categoryId);

    // Filter out the current tool from the related tools
    const filteredItems = items.filter((item: ToolDTO) => item.id !== itemId);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (filteredItems.length === 0) {
        return <ErrorMessage message="No related tools found." />;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Tool</th>
                    <th>Status</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {filteredItems.map((tool: ToolDTO) => (
                    <tr
                        key={tool.id}
                        onClick={() => console.log(`Clicked on ${tool.name}`)} // Replace with your navigation or action
                        className="cursor-pointer hover:bg-gray-50 border-b border-gray-200"
                    >
                        <td>
                            <ImageWithAlt
                                imageName={tool.imageUrl || ''}
                                className="image-square"
                                altIcon={FaWrench}
                            />
                        </td>
                        <td>{tool.name}</td>
                        <td>
                            <span className="text-gray-600">{tool.status}</span>
                        </td>
                        <td>
                            <span className="text-gray-600">{tool.location?.name}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RelatedToolsTable;