import React from 'react';
import logo from './../../keep_logo.png';

const Logo = ({ name }) => (
  <div className="flex items-center">
    <img src={logo} alt="" className="h-10 w-10 mr-2" />
    {name && <span className="text-xl text-gray-800 font-light">{name}</span>}
  </div>
);

export default Logo;
