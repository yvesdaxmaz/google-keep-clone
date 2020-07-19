import React, { useContext } from 'react';
import Button from './../../UI/Button/Button';
import Logo from './../../UI/Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import Options from './Options/Options';
import { BsList } from 'react-icons/bs';

const Header = props => {
  return (
    <div className="border-b border-gray-300 shadow">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <Button classes="mr-2" clicked={props.expandSidebar}>
            <BsList size="1.5em" />
          </Button>
          <Logo name={props.name} />
        </div>

        <SearchBar
          isFocused
          classes="w-auto md:w-full md:max-w-sm ml-auto md:mx-auto lg:ml-24 sm:block lg:max-w-2xl"
        />

        <Options />
      </div>
    </div>
  );
};

export default Header;
