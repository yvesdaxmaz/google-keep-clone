import React, { useContext } from 'react';
import Button from './../../UI/Button/Button';
import Logo from './../../UI/Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import Options from './Options/Options';
import { BsList } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import KeepContext from './../../context/KeepContext';
import { CSSTransition } from 'react-transition-group';

const Header = props => {
  const { selectedNotes, clearSelectedNotes } = useContext(KeepContext);
  return (
    <div className="relative border-b border-gray-300 shadow">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <Button
            classes="mr-2"
            clicked={props.expandSidebar}
            altText="Menu Principale"
          >
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

      {selectedNotes.length >= 1 && (
        <CSSTransition
          appear={selectedNotes.length >= 1}
          exit={selectedNotes.length < 1}
          in={selectedNotes.length >= 1}
          timeout={75}
          unmountOnExit
          classNames={{
            appear: '-translate-y-full',
            appearActive: 'translate-y-0',
            appearDone: 'translate-y-0',
            exit: '-translate-0-full',
            exitActive: 'translate-y-full',
            exitDone: 'translate-y-full',
          }}
        >
          <div className="absolute flex px-4 items-center top-0 w-full h-full z-10 bg-white transform transition transition-transform ease-in-out duration-75">
            <div className="flex items-center text-gray-600">
              <Button clicked={clearSelectedNotes}>
                <FaTimes size="1.5em" />
              </Button>
              <span className="ml-8 text-xl">
                {selectedNotes.length > 1
                  ? `${selectedNotes.length} éléments sélectionnés`
                  : `${selectedNotes.length} élément sélectionné`}
              </span>
            </div>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default Header;
