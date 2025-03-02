import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('light-theme');
    return () => {
      document.documentElement.classList.remove('light-theme');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative mb-12">
          {/* Abstract Graphic */}
          <svg
            className="w-72 h-72 mx-auto animate-float"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" fill="#E0E7FF" />
            <circle cx="140" cy="70" r="20" fill="#A5B4FC" />
            <path
              d="M50 100 Q 75 80 100 100 Q 125 120 150 100"
              stroke="#818CF8"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          {/* 404 Number */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-blue-500 select-none">
            404
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Lost in Digital Space
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            The page you're looking for has either drifted into orbit or never existed. 
            Let's get you back to familiar territory.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-indigo-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 shadow-indigo-100"
        >
          Return to Home
        </button>

   
      </div>
    </div>
  );
};

export default NotFound;