import React, { useState } from 'react';

const Button = ({
  title,
  altText,
  children,
  classes,
  clicked,
  texted,
  small,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  if (texted) {
    return (
      <button
        className={`flex flex-shrink-0 text-gray-800 font-bold items-center px-4 py-1 hover:bg-gray-200 ${classes}`}
        onClick={clicked}
      >
        {title}
      </button>
    );
  } else {
    return (
      <button
        className={`relative flex flex-shrink-0 items-center justify-center ${
          small ? 'h-8 w-8' : 'h-10 w-10'
        } rounded-full hover:bg-gray-200 ${classes}`}
        onClick={clicked}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {children}
        {altText && hovered && (
          <div
            className={`${
              small ? 'mt-8' : 'mt-10'
            } absolute top-0 left-0 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-700 text-white text-xs whitespace-no-wrap`}
          >
            {altText}
          </div>
        )}
      </button>
    );
  }
};

export default Button;
