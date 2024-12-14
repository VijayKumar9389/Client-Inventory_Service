import React, { useState, useEffect } from 'react';
import { ErrorMessage, LoadingMessage } from "./Message.tsx";

interface RenderViewProps {
    loading: boolean;
    error: string | null;
    listComponent: React.ReactNode;
    tableComponent: React.ReactNode;
}

const RenderView: React.FC<RenderViewProps> = ({ loading, error, listComponent, tableComponent }) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1024);

    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run only once when the component mounts

    // Handle the loading state
    if (loading) return <LoadingMessage message="Loading sites..." />;

    // Handle the error state
    if (error) return <ErrorMessage message="Error retrieving locations" />;

    // Render the appropriate component based on screen size
    return isDesktop ? tableComponent : listComponent;
};

export default RenderView;