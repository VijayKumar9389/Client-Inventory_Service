import React, { useState, useEffect, useCallback } from 'react';
import { IconType } from 'react-icons';
import { MdClose } from 'react-icons/md';

interface ReusableButtonProps {
    onClick: () => void;
    label: string;
    Icon?: IconType; // Optional icon prop
    className?: string; // Optional className for additional styles
    disabled?: boolean; // Optional disabled state
    confirmationMessage?: string; // Optional confirmation message
}

const PrimaryButton: React.FC<ReusableButtonProps> = ({
                                                          onClick,
                                                          label,
                                                          Icon,
                                                          className = '',
                                                          disabled = false,
                                                          confirmationMessage,
                                                      }) => {
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        const handleBodyScroll = (event: Event): void => {
            event.preventDefault();
        };

        if (isConfirming) {
            document.body.classList.add('popup-open');
            document.body.addEventListener('touchmove', handleBodyScroll, { passive: false });
            document.body.addEventListener('wheel', handleBodyScroll, { passive: false });
        } else {
            document.body.classList.remove('popup-open');
            document.body.removeEventListener('touchmove', handleBodyScroll);
            document.body.removeEventListener('wheel', handleBodyScroll);
        }

        return (): void => {
            document.body.classList.remove('popup-open');
            document.body.removeEventListener('touchmove', handleBodyScroll);
            document.body.removeEventListener('wheel', handleBodyScroll);
        };
    }, [isConfirming]);

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
            {/* Main Button */}
            <button
                onClick={confirmationMessage ? handleConfirm : onClick}
                disabled={disabled}
                aria-label={label} // Add aria-label for better accessibility
                className={`inline-flex items-center justify-center ${
                    confirmationMessage
                        ? 'bg-cancel-color hover:bg-cancel-color-hover'
                        : 'bg-gradient-to-r from-primary-color to-secondary-color hover:from-primary-color-hover hover:to-secondary-color-hover'
                } text-white py-2 px-6 rounded-full shadow-md transition duration-300 
                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
            >
                {Icon && <Icon className="h-5 w-5 mr-3" />}
                <span className="font-medium text-sm sm:text-base">{label}</span>
            </button>

            {/* Confirmation Modal */}
            {isConfirming && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={handleCancel}
                    aria-labelledby="confirmation-modal"
                >
                    <div
                        className="bg-white w-11/12 sm:w-10/12 md:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2 p-6 rounded-lg shadow-lg relative transition-transform transform"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-labelledby="confirmation-modal-heading"
                        aria-describedby="confirmation-modal-description"
                    >
                        {/* Heading */}
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 id="confirmation-modal-heading" className="text-lg font-semibold text-gray-900">
                                Confirmation
                            </h3>
                            <button
                                aria-label="Close confirmation modal"
                                className="text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent hover:bg-gray-100 rounded-full p-2 transition-all"
                                onClick={handleCancel}
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        {/* Confirmation Message */}
                        <p id="confirmation-modal-description" className="text-gray-800 text-base mb-6">
                            {confirmationMessage}
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onClick={handleCancel}
                                aria-label="Cancel confirmation"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                onClick={handleConfirmation}
                                aria-label="Confirm action"
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

export default PrimaryButton;