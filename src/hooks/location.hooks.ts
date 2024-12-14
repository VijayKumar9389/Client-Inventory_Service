import { useState, useEffect } from 'react';
import { getLocationsBySiteId, getAllSites, getSiteWithLocations } from '../services/location.services';
import {Location, Site, SiteWithLocations} from '../models/location.models';


export const useFetchSites = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const sitesData = await getAllSites();
                setSites(sitesData);
            } catch (err) {
                setError('Error fetching sites.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSites();
    }, []);

    return { sites, error, loading, setSites };
}

export const useFetchLocationBySite = (locationId: number) => {
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const locationData = await getLocationsBySiteId(locationId);
                setLocations(locationData);
            } catch (err) {
                setError('Error fetching location.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [locationId]);

    return { locations, error, loading };
};

export const useFetchSiteWithLocations = (siteId: number) => {
    const [site, setSite] = useState<SiteWithLocations | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSite = async () => {
            try {
                const siteData = await getSiteWithLocations(siteId);
                setSite(siteData);
            } catch (err) {
                setError('Error fetching site.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSite();
    }, [siteId]);

    return { site, error, loading };
}