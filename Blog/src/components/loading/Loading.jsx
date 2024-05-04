import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader animate-spin ease-linear rounded-full border-8 border-t-8 border-gray-200 border-t-black h-24 w-24"></div>
        </div>
    );
};

export default Loading;
