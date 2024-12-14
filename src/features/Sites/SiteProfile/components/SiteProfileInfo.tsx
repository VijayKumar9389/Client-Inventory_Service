// SiteProfileInfo.tsx
import React from 'react';
import { Site} from "../../../../models/location.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {FaLocationDot} from "react-icons/fa6";

interface LocationProfileInfoProps {
    site: Site;
}

const SiteProfileInfo: React.FC<LocationProfileInfoProps> = ({site}) => {
    return (
        <div className="profile-details">
            <div className="profile-media">
                <ImageWithAlt imageName={null} className="profile-image" altIcon={FaLocationDot}/>
            </div>
            <div className="profile-content">
                <h2 className="profile-title">{site.name}</h2>
                <p className="profile-subtitle">{site.description}</p>
                <div className="profile-info">
                    <p className="profile-info-item">
                        <span className="profile-info-label">Address:</span> {site.address}
                    </p>
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

export default SiteProfileInfo;