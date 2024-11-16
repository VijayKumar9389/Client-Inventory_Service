import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaCubes } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { GiToolbox } from 'react-icons/gi';
import { AiOutlineAudit } from 'react-icons/ai';
import { FaBox } from 'react-icons/fa6';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { path: '/', name: 'Dashboard', icon: <MdDashboard className="text-xl" /> },
        { path: '/users', name: 'Users', icon: <FaUsers className="text-xl" /> },
        { path: '/locations', name: 'Locations', icon: <HiOutlineLocationMarker className="text-xl" /> },
        { path: '/tools', name: 'Tools', icon: <GiToolbox className="text-xl" /> },
        { path: '/materials', name: 'Materials', icon: <FaCubes className="text-xl" /> },
        { path: '/audit-logs', name: 'History', icon: <AiOutlineAudit className="text-xl" /> },
    ];

    return (
        <div className="w-64 bg-card-background-color text-text-primary h-screen flex flex-col sticky top-0 shadow-lg">
            <div className="p-4 flex items-center border-b border-border-color">
                <FaBox className="text-primary-color text-2xl" />
                <h3 className="font-semibold ml-2">Supply Flow</h3>
            </div>
            <nav className="flex-grow mt-4">
                <ul className="space-y-2 p-4">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    location.pathname === link.path
                                        ? 'bg-primary-color text-white'
                                        : 'text-text-primary hover:bg-card-background-hover-color hover:text-primary-color'
                                }`}
                            >
                                {link.icon}
                                <span className="ml-3">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4">
                <p className="text-sm text-text-muted text-center">&copy; 2024 Inventory App</p>
            </div>
        </div>
    );
};

export default Sidebar;