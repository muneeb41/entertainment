// NoPageFound.jsx

import React from 'react';

const NoPageFound = () => {
  return (
    // this component show when no route are match 
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700 dark:text-white">Oops! Page not found.</p>
        <p className="mt-2 text-gray-600 dark:text-white">The page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NoPageFound;
