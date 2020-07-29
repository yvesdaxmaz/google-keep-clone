import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Note from './Note/Note';
import KeepContext from './../../../context/KeepContext';
import { AiOutlineBulb } from 'react-icons/ai';

const NoteList = ({ classes, location }) => {
  const { grid, notes } = useContext(KeepContext);

  let filteredNotes = [
    ...notes.filter(note => !note.archived && !note.deleted),
  ];

  let labelPathPatern = /\/label\/(.+)/;
  let isMatch = location.pathname.match(labelPathPatern);
  if (isMatch) {
    filteredNotes = filteredNotes.filter(note =>
      note.selectedLabels.includes(isMatch[1]),
    );
  }

  let archivePathPatern = /\/archive/;
  let isArchive = location.pathname.match(archivePathPatern);
  if (isArchive) {
    filteredNotes = [...notes.filter(n => n.archived && !n.deleted)];
  }

  let trashPathPatern = /\/trash/;
  let isTrash = location.pathname.match(trashPathPatern);
  if (isTrash) {
    filteredNotes = [...notes.filter(n => n.deleted === true)];
  }

  return (
    <>
      {filteredNotes.length > 0 ? (
        <div
          className={`${classes} py-4 ${
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
            <AiOutlineBulb size="8em" className="mx-auto" />
            <span className="text-xl mt-8">
              Les notes ajoutées s'affichent ici.
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(NoteList);
