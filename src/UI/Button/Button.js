import React from 'react';

const Button = ({ title, children, classes }) => {
  return (
    <div
      className={`flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 ${classes}`}
    >
      <button type="button" title={title}>
        {children}
      </button>
    </div>
  );
};

export default Button;
