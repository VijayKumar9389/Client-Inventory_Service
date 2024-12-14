import React, {useEffect, useState} from 'react';
import {Location} from "../../../../models/location.models.ts";
import {deleteInventory} from "../../../../services/material.services.ts";
import {getInventoryByMaterialId} from "../../../../services/material.services.ts";
import TableButton from "../../../../components/common/TableButton.tsx";

interface InventoryItemDTO {
    id: number;
    quantity: number;
    locationId: number;
    location: Location; // Include location details here
    createdAt: string;
}

interface InventoryTestProps {
    materialId: number; // Expecting materialId to be passed as a prop
}

const InventoryTable: React.FC<InventoryTestProps> = ({materialId}) => {
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

    // Format to "Sep 20, 2022"
    const convertDate = (date: string) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short", // Shortened month name like "Sep"
            day: "2-digit", // Day with leading zero if needed
        });
    };

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
        <table>
            <thead>
            <tr>
                <th>Location Name</th>
                <th>Quantity</th>
                <th>Date Added</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {/*<CreateInventoryForm materialId={materialId}/>*/}
            {inventory.length > 0 ? (
                inventory.map((item) => (
                    <tr key={item.id} tabIndex={0}>
                        <td>{item.location.name}</td>
                        <td>{item.quantity}</td>
                        <td>{convertDate(item.createdAt)}</td>
                        <td>
                            <div className="table-buttons">
                                <TableButton
                                    label="Update"
                                    onClick={() => console.log('Update clicked')}
                                />
                                <TableButton
                                    label="Transfer"
                                    onClick={() => console.log('Transfer clicked')}
                                />
                                <TableButton
                                    label="Delete"
                                    onClick={() => handleDelete(item.id)}
                                    confirmationMessage="Are you sure you want to delete this item?"
                                />
                            </div>
                        </td>
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