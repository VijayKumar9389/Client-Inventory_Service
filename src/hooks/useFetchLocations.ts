import { useState, useEffect } from 'react';
import { getAllLocations, getLocationById } from '../services/location.services';
import { Location } from '../models/location.models';

export const useFetchLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationsData = await getAllLocations();
                setLocations(locationsData);
            } catch (err) {
                setError('Error fetching locations.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { locations, error, loading, setLocations };
};

export const useFetchLocationById = (locationId: number) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const locationData = await getLocationById(locationId);
                setLocation(locationData);
            } catch (err) {
                setError('Error fetching location.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [locationId]);

    return { location, error, loading, setLocation };
};