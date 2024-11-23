import {useLocation, Link} from "react-router-dom";
import {ReactNode} from "react";


interface LinkItem {
    path: string;      // The route path for the link
    name: string;      // Display name of the link
    icon: ReactNode;   // JSX element for the link icon
}


const MobileMenu = ({ isOpen, links, closeMenu }: { isOpen: boolean; links: LinkItem[]; closeMenu: () => void }) => {
    const location = useLocation();
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
        >
            <div
                className="bg-white w-2/3 h-full shadow-lg transform transition-transform animate-slideInRight"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <button
                        onClick={closeMenu}
                        className="text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col space-y-4 p-4">
                    {links.map(({path, name}) => (
                        <Link
                            key={name}
                            to={path}
                            className={`flex items-center text-lg font-medium px-3 py-2 rounded-lg ${
                                location.pathname === path
                                    ? "bg-primary-color text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;