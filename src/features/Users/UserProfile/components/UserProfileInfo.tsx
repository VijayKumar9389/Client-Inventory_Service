// UserProfileInfo.tsx
import React from 'react';
import {FaUser} from 'react-icons/fa';
import {User} from '../../../../models/user.models.ts';
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";

interface UserProfileInfoProps {
    user: User;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({user}) => {
    return (
        <div className="profile-details">
            {/* Profile Image or Icon */}

            <div className="profile-media">
                <ImageWithAlt
                    imageName={null}
                    className="profile-image"
                    altIcon={FaUser}
                />
            </div>

            {/* Profile Content */}
            <div className="profile-content">
                <h2 className="profile-title">{user.name}</h2>
                <p className="profile-subtitle">{user.role}</p>
                <div className="profile-info">
                    <p className="profile-info-item">
                        <span className="profile-info-label">Email:</span> {user.email}
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Status:</span>
                        <span className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileInfo;