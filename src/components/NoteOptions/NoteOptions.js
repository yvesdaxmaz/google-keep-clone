import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import PaletteButton from '../../UI/PaletteButton/PaletteButton';
import { FaRegBell, FaUserPlus, FaPalette, FaImage } from 'react-icons/fa';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import KeepContext from './../../context/KeepContext';

const NoteOptions = ({
  classes,
  large,
  change,
  archived,
  archive,
  unarchive,
}) => {
  const { archiveNote, unArchiveNote } = useContext(KeepContext);
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
        {!archived ? (
          <Button classes={spacingClasses} small clicked={archive}>
            <MdArchive />
          </Button>
        ) : (
          <Button classes={spacingClasses} small clicked={unarchive}>
            <MdUnarchive />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteOptions;
