import React from 'react';


const Balance = ({ value, loading, error }) => {
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };

    return (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Your Balance</h2>
            
            {error ? (
                <div className="text-red-200 text-sm">
                    {error}
                </div>
            ) : loading ? (
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300/50 rounded w-48"></div>
                </div>
            ) : (
                <p className="text-4xl font-bold text-white">
                    {formatBalance(value)}
                </p>
            )}
        </div>
    );
};

export default Balance;