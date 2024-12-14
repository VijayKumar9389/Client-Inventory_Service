import React from 'react';
import { Site } from "../../../../models/location.models.ts";
import {Navigate} from "../../../../utils/navigation.utils.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {FaLocationDot} from "react-icons/fa6";

interface SiteListProps {
    sites: Site[];        // Array of site data
}

const SiteTable: React.FC<SiteListProps> = ({ sites }) => {
    const nav = Navigate();

    // Show loading message when loading
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {sites.map(site => (
                    <tr key={site.id} onClick={() => nav.goToSiteProfile(parseInt(site.id))}>
                        <td><ImageWithAlt imageName={null} altIcon={FaLocationDot} className="image-square" /></td>
                        <td>{site.name}</td>
                        <td>{site.description || "No description available"}</td>
                        <td>{site.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SiteTable;