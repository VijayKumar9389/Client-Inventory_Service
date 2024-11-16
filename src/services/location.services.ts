import {Location, CreateLocationInput} from "../models/location.models.ts";

const API_URL = "http://localhost:3000/api/locations";

// Create a new location
export const createLocation = async (locationData: CreateLocationInput): Promise<Location> => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
    });
    return response.json();
};

// Fetch all locations
export const getAllLocations = async (): Promise<Location[]> => {
    const response = await fetch(`${API_URL}`);
    return response.json();
};

// Fetch a single location by ID
export const getLocationById = async (id: number): Promise<Location> => {
    const response = await fetch(`${API_URL}/${id}`);
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

// Delete a location
export const deleteLocation = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

