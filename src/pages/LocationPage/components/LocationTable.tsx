import { Location } from "../../../models/location.models.ts";

export const LocationTable: React.FC<{ locations: Location[] }> = ({ locations }) => {
    return (
            <div className="list-container">
                {locations.map(location => (
                    <div key={location.id} className="card-container">
                        {/* Image Section (User Logo Placeholder) */}
                        <div className="card-image">
                            <div className="user-logo">
                                <span className="user-logo-text">{location.name[0]}</span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="card-details">
                            <h2 className="card-title">{location.name}</h2>
                            <div className="card-grid">
                                <div>
                                    <span className="card-label">Location Name</span>
                                    <p className="card-value">{location.name}</p>
                                </div>
                                <div>
                                    <span className="card-label">Address</span>
                                    <p className="card-value">{location.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );
};