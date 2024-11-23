import axios from 'axios';
import {CreateToolDTO, UpdateToolDTO, ToolDTO, ToolStatus, ToolWithRelations} from "../models/tool.models.ts";

export const createTool = async (itemData: CreateToolDTO): Promise<ToolDTO> => {
    const { data } = await axios.post('http://localhost:3000/api/tools', itemData);
    return data;
};

// Update an existing tool
export const updateTool = async (
    itemId: number,
    formData: {
        name: string;
        serialNumber: string;
        locationId: string;
        categoryId: string;
        status: ToolStatus;
    }
): Promise<ToolDTO> => {
    const itemData: UpdateToolDTO = {
        name: formData.name,
        serialNumber: formData.serialNumber || undefined,  // Optional
        locationId: parseInt(formData.locationId),
        categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined,  // Optional
        status: formData.status as ToolStatus,
    };

    const { data } = await axios.put(`http://localhost:3000/api/tools/${itemId}`, itemData);
    return data;
};

// Fetch all tools
export const getTools = async (): Promise<ToolDTO[]> => {
    const { data } = await axios.get('http://localhost:3000/api/tools');
    return data;
};

// Fetch a single tool by ID
export const getToolById = async (itemId: number): Promise<ToolWithRelations> => {
    const { data } = await axios.get(`http://localhost:3000/api/tools/${itemId}`);
    return data;
};

// Delete a tool
export const deleteTool = async (itemId: number): Promise<void> => {
    await axios.delete(`http://localhost:3000/api/tools/${itemId}`);
};

// get tools by locaiton id
export const getToolsByLocation = async (locationId: number): Promise<ToolDTO[]> => {
    const { data } = await axios.get(`http://localhost:3000/api/tools/location/${locationId}`);
    return data;
};

export const getToolsByCategory = async (categoryId: number): Promise<ToolDTO[]> => {
    const { data } = await axios.get(`http://localhost:3000/api/tools/category/${categoryId}`);
    return data;
}