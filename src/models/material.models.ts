// Material DTO for creating a new material (with optional categoryId)
import {Category} from "./workHour.models.ts";

export interface CreateMaterialDTO {
    name: string;                   // Name of the material (Required)
    costPerUnit?: number;           // Optional cost per unit (can be mapped to Decimal in the database)
    imageUrl?: string;              // Optional URL for the material's image
    categoryId?: number;            // Optional foreign key for the category
}

// Material DTO for updating a material
export interface UpdateMaterialDTO {
    id: number;                     // ID of the material to update
    name: string;                   // Name of the material
    costPerUnit?: number;           // Optional cost per unit of the material
    imageUrl?: string;              // Optional URL for the material's image
    categoryId?: number;            // Optional foreign key reference for the category
}

// Material model with all properties
export interface MaterialDTO {
    id: number;                     // Unique identifier for the material
    name: string;                   // Name of the material
    imageUrl?: string;              // Optional URL for the material's image
    costPerUnit?: number;           // Optional cost per unit of the material
    inventory: InventoryDTO[];      // Array of inventory records associated with the material
    categoryId?: number;            // Optional foreign key reference for the category
    createdAt: Date;                // Creation timestamp
    updatedAt: Date;                // Last update timestamp
}

// Inventory DTO for tracking materials stored in each location
export interface InventoryDTO {
    id: number;                     // Unique identifier for the inventory record
    quantity: number;               // Quantity of the material at the location
    materialId: number;             // Foreign key reference to the Material
    locationId: number;             // Foreign key reference to the Location
    createdAt: Date;                // Timestamp indicating when the inventory record was created
    updatedAt: Date;                // Timestamp indicating the last time the inventory record was updated
}

export interface MaterialWithInventoryDTO {
    id: number;
    name: string;
    costPerUnit?: number;
    imageUrl?: string;
    category?: Category;
    inventory: InventoryDTO[];
}