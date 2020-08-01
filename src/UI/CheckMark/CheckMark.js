import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

const CheckMark = ({ clicked, altText, checked }) => {
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`checkmark relative flex items-center justify-center w-6 h-6 bg-gray-800 rounded-full ${
        checked ? 'text-white' : 'text-gray-600'
      }`}
      onClick={clicked}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BsCheck />
      {altText && hovered && (
        <div
          className={`absolute mt-6 top-0 left-0 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-700 text-white text-xs whitespace-no-wrap`}
        >
          {altText}
        </div>
      )}
    </button>
  );
};

export default CheckMark;
