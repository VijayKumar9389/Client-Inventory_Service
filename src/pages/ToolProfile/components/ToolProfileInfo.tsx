// ToolProfileInfo.tsx
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";
import {ToolDTO} from "../../../models/tool.models.ts";
import {AiFillTool} from "react-icons/ai";

interface ToolProfileInfoProps {
    item: ToolDTO;
}

const ToolProfileInfo: React.FC<ToolProfileInfoProps> = ({item}) => {

    /* ProfileInfo Component for Reusability */
    const ProfileInfo: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
        <p className="profile-info-item">
            <span className="profile-info-label">{label}</span> {value}
        </p>
    );

    return (
        <div className="profile-details">
            {/* Profile Image or Icon */}
            <div className="profile-media">
                {item.imageUrl ? (
                    <ImageWithAlt
                        imageName={item.imageUrl}
                        className="profile-image"
                    />
                ) : (
                    <AiFillTool className="profile-icon" />
                )}
            </div>
            {/* Profile Content */}
            <div className="profile-content">
                <h1 className="profile-title">{item.name}</h1>
                <p className="profile-subtitle">{item.serialNumber}</p>
                <div className="profile-info">
                    <ProfileInfo label="Cost:" value={`$${item.cost}`} />
                    <ProfileInfo
                        label="Status:"
                        value={
                            <span
                                className={`status-badge ${
                                    item.status === 'ACTIVE'
                                        ? 'status-active'
                                        : 'status-inactive'
                                }`}
                            >
                            {item.status}
                        </span>
                        }
                    />
                    <ProfileInfo label="Current Location:" value={item.location?.name || "N/A"} />
                    <ProfileInfo label="Category:" value={item.category?.name || "N/A"} />
                </div>
            </div>
        </div>
    );
};

export default ToolProfileInfo;