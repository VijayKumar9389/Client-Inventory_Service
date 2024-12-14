import React from 'react';
import {ToolDTO, ToolStatus} from '../../../../models/tool.models.ts';
import {Navigate} from "../../../../utils/navigation.utils.ts";
import ImageWithAlt from '../../../../components/common/ImageWithAlt.tsx';
import {FaWrench} from "react-icons/fa6";

interface ToolListProps {
    tools: ToolDTO[];
}

const statusStyles: { [key in ToolStatus]: string } = {
    [ToolStatus.ACTIVE]: 'text-green-500',
    [ToolStatus.DEFECTIVE]: 'text-red-500',
    [ToolStatus.REPAIRED]: 'text-blue-500',
    [ToolStatus.RETIRED]: 'text-gray-500',
};

const statusLabels: { [key in ToolStatus]: string } = {
    [ToolStatus.ACTIVE]: 'Active',
    [ToolStatus.DEFECTIVE]: 'Defective',
    [ToolStatus.REPAIRED]: 'Repaired',
    [ToolStatus.RETIRED]: 'Retired',
};

const ToolTable: React.FC<ToolListProps> = ({tools}) => {
    const nav = Navigate();

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Tool</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {tools.map((tool) => (
                    <tr key={tool.id} onClick={() => nav.goToToolProfile(tool.id)}>
                        <td>
                            <ImageWithAlt
                                imageName={tool.imageUrl || ''}
                                className="image-square"
                                altIcon={FaWrench}
                            />
                        </td>
                        <td>{tool.name}</td>
                        <td>{tool.location?.name || 'Unknown Location'}</td>
                        <td>
                            <p className={`card-status ${statusStyles[tool.status]}`}>
                                {statusLabels[tool.status]}
                            </p>
                        </td>
                        <td>{tool.category?.name || 'None'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToolTable;