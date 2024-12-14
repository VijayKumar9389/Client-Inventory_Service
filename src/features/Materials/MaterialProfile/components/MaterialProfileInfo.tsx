// MaterialProfileInfo.tsx
import React from 'react';
import {MaterialWithInventoryDTO} from "../../../../models/material.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {calculateTotalMaterialCost, calculateTotalMaterialQuantity} from "../../../../utils/calc.utils.ts";
import {FaTape} from "react-icons/fa6";

interface MaterialProfileInfoProps {
    material: MaterialWithInventoryDTO;
}


const MaterialProfileInfo: React.FC<MaterialProfileInfoProps> = ({material}) => {
    return (
        <div className="profile-details">
            <div className="profile-media">
                    <ImageWithAlt imageName={material.imageUrl || null} className="profile-image" altIcon={FaTape}/>
            </div>
            <div className="profile-content">
                <h1 className="profile-title">{material.name}</h1>
                <p className="profile-subtitle">{material.costPerUnit}</p>
                <div className="profile-info">
                    <p className="profile-info-item">
                        <span className="profile-info-label">Cost per Unit:</span> ${material.costPerUnit}
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Quantity Available:</span> {material.costPerUnit}
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Current Location:</span> {material.costPerUnit}
                    </p>
                    <p className="profile-info-item">
                            <span
                                className="profile-info-label">Total Quantity:</span> {calculateTotalMaterialQuantity(material)}
                    </p>
                    <p className="profile-info-item">
                            <span
                                className="profile-info-label">Total Cost:</span> ${calculateTotalMaterialCost(material)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaterialProfileInfo;