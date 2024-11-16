// Location Interface
import {Item, Material, Transaction} from "./workHour.models.ts";

// Interface for Location
export interface Location {
    id: number;
    name: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
    tools: Item[]; // One-to-many relation with items (tools)
    materials: Material[]; // One-to-many relation with materials
    transactions: Transaction[]; // Track transactions (adding, removing, transferring)
}

// Create a new location model
export interface CreateLocationInput {
    name: string;
    address?: string;
}