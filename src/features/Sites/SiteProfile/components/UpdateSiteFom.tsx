import React, {useEffect, useState} from "react";
import {Site} from "../../../../models/location.models.ts";
import {updateSite} from "../../../../services/location.services.ts";
import {InputField, TextAreaField} from "../../../../components/common/Input/FormFields.tsx";

interface UpdateLocationProps {
    site: Site; // Accept Location as a prop
}

const UpdateSite: React.FC<UpdateLocationProps> = ({site}) => {
    const [name, setName] = useState<string>(site.name || "");
    const [address, setAddress] = useState<string>(site.address || "");
    const [description, setDescription] = useState<string>(site.description || "");
    const siteIdNumber = parseInt(site.id);

    // Initialize state only on the first render
    useEffect(() => {
        if (site) {
            setName(site.name);
            setAddress(site.address || "");
            setDescription(site.description || "");
        }
    }, []); // Empty dependency array ensures this runs only once.

    const handleUpdateLocation = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        try {
            const updatedLocation = await updateSite(siteIdNumber, {name, address, description});
            console.log("Location updated:", updatedLocation);
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    return (
        <form onSubmit={handleUpdateLocation} className="form-container">
            <InputField
                id="name"
                name="name"
                label="Location Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <InputField
                id="address"
                name="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <TextAreaField
                id="description"
                name="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit" className="form-button">
                Create Site
            </button>
        </form>
    );
};

export default UpdateSite;