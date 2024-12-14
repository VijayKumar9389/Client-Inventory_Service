import React from "react";
import {MaterialWithInventoryDTO} from "../../../../models/material.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {FaTape} from "react-icons/fa6";
import {calculateTotalMaterialQuantity} from "../../../../utils/calc.utils.ts";
import {Navigate} from "../../../../utils/navigation.utils.ts";

const MaterialList: React.FC<{ materials: MaterialWithInventoryDTO[] }> = ({materials}) => {

    const nav = Navigate();

    return (
        <div className="list-container">
            {materials.map((material) => (
                <div className="card-container" onClick={() => nav.goToMaterialProfile(material.id)}>
                    {/* Image Section */}
                    <div className="card-image">
                        <ImageWithAlt
                            imageName={material.imageUrl || ''}
                            className="object-cover h-full w-full"
                            altIcon={FaTape}
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
            ))}
        </div>
    );
};

export default MaterialList;