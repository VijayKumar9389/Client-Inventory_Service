import React from "react";
import { MdClose } from "react-icons/md";

interface DialogProps {
    isOpen: boolean;
    toggle: () => void;
    element: JSX.Element;
    heading: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, toggle, element, heading }) => {
    if (isOpen) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 transition-opacity duration-300 animate-fadeIn"
                onClick={toggle}
                role="dialog"
                aria-labelledby="dialog-title"
                aria-modal="true"
            >
                <div
                    className="bg-white w-11/12 rounded-lg shadow-lg relative transition-transform transform animate-slideUp"
                    onClick={(e) => e.stopPropagation()} // Stops click event from closing the dialog
                >
                    <div className="flex justify-between items-center border-b p-4 mb-4">
                        <h3 id="dialog-title" className="text-lg font-semibold text-gray-900">
                            {heading}
                        </h3>
                        <button
                            className="text-gray-500 hover:text-black  bg-transparent hover:bg-gray-100 rounded-full p-2 transition-all"
                            onClick={toggle}
                            aria-label="Close dialog"
                        >
                            <MdClose size={24}/>
                        </button>
                    </div>

                    <div className="overflow-auto px-4 max-h-[80vh]">{element}</div>
                </div>
            </div>
        );
    }

    return null;
};

export default Dialog;