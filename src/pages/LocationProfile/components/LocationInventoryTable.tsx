import React, { useState, useEffect } from 'react';
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";
import {ErrorMessage} from "../../../components/Message.tsx";

// Assuming ImageWithAlt is correctly imported

interface Material {
    id: number;
    name: string;
    imageUrl?: string;
    categoryId?: number;
    costPerUnit?: number;
}

interface InventoryItem {
    id: number;
    quantity: number;
    locationId: number;
    material: Material; // Include material details here
}

interface MaterialInventoryTableProps {
    materialId: number;
}

const LocationInventoryTable: React.FC<MaterialInventoryTableProps> = ({ materialId }) => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/api/materials/inventory/location/${materialId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setError('Failed to load inventory data');
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [materialId]);

    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p>{error}</p>;
    if (!inventory.length) return <ErrorMessage message="No inventory items found" />;

    return (
        <table className="button-table">
            <thead>
            <tr>
                <th></th>
                <th>Material Name</th>
                <th>Quantity</th>
                <th>Cost per Unit</th>
                <th>Category ID</th>
            </tr>
            </thead>
            <tbody>
            {inventory.map((item) => (
                <tr key={item.id} tabIndex={0}>
                    <td>
                        {item.material.imageUrl ? (
                            <ImageWithAlt
                                imageName={item.material.imageUrl}
                                className="image-square"
                            />
                        ) : (
                            'No image'
                        )}
                    </td>
                    <td>{item.material.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.material.costPerUnit || 'N/A'}</td>
                    <td>{item.material.categoryId || 'N/A'}</td>

                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LocationInventoryTable;