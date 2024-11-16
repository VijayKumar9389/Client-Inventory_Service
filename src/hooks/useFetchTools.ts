import {useState, useEffect} from "react";
import {getToolById, getTools, getToolsByCategory} from "../services/tool.services.ts";
import {ToolDTO} from "../models/tool.models.ts";

export const useFetchTools = () => {
    const [items, setItems] = useState<ToolDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsData = await getTools();
                setItems(itemsData);
            } catch (err) {
                setError("Error fetching items.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return { items, error, loading, setItems };
};

export const useFetchToolById = (itemId: number) => {
    const [item, setItem] = useState<ToolDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const itemData = await getToolById(itemId);
                setItem(itemData);
            } catch (err) {
                setError("Error fetching item.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    return { item, error, loading, setItem };
}

export const useFetchToolsByCategory = (categoryId: number) => {
    const [items, setItems] = useState<ToolDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsData = await getToolsByCategory(categoryId);
                setItems(itemsData);
            } catch (err) {
                setError("Error fetching items.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [categoryId]);

    return { items, error, loading, setItems };
}
