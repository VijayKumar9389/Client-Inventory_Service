import {Location, CreateLocationDTO, CreateSiteDTO, Site, UpdateSite, SiteWithLocations} from "../models/location.models.ts";

const API_URL = "http://localhost:3000/api/locations";

// Create a new location
export const createLocation = async (locationData: CreateLocationDTO): Promise<Location> => {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
    });
    return response.json();
};

// Create a new site
export const createSite = async (siteData: CreateSiteDTO): Promise<Site> => {
    const response = await fetch(`${API_URL}/site`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(siteData),
    });
    console.log(response);
    return response.json();
};

// Fetch all sites
export const getAllSites = async (): Promise<Site[]> => {
    const response = await fetch(`${API_URL}/site/getAll`);
    return response.json();
};

// Fetch all locations by site ID
export const getLocationsBySiteId = async (id: number): Promise<Location[]> => {
    const response = await fetch(`${API_URL}/getBySite/${id}`);
    return response.json();
};

// Fetch Site with Locations
export const getSiteWithLocations = async (siteId: number): Promise<SiteWithLocations | null> => {
    const response = await fetch(`${API_URL}/site/getWithLocations/${siteId}`);
    return response.json();
};

// Update a location
export const updateLocation = async (
    id: number,
    locationData: Partial<Omit<Location, "id">>
): Promise<Location> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
    });
    return response.json();
};

export const updateSite = async (siteId: number, siteData: UpdateSite): Promise<Site> => {
    const response = await fetch(`${API_URL}/site/${siteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(siteData),
    });
    return response.json();
}

// Delete a location
export const deleteLocation = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

