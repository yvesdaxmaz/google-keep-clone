import React, { useState, useContext } from 'react';
import Note from './Note/Note';
import KeepContext from './../../../context/KeepContext';

const NoteList = ({ classes }) => {
  const { notes } = useContext(KeepContext);
  return (
    <div className={`${classes} py-4 `}>
      {notes.map(note => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
};

export default NoteList;
