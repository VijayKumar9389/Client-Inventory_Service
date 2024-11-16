import {useState, useEffect} from "react";
import {MaterialDTO} from "../models/material.models.ts";
import {fetchMaterials, getMaterialById, getMaterialsByCategory} from "../services/material.services.ts";

export const useFetchMaterials = () => {
    const [materials, setMaterials] = useState<MaterialDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterialsData = async () => {
            try {
                const materialsData = await fetchMaterials();
                setMaterials(materialsData);
            } catch (err) {
                setError("Error fetching materials.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterialsData();
    }, []);

    return {materials, error, loading, setMaterials};
}

export const useFetchMaterialById = (id: number) => {
    const [material, setMaterial] = useState<MaterialDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterialData = async () => {
            try {
                const materialData = await getMaterialById(id);
                setMaterial(materialData);
            } catch (err) {
                setError("Error fetching material.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterialData();
    }, [id]);

    return {material, error, loading, setMaterial};
}

export const useFetchMaterialsByCategory = (categoryId: number) => {
    const [materials, setMaterials] = useState<MaterialDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterialsData = async () => {
            try {
                const materialsData = await getMaterialsByCategory(categoryId);
                setMaterials(materialsData);
            } catch (err) {
                setError("Error fetching materials.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterialsData();
    }, [categoryId]);

    return {materials, error, loading, setMaterials};
}

