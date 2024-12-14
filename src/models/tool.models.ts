import {Category} from "./workHour.models.ts";
import {Location} from "./location.models.ts";

export interface ToolWithRelations extends ToolDTO {
    location: Location;
    category: Category | null;
}

export interface ToolDTO {
    id: number;
    name: string;
    serialNumber?: string;       // Optional as per model
    cost?: number;               // Optional Decimal field for the tool cost
    warrantyExpDate?: Date;     // Optional warranty expiration date
    imageUrl?: string;           // Optional URL for the image
    locationId: number;          // Required foreign key for the location
    status: ToolStatus;          // Tool status with a default value of 'ACTIVE'
    categoryId?: number;         // Optional category foreign key
    category?: Category | null;  // Optional category object
    location?: Location;         // Location object
}

// DTO for creating a new item
export interface CreateToolDTO {
    name: string;               // Required name of the tool
    serialNumber?: string;      // Optional serial number for tracking
    cost?: number;              // Optional cost of the tool
    warrantyExpDate?: Date;     // Optional warranty expiration date
    imageUrl?: string;          // Optional image URL for the tool
    locationId: number;         // Foreign key for the current location (required)
    categoryId?: number;        // Optional foreign key for the category
    status?: ToolStatus;        // Optional status (enum ToolStatus)
}

// DTO for updating an existing item
export interface UpdateToolDTO {
    name?: string;              // Optional updated name of the tool
    serialNumber?: string;      // Optional updated serial number
    cost?: number;              // Optional updated cost of the tool
    warrantyExpDate?: Date;     // Optional warranty expiration date
    imageUrl?: string;          // Optional updated image URL for the tool
    locationId?: number;        // Optional updated location foreign key
    categoryId?: number;        // Optional updated category foreign key
    status?: ToolStatus;        // Optional updated status of the tool
}

export enum ToolStatus {
    ACTIVE = 'ACTIVE',
    DEFECTIVE = 'DEFECTIVE',
    REPAIRED = 'REPAIRED',
    RETIRED = 'RETIRED',
}

