import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Note from './Note/Note';
import KeepContext from './../../../context/KeepContext';
import { AiOutlineBulb } from 'react-icons/ai';
import { FaArchive, FaTrash } from 'react-icons/fa';

const NoteList = ({ classes, location }) => {
  const { grid, notes } = useContext(KeepContext);

  let filteredNotes = [
    ...notes.filter(note => !note.archived && !note.deleted),
  ];

  let labelPathPatern = /\/label\/(.+)/;
  let isMatch = location.pathname.match(labelPathPatern);
  if (isMatch) {
    filteredNotes = [...notes].filter(
      note => note.selectedLabels.includes(isMatch[1]) && !note.deleted,
    );
  }

  let pinnedExists = filteredNotes.some(el => el.pinned);
  let pinnedNotes = [];
  if (pinnedExists) {
    pinnedNotes = [...filteredNotes].filter(n => n.pinned);
    filteredNotes = filteredNotes.filter(n => !n.pinned);
  }

  let archivedNotes = [];
  let archivedExists = false;

  let archivePathPatern = /\/archive/;
  let isArchive = location.pathname.match(archivePathPatern);
  if (isArchive) {
    pinnedExists = false;
    filteredNotes = [
      ...notes.filter(n => n.archived && !n.pinned && !n.deleted),
    ];
  } else {
    archivedExists = filteredNotes.some(el => el.archived);
    if (archivedExists) {
      archivedNotes = [...filteredNotes].filter(n => n.archived);
      filteredNotes = filteredNotes.filter(n => !n.archived);
    }
  }

  let trashPathPatern = /\/trash/;
  let isTrash = location.pathname.match(trashPathPatern);
  if (isTrash) {
    archivedExists = false;
    pinnedExists = false;
    filteredNotes = [...notes.filter(n => n.deleted === true)];
  }

  return (
    <>
      {pinnedExists && (
        <>
          <div className={`w-full ${grid ? '' : 'max-w-2xl'} mx-auto mt-4`}>
            <div className="px-4 text-xs text-gray-600 font-bold uppercase">
              Note épinglées
            </div>
          </div>
          <div
            className={`${classes} ${!pinnedExists ? 'py-4' : ''} ${
              grid
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
                : ''
            }`}
          >
            {pinnedNotes.map((note, i) => (
              <Note note={note} key={i} />
            ))}
          </div>
        </>
      )}

      {pinnedExists && filteredNotes.length > 0 && (
        <div className={`w-full ${grid ? '' : 'max-w-2xl'} mx-auto mt-4`}>
          <div className="px-4 text-xs text-gray-600 font-bold uppercase">
            Autres
          </div>
        </div>
      )}

      {filteredNotes.length > 0 || pinnedExists ? (
        <div
          className={`${classes} ${!pinnedExists ? 'py-4' : ''} ${
            grid
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
              : ''
          }`}
        >
          {filteredNotes.map((note, i) => (
            <Note note={note} key={i} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-600 text-center">
            {isTrash && (
              <>
                <FaTrash size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                  Aucune note dans la corbeille
                </span>
              </>
            )}

            {isArchive && (
              <>
                <FaArchive size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                  Vos notes archivées s'affichent ici.
                </span>
              </>
            )}

            {!isTrash && !isArchive && (
              <>
                <AiOutlineBulb size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                  Les notes ajoutées s'affichent ici.
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {archivedExists && archivedNotes.length > 0 && (
        <>
          <div className={`w-full ${grid ? '' : 'max-w-2xl'} mx-auto mt-4`}>
            <div className="px-4 text-xs text-gray-600 font-bold uppercase">
              Note archivées
            </div>
          </div>
          <div
            className={`${classes} ${!archivedExists ? 'py-4' : ''} ${
              grid
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
                : ''
            }`}
          >
            {archivedNotes.map((note, i) => (
              <Note note={note} key={i} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(NoteList);
