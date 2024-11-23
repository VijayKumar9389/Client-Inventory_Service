import { useNavigate } from 'react-router-dom';
import { MaterialWithInventoryDTO } from '../../../../models/material.models.ts';
import ImageWithAlt from "../../../../components/ImageWithAlt.tsx";
import { calculateTotalMaterialQuantity } from "../../../../utils/calc.utils.ts";

interface MaterialCardProps {
    material: MaterialWithInventoryDTO;
}

const MaterialCard = ({ material }: MaterialCardProps) => {
    const navigate = useNavigate();

    const goToMaterialDetail = () => {
        navigate(`/materials/${material.id}`);
    };

    return (
        <div onClick={goToMaterialDetail} className="card-container">
            {/* Image Section */}
            <div className="card-image">
                <ImageWithAlt
                    imageName={material.imageUrl || ''}
                    className="object-cover h-full w-full"
                />
            </div>

            {/* Details Section */}
            <div className="card-details">
                {/* Name */}
                <h2 className="card-title">{material.name}</h2>

                {/* Details Grid */}
                <div className="card-grid">
                    {/* Cost per Unit */}
                    <div>
                        <span className="card-label">Cost per Unit</span>
                        <p className="card-value">${material.costPerUnit}</p>
                    </div>

                    {/* Available */}
                    <div>
                        <span className="card-label">Available</span>
                        <p className="card-value">
                            {material.inventory && material.inventory.length > 0
                                ? calculateTotalMaterialQuantity(material)
                                : "None"}
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <span className="card-label">Category</span>
                        <p className="card-value">{material.category?.name || 'Uncategorized'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialCard;