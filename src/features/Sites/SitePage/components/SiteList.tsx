import React from 'react';
import {Site} from "../../../../models/location.models.ts";  // Assuming you have a Site model
import {Navigate} from "../../../../utils/navigation.utils.ts";

interface SiteListProps {
    sites: Site[];        // Array of site data
}

const SiteList: React.FC<SiteListProps> = ({sites}) => {
    const nav = Navigate();

    return (
        <div className="list-container">
            {sites.map(site => (
                <div key={site.id} className="card-container" onClick={() => nav.goToSiteProfile(parseInt(site.id))}>

                    {/* Image Section (Site Logo Placeholder) */}
                    <div className="card-image">
                        <div className="site-logo">
                            <span className="site-logo-text">{site.name[0]}</span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="card-details">
                        <h2 className="card-title">{site.name}</h2>
                        <div className="card-grid">
                            <div>
                                <span className="card-label">Site Name</span>
                                <p className="card-value">{site.name}</p>
                            </div>
                            <div>
                                <span className="card-label">Description</span>
                                <p className="card-value">{site.description || "No description available"}</p>
                            </div>
                            <div>
                                <span className="card-label">Created At</span>
                                <p className="card-value">{new Date(site.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SiteList;