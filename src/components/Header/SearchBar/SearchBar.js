import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import Button from './../../../UI/Button/Button';

const SearchBar = ({ classes, isFocused }) => {
  return (
    <div className={classes}>
      <Button classes="md:hidden">
        <BsSearch size="1.2em" />
      </Button>
      <div
        className={`hidden md:flex items-center px-4 py-1 ${
          isFocused ? 'bg-white' : 'bg-gray-300'
        } rounded-full w-10 h-10 md:w-full md:h-full md:rounded shadow`}
      >
        <div>
          <BsSearch className="text-gray-600" size="1.2em" />
        </div>
        <input
          type="text"
          className="hidden md:block w-full text-gray-800 h-8 mx-2 bg-transparent"
          placeholder="Recherche"
        />

        <div>
          <FaTimes className="hidden md:block text-gray-600" size="1.2" />
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
