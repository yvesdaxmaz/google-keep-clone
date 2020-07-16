import React from 'react';
import logo from './../../keep_logo.png';

const Logo = ({ name }) => (
  <div className="flex items-center">
    {!name || name === '' ? (
      <>
        <img src={logo} alt="" className="h-10 w-10 mr-2" />
        <span className="text-xl text-gray-800 font-light">Keep</span>
      </>
    ) : (
      <span className="text-xl text-gray-800 font-light">{name}</span>
    )}
  </div>
);

export default Logo;
