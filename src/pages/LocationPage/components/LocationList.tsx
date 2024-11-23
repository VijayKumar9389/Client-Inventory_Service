import {Location} from "../../../models/location.models.ts";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, LoadingMessage} from "../../../components/Message.tsx";

const LocationList: React.FC<{ locations: Location[], loading: boolean }> = ({locations, loading}) => {
    const nav = useNavigate();

    const goToLocationDetail = (id: number) => {
        nav(`/locations/${id}`);
    };

    if (loading) return <LoadingMessage message="Loading locations..."/>;

    return (
        <div className="list-container">
            {locations.length ? (
                locations.map(location => (
                    <div key={location.id} className="card-container" onClick={() => goToLocationDetail(location.id)}>

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
                ))
            ) : (
                <ErrorMessage message="No locations found."/>
            )}
        </div>
    );
};

export default LocationList