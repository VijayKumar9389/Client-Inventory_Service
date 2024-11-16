// MaterialProfileInfo.tsx
import React from 'react';
import { FaTools } from 'react-icons/fa';
import { MaterialDTO} from "../../../models/material.models.ts";
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";

interface MaterialProfileInfoProps {
    material: MaterialDTO;
}

const MaterialProfileInfo: React.FC<MaterialProfileInfoProps> = ({ material }) => {
    return (
        <div className="profile-header materials-profile-header">
            {material.imageUrl ? (
                <ImageWithAlt imageName={material.imageUrl} className="profile-image" />
            ) : (
                <FaTools className="profile-icon" />
            )}
            <div className="profile-content">
                <h2 className="profile-title">{material.name}</h2>
                <p className="profile-subtitle">${material.costPerUnit}</p>
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
                </div>
            </div>
        </div>
    );
};

export default MaterialProfileInfo;