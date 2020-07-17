import React from 'react';
import Button from '../../UI/Button/Button';
import PaletteButton from '../../UI/PaletteButton/PaletteButton';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  FaRegBell,
  FaUserPlus,
  FaPalette,
  FaImage,
  FaArchive,
} from 'react-icons/fa';

const NoteOptions = ({ classes, large, change }) => {
  let spacingClasses = `${large ? 'mr-4' : 'mr-2'}`;
  return (
    <div className={classes}>
      <div className="flex">
        <Button classes={spacingClasses} small>
          <FaRegBell />
        </Button>
        <Button classes={spacingClasses} small>
          <FaUserPlus />
        </Button>
        <PaletteButton spacing={spacingClasses} small change={change}>
          <FaPalette />
        </PaletteButton>
        <Button classes={spacingClasses} small>
          <FaImage />
        </Button>
        <Button classes={spacingClasses} small>
          <FaArchive />
        </Button>
      </div>
    </div>
  );
};

export default NoteOptions;
