import {Location} from "../../../../models/location.models.ts";
import {Navigate} from "../../../../utils/navigation.utils.ts";

const LocationList: React.FC<{ locations: Location[] }> = ({locations}) => {
    const nav = Navigate();

    return (
        <div className="list-container">
            {locations.map(location => (
                <div key={location.id} className="card-container" onClick={() => nav.goToSiteProfile(location.id)}>

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
                                <span className="card-label">Description</span>
                                <p className="card-value">{location.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocationList