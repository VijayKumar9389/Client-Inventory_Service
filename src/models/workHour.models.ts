// ToolStatus Enum - based on the assumption of various statuses like ACTIVE, DEFECTIVE, etc.
import {Location} from "./location.models.ts";

type ToolStatus = 'ACTIVE' | 'DEFECTIVE' | 'REPAIRED' | 'RETIRED';

// Category Interface
export interface Category {
    id: number;
    name: string;
    description?: string;
    organizationId: number; // Foreign key to Organization
    tools: Item[]; // One-to-many relation with tools
    materials: Material[]; // One-to-many relation with materials
}

// ToolPage (Tool) Interface
export interface Item {
    id: number;
    name: string;
    serialNumber?: string; // Optional serial number for tracking
    locationId: number; // Foreign key for the current location
    location: Location; // Relation to Location
    status: ToolStatus; // Status of the tool
    createdAt: Date;
    updatedAt: Date;
    transactions: Transaction[]; // Track movements and status changes
    category: Category; // Relation to Category
    categoryId: number; // Foreign key for Category
}

// Material Interface (Assumed structure, modify based on actual schema)
export interface Material {
    id: number;
    name: string;
    description?: string;
    locationId: number;
    location: Location;
    quantity: number;
    transactions: Transaction[];
}

// Transaction Interface (Assumed structure for transaction tracking, modify as needed)
export interface Transaction {
    id: number;
    itemId?: number; // Foreign key to ToolPage (if transaction involves a tool)
    materialId?: number; // Foreign key to Material (if transaction involves a material)
    locationId: number; // Foreign key to Location
    type: 'ADD' | 'REMOVE' | 'TRANSFER'; // Type of transaction
    quantity: number; // Quantity of item/material being transacted
    date: Date; // Transaction date
}