import React, { useContext } from 'react';
import Note from './Note/Note';
import KeepContext from './../../../context/KeepContext';

const NoteList = ({ classes }) => {
  const { grid, notes } = useContext(KeepContext);
  return (
    <div
      className={`${classes} py-4 ${
        grid
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
          : ''
      }`}
    >
      {notes.map(note => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
};

export default NoteList;
