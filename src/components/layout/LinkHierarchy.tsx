import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Helper function to generate breadcrumb links from the URL path
const generateBreadcrumbs = (pathname: string) => {
    // Split the pathname into individual segments (ignoring leading /)
    const pathSegments = pathname.split('/').filter(segment => segment);

    // Define routes with their names
    const routes = [
        { path: 'users', name: 'Users' },
        { path: 'tools', name: 'Tools' },
        { path: 'site', name: 'Sites' },
        { path: 'materials', name: 'Materials' },
        { path: 'categories', name: 'Categories' },
    ];

    // Create the breadcrumb structure
    const breadcrumbs = pathSegments.map((segment, index) => {
        const pathToSegment = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const route = routes.find(route => pathToSegment.includes(route.path)) || { name: segment };

        return {
            path: pathToSegment,
            name: route.name || segment,
        };
    });

    return breadcrumbs;
};

const LinkHierarchy: React.FC = () => {
    const location = useLocation(); // Access the current location (URL path)
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    return (
        <nav className="my-4 px-4">
            <ul className="flex space-x-2 text-sm text-gray-700">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="flex items-center">
                        <Link
                            to={breadcrumb.path}
                            className="hover:text-blue-600 transition duration-200"
                        >
                            {breadcrumb.name}
                        </Link>
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-2 text-gray-500">/</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LinkHierarchy;