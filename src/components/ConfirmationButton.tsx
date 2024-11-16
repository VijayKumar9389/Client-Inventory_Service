import {useState, FC, useEffect} from 'react';
import {MdClose} from "react-icons/md";

interface ConfirmationButtonProps {
    buttonText: string;
    confirmationMessage: string;
    onConfirm: () => void;
}

const ConfirmationButton: FC<ConfirmationButtonProps> = ({ buttonText, confirmationMessage, onConfirm }) => {
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

    const handleConfirm = (): void => {
        setIsConfirming(true);
    };

    const handleCancel = (): void => {
        setIsConfirming(false);
    };

    const handleConfirmation = (): void => {
        setIsConfirming(false);
        onConfirm();
    };

    return (
        <>
            {/* Main Button */}
            <button
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                type="button"
                onClick={handleConfirm}
            >
                {buttonText}
            </button>

            {/* Confirmation Modal */}
            {isConfirming && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={handleCancel}
                >
                    <div
                        className="bg-white w-11/12 sm:w-10/12 md:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2 p-6 rounded-lg shadow-lg relative transition-transform transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Heading */}
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Confirmation
                            </h3>
                            <button
                                className="text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-300 bg-transparent hover:bg-gray-100 rounded-full p-2 transition-all"
                                onClick={handleCancel}
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        {/* Confirmation Message */}
                        <p className="text-gray-800 text-base mb-6">
                            {confirmationMessage}
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                                onClick={handleConfirmation}
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

export default ConfirmationButton;

