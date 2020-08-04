import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import PaletteButton from '../../UI/PaletteButton/PaletteButton';
import {
  FaRegBell,
  FaUserPlus,
  FaPalette,
  FaImage,
  FaTrash,
  FaTrashRestore,
} from 'react-icons/fa';
import { MdArchive, MdUnarchive } from 'react-icons/md';
import KeepContext from '../../context/KeepContext';

const NoteOptions = ({
  classes,
  large,
  change,
  archived,
  archive,
  deleted,
  unarchive,
  noteId,
}) => {
  const { hardDeleteNote, restaureNote } = useContext(KeepContext);
  let spacingClasses = `${large ? 'mr-4' : 'mr-2'}`;

  const handleDelete = () => {
    hardDeleteNote(noteId);
    console.log('deleted');
  };

  const handleRestaure = () => {
    restaureNote(noteId);
  };

  if (deleted) {
    return (
      <div className={classes}>
        <div className="flex">
          <Button
            classes={spacingClasses}
            small
            altText="Supprimer définitivement"
            clicked={handleDelete}
          >
            <FaTrash />
          </Button>
          <Button
            classes={spacingClasses}
            small
            altText="Restaurer"
            clicked={handleRestaure}
          >
            <FaTrashRestore />
          </Button>
        </div>
      </div>
    );
  } else {
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
  }
};

export default NoteOptions;
