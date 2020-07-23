import React, { useContext } from 'react';
import { MdRefresh, MdViewList } from 'react-icons/md';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import Button from './../../../UI/Button/Button';
import Avatar from './../../../UI/Avatar/Avatar';
import profileImg from './../../../profile.jpg';
import KeepContext from './../../../context/KeepContext';

const Options = props => {
  const { grid, switchLayout } = useContext(KeepContext);
  return (
    <div className="flex items-center">
      <Button classes="mr-1">
        <MdRefresh size="1.5em" />
      </Button>
      <Button classes="mr-1" clicked={switchLayout}>
        {!grid ? <BsGrid3X3Gap size="1.5em" /> : <MdViewList size="1.5em" />}
      </Button>

      <Button classes="mr-2">
        <FaCog size="1.5em" />
      </Button>

      <Avatar imgSrc={profileImg} />
    </div>
  );
};

export default Options;
