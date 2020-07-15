import React from 'react';

const Avatar = ({ classes, imgSrc }) => (
  <div
    className={`flex items-center justify-center h-10 w-10 p-1 rounded-full hover:bg-gray-200 ${classes} overflow-hidden`}
  >
    <img src={imgSrc} alt="" className="w-full h-full rounded-full" />
  </div>
);
export default Avatar;
