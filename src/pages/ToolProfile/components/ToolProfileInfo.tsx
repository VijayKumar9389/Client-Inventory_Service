// ToolProfileInfo.tsx
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";
import { ToolDTO} from "../../../models/tool.models.ts";
import {AiFillTool} from "react-icons/ai";

interface ToolProfileInfoProps {
    item: ToolDTO;
}

const ToolProfileInfo: React.FC<ToolProfileInfoProps> = ({ item }) => {
    return (
        <div className="profile-header">
            {item.imageUrl ? (
                <ImageWithAlt imageName={item.imageUrl} className="profile-image" />
            ) : (
                <AiFillTool className="profile-icon" />
            )}
            <div className="profile-content">
                <h1 className="profile-title">{item.name}</h1>
                <p className="profile-subtitle">{item.serialNumber}</p>
                <div className="profile-info">
                    <p className="profile-info-item">
                        <span className="profile-info-label">Cost:</span> ${item.cost}
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Status:</span>
                        <span
                            className={`status-badge ${item.status !== 'ACTIVE' ? 'status-active' : 'status-inactive'}`}
                        >
                            {item.status}
                        </span>
                    </p>
                    <p className="profile-info-item">
                        <span className="profile-info-label">Current Location:</span> {item.locationId}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ToolProfileInfo;