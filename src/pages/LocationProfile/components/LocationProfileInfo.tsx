// LocationProfileInfo.tsx
import React from 'react';
import { FaLocationPin} from "react-icons/fa6";
import { Location} from "../../../models/location.models.ts";

interface LocationProfileInfoProps {
    location: Location;
}

const LocationProfileInfo: React.FC<LocationProfileInfoProps> = ({ location }) => {
    return (
        <div className="profile-header">
            <FaLocationPin className="profile-icon" />
            <div className="profile-content">
                <h2 className="profile-title">{location.name}</h2>
                <p className="profile-subtitle">{location.address}</p>
                <div className="profile-info">
                    <p className="profile-info-item">
                        <span className="profile-info-label">Tools:</span> {2}
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Materials:</span> {55}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LocationProfileInfo;