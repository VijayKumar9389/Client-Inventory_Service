import axios from "axios";
import {UpdateMaterialDTO} from "../models/material.models.ts";

export const fetchMaterials = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/materials');
        return data;
    } catch (error) {
        console.error('Error fetching materials:', error);
        return [];
    }
};

export const getMaterialById = async (id: number) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/materials/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching material:', error);
        return null;
    }
}

export const getMaterialsByCategory = async (categoryId: number) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/materials/category/${categoryId}`);
        return data;
    } catch (error) {
        console.error('Error fetching materials:', error);
        return [];
    }
}

export const updateMaterial = async (id: number, materialData: UpdateMaterialDTO) => {
    try {
        const { data } = await axios.put(`http://localhost:3000/api/materials/${id}`, materialData);
        return data;
    } catch (error) {
        console.error('Error updating material:', error);
        throw new Error('Failed to update material');
    }
}

export const deleteMaterial = async (id: number) => {
    try {
        await axios.delete(`http://localhost:3000/api/materials/${id}`);
        console.log(`Material with ID ${id} deleted successfully`);
    } catch (error) {
        console.error('Error deleting material:', error);
        throw new Error('Failed to delete material');
    }
}

export const deleteInventory = async (id: number) => {
    try {
        await axios.delete(`http://localhost:3000/api/materials/inventory/${id}`);
        console.log(`Inventory record with ID ${id} deleted successfully`);
    } catch (error) {
        console.error('Error deleting inventory:', error);
        throw new Error('Failed to delete inventory record');
    }
}

export const getInventoryByMaterialId = async (materialId: number) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/materials/inventory/${materialId}`);
        return data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
}

export const getInventoryByLocationId = async (locationId: number) => {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/materials/inventory/location/${locationId}`);
        return data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
}