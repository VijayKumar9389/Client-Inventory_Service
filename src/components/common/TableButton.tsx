import React, { useState, useCallback } from 'react';
import { IconType } from 'react-icons';
import { MdClose } from 'react-icons/md';

interface TableButtonProps {
    onClick: () => void;
    label: string;
    Icon?: IconType; // Optional icon prop
    disabled?: boolean; // Optional disabled state
    confirmationMessage?: string; // Optional confirmation message
}

const TableButton: React.FC<TableButtonProps> = ({
                                                     onClick,
                                                     label,
                                                     Icon,
                                                     disabled = false,
                                                     confirmationMessage,
                                                 }) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = useCallback((): void => {
        setIsConfirming(true);
    }, []);

    const handleCancel = useCallback((): void => {
        setIsConfirming(false);
    }, []);

    const handleConfirmation = useCallback((): void => {
        setIsConfirming(false);
        onClick();
    }, [onClick]);

    return (
        <>
            {/* Table Button */}
            <button
                onClick={confirmationMessage ? handleConfirm : onClick}
                disabled={disabled}
                className={`px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
                aria-label={label}
            >
                {Icon && <Icon className="inline-block mr-2 text-base" />}
                {label}
            </button>

            {/* Confirmation Modal */}
            {isConfirming && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCancel}
                    aria-labelledby="confirmation-modal"
                >
                    <div
                        className="bg-white w-1/3 p-6 rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-labelledby="confirmation-modal-heading"
                        aria-describedby="confirmation-modal-description"
                    >
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 id="confirmation-modal-heading" className="text-lg font-semibold">
                                Confirmation
                            </h3>
                            <button
                                aria-label="Close confirmation modal"
                                className="text-gray-500 hover:text-black"
                                onClick={handleCancel}
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        <p id="confirmation-modal-description" className="mb-6">
                            {confirmationMessage}
                        </p>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmation}
                                className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableButton;
