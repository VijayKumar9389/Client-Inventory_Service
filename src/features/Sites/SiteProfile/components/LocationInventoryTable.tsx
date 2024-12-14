import React, { useState, useEffect } from 'react';
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {ErrorMessage} from "../../../../components/layout/Message.tsx";

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
        <div className="list-container">
            {inventory.map((item) => (
                <div
                    key={item.id}
                    className="card-container"
                    tabIndex={0} // Makes it focusable for accessibility
                >
                    {item.material.imageUrl ? (
                        <div className="card-image">
                            <ImageWithAlt
                                imageName={item.material.imageUrl}
                                className="card-image"
                            />
                        </div>
                    ) : (
                        <div className="card-image">
                            <p className="card-subtext">No image</p>
                        </div>
                    )}
                    <div className="card-details">
                        <h3 className="card-title">{item.material.name}</h3>
                        <div className="card-grid">
                            <div>
                                <span className="card-label">Quantity:</span>
                                <p className="card-value">{item.quantity}</p>
                            </div>
                            <div>
                                <span className="card-label">Cost per Unit:</span>
                                <p className="card-value">
                                    {item.material.costPerUnit || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <span className="card-label">Category ID:</span>
                                <p className="card-value">
                                    {item.material.categoryId || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocationInventoryTable;