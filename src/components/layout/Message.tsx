import React from 'react';

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className='text-red-600 p-4 border border-red-400 bg-red-100 rounded'>
        {message}
    </div>
);

type LoadingMessageProps = {
    message?: string;
};

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message = 'Loading...' }) => (
    <div className='text-center p-4'>
        {message}
    </div>
);

const WarningMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className='text-yellow-600 p-4 border border-yellow-400 bg-yellow-100 rounded'>
        {message}
    </div>
);

export { ErrorMessage, LoadingMessage, WarningMessage };