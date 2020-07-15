import React from 'react';

const Button = ({ title, children, classes, clicked }) => {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 ${classes}`}
    >
      <button type="button" title={title} onClick={clicked}>
        {children}
      </button>
    </div>
  );
};

export default Button;
