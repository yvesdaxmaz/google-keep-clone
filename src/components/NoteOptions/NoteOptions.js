import React from 'react';
import Button from '../../UI/Button/Button';
import PaletteButton from '../../UI/PaletteButton/PaletteButton';
import { FaRegBell, FaUserPlus, FaPalette, FaImage } from 'react-icons/fa';
import { MdArchive, MdUnarchive } from 'react-icons/md';

const NoteOptions = ({
  classes,
  large,
  change,
  archived,
  archive,
  unarchive,
}) => {
  let spacingClasses = `${large ? 'mr-4' : 'mr-2'}`;
  return (
    <div className={classes}>
      <div className="flex">
        <Button classes={spacingClasses} small altText="M'envoyer un rappel">
          <FaRegBell />
        </Button>
        <Button classes={spacingClasses} small altText="Collaborateur">
          <FaUserPlus />
        </Button>
        <PaletteButton
          spacing={spacingClasses}
          small
          change={change}
          altText="Modifier la couleur"
        >
          <FaPalette />
        </PaletteButton>
        <Button classes={spacingClasses} small altText="Ajouter une image">
          <FaImage />
        </Button>
        {!archived ? (
          <Button
            classes={spacingClasses}
            small
            clicked={archive}
            altText="Archiver"
          >
            <MdArchive />
          </Button>
        ) : (
          <Button
            classes={spacingClasses}
            small
            clicked={unarchive}
            altText="Annuler l'archivage"
          >
            <MdUnarchive />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteOptions;
