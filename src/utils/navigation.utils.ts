import { useNavigate } from "react-router-dom";

export const Navigate = () => {
    const nav = useNavigate();
    // Navigate to site detail page
    const goToSiteProfile = (id: number) => {
        nav(`/site/${id}`);
    };

    const goToToolProfile = (id: number) => {
        nav(`/tools/${id}`);
    };

    const goToMaterialProfile = (id: number) => {
        nav(`/materials/${id}`);
    }

    return { goToSiteProfile, goToToolProfile, goToMaterialProfile };
};