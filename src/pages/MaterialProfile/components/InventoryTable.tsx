import React, { useEffect, useState } from 'react';
import {Location} from "../../../models/location.models.ts";
import {deleteInventory} from "../../../services/material.services.ts";
import {getInventoryByMaterialId} from "../../../services/material.services.ts";
import CreateInventoryForm from "./CreateInventoryForm.tsx";

interface InventoryItemDTO {
    id: number;
    quantity: number;
    locationId: number;
    location: Location; // Include location details here
}

interface InventoryTestProps {
    materialId: number; // Expecting materialId to be passed as a prop
}

const InventoryTable: React.FC<InventoryTestProps> = ({ materialId }) => {
    const [inventory, setInventory] = useState<InventoryItemDTO[]>([]);
    const [error, setError] = useState<string>('');

    const handleDelete = async (id: number) => {
        try {
            await deleteInventory(id);
            setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting inventory:', error);
            setError('Error deleting inventory');
        }
    }

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventoryByMaterialId(materialId);
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setError('Error fetching inventory');
            }
        };

        fetchInventory();
    }, [materialId]); // Fetch inventory when materialId changes

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <table className="button-table">
            <thead>
            <tr>
                <th>Location Name</th>
                <th>Quantity</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <CreateInventoryForm materialId={materialId}/>
            {inventory.length > 0 ? (
                inventory.map((item) => (
                    <tr key={item.id} tabIndex={0}>
                        <td>{item.location.name}</td>
                        <td>{item.quantity}</td>
                        <td><button className="tbl-table" onClick={() => handleDelete(item.id)}>Delete</button></td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="text-center">
                        No inventory found
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default InventoryTable;