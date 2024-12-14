// Location Interface
import {Item, Material, Transaction} from "./workHour.models.ts";

// Interface for Location
export interface Location {
    id: number;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    tools: Item[]; // One-to-many relation with items (tools)
    materials: Material[]; // One-to-many relation with materials
    transactions: Transaction[]; // Track transactions (adding, removing, transferring)
}

export interface Site {
    id: string; // Unique identifier for each site, if applicable (e.g., from a database)
    name: string; // Site Name
    description?: string; // Optional description of the site
    address: string; // Address of the site
    createdAt: Date; // Date the site was created
    updatedAt: Date; // Date the site was last updated
}

export interface SiteWithLocations extends Site {
    locations?: Location[]; // Optional locations associated with the site
}

export interface UpdateSite {
    name: string; // Site Name
    description?: string; // Optional description of the site
    address: string; // Address of the site
}

export interface CreateSiteDTO {
    name: string;
    description: string;
    address: string; // Add address to the DTO
}

// Create a new location model
export interface CreateLocationDTO {
    siteId: number;
    name: string;
    description?: string;
}