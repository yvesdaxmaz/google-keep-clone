import React, { useState } from 'react';
import Button from './../Button/Button';
import { FaPalette } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';

const PaletteButton = ({ classes, clicked, spacing, small, change }) => {
  const [hovered, setHovered] = useState(false);
  const [color, setColor] = useState('bg-white');
  const colors = [
    'bg-white',
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-teal-300',
    'bg-green-300',
    'bg-blue-200',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-red-200',
    'bg-yellow-700',
    'bg-gray-300',
  ];

  const handleChangeColor = color => {
    setColor(color);
    change(color);
  };
  const handleMouseEntered = () => {
    setHovered(true);
  };

  const handleMouseLeaved = () => {
    setHovered(false);
  };

  return (
    <div
      className={`relative ${spacing}`}
      onMouseEnter={handleMouseEntered}
      onMouseLeave={handleMouseLeaved}
    >
      <Button small={small}>
        <FaPalette />
      </Button>
      <div
        className={`${
          hovered ? '' : 'hidden'
        } absolute z-50 top-10 w-32 left-0 white rounded border shadow`}
      >
        <div className="grid grid-cols-4 grid-rows-3 gap-2 p-2 bg-white">
          {colors.map(c => (
            <div
              className={`h-6 w-6 ${c} flex items-center justify-center rounded-full border ${
                color === c
                  ? 'border-gray-800'
                  : c === 'bg-white'
                  ? 'border-gray-600'
                  : 'border-transparent'
              }`}
              key={c}
              onClick={() => handleChangeColor(c)}
            >
              {color === c && <BsCheck />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteButton;
