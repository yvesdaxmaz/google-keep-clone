import React from 'react';

const TitledButton = ({ children, label, isExpanded, isActive }) => {
  return (
    <div className={`${!isExpanded ? 'px-4' : ''}`}>
      <div className="flex items-center text-gray-800 rounded-r-full h-12 transition duration-100">
        <button
          className={`flex items-center h-12 ${
            isExpanded
              ? 'px-4 w-full rounded-r-full'
              : 'justify-center w-12 rounded-full'
          }  ${isActive ? 'bg-orange-300' : 'hover:bg-gray-300'}`}
        >
          {children}
          {isExpanded && (
            <div className="ml-4 flex-grow font-bold text-sm text-left">
              {label}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TitledButton;
