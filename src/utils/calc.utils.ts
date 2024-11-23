import {MaterialWithInventoryDTO} from "../models/material.models.ts";

// Calculate the total cost of the material based on cost per unit and total quantity
export const calculateTotalMaterialCost = (material: MaterialWithInventoryDTO): number => {
    // Ensure costPerUnit and inventory are defined and valid
    if (!material.costPerUnit || !Array.isArray(material.inventory) || material.inventory.length === 0) return 0;

    // Calculate total quantity of the material
    const totalQuantity = material.inventory.reduce((total, item) => total + item.quantity, 0);

    // Return the total cost: costPerUnit * totalQuantity
    return material.costPerUnit * totalQuantity;
};

// Calculate the total quantity of the material by summing the quantities from the inventory
export const calculateTotalMaterialQuantity = (material: MaterialWithInventoryDTO): number => {
    // Return 0 if there's no inventory
    if (!material.inventory) return 0;

    // Sum up the quantity of the material from the inventory records
    return material.inventory.reduce((total, item) => total + item.quantity, 0);
};