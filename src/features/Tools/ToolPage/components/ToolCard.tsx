import {useNavigate} from 'react-router-dom';
import {ToolDTO, ToolStatus} from '../../../../models/tool.models.ts';
import ImageWithAlt from '../../../../components/common/ImageWithAlt.tsx';
import {FaWrench} from "react-icons/fa6";

interface ToolCardProps {
    tool: ToolDTO;
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

const ToolCard = ({tool}: ToolCardProps) => {
    const navigate = useNavigate();

    const goToItemDetail = () => {
        navigate(`/tools/${tool.id}`);
    };

    return (
        <div onClick={goToItemDetail} className="card-container">
            {/* Image Section */}
            <div className="card-image">
                <ImageWithAlt
                    imageName={tool.imageUrl || ''}
                    className="object-cover h-full w-full"
                    altIcon={FaWrench}
                />
            </div>

            {/* Details Section */}
            <div className="card-details">
                {/* Name */}
                <h2 className="card-title">{tool.name}</h2>

                {/* Details Grid */}
                <div className="card-grid">
                    {/* Location */}
                    <div>
                        <span className="card-label">Location</span>
                        <p className="card-value">{tool.location?.name || 'Unknown Location'}</p>
                    </div>

                    {/* Category */}
                    <div>
                        <span className="card-label">Category</span>
                        <p className="card-value">{tool.category?.name || 'Uncategorized'}</p>
                    </div>

                    {/* Status */}
                    <div>
                        <span className="card-label">Status</span>
                        <p className={`card-status ${statusStyles[tool.status]}`}>
                            {statusLabels[tool.status]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;