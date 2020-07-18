import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Badge = ({ classes, label, clicked }) => {
  const [hovered, setHovered] = useState(false);
  const handleHovered = () => {
    setHovered(!hovered);
  };

  return (
    <div
      className={`relative ${classes}`}
      onMouseEnter={handleHovered}
      onMouseLeave={handleHovered}
    >
      <div className="px-2 py-1 bg-gray-300 text-xs rounded-full overflow-hidden">
        {label}
      </div>
      {hovered && (
        <div className="flex absolute top-0 right-0 h-6 bg-gray-300 rounded-r-full">
          <span className="">...</span>
          <div
            className="flex items-center justify-center rounded-full h-6 w-6 hover:bg-gray-400"
            onClick={() => clicked(label)}
          >
            <FaTimes size="0.8em" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Badge;
