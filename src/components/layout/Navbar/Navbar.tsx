import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCubes, FaLocationDot, FaUsers, FaWrench } from "react-icons/fa6";
import { AiOutlineAudit } from "react-icons/ai";
import MobileMenu from "./MobileMenu.tsx";

interface NavLink {
    path: string; // Base route path for the link
    name: string; // Display name of the link
    icon: ReactNode; // JSX element for the link icon
}

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const links: NavLink[] = [
        { path: "/", name: "Dashboard", icon: <MdDashboard className="text-2xl" /> },
        { path: "/site", name: "Sites", icon: <FaLocationDot className="text-2xl" /> },
        { path: "/tools", name: "Tools", icon: <FaWrench className="text-2xl" /> },
        { path: "/materials", name: "Materials", icon: <FaCubes className="text-2xl" /> },
        { path: "/users", name: "Users", icon: <FaUsers className="text-2xl" /> },
        { path: "/audit-logs", name: "History", icon: <AiOutlineAudit className="text-2xl" /> },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === path; // Match exact for root path
        }
        return location.pathname.startsWith(path); // Match partial for other paths
    };

    return (
        <header className="sticky top-0 bg-card-background-color text-text-primary shadow-lg z-50 border-b border-border-color">
            <div className="flex justify-between items-center p-3">
                {/* Logo Section */}
                <div className="flex items-center">
                    <div className="bg-primary-color rounded-full h-8 w-8 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span> {/* Replace with your logo */}
                    </div>
                    <h1 className="ml-2 font-bold text-lg">Synced Supplies</h1>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="lg:hidden block text-primary-color focus:outline-none"
                >
                    <span className="sr-only">Open Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Navigation Links for Desktop */}
                <nav className="hidden lg:flex space-x-4">
                    {links.map(({ path, name, icon }) => (
                        <Link
                            key={name}
                            to={path}
                            className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                isActive(path)
                                    ? "bg-primary-color text-white shadow-lg"
                                    : "text-text-primary hover:bg-primary-color/10 hover:text-primary-color"
                            }`}
                        >
                            {icon}
                            <span>{name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile Sliding Menu */}
            <MobileMenu
                isOpen={menuOpen}
                links={links}
                closeMenu={() => setMenuOpen(false)}
            />
        </header>
    );
};

export default Navbar;