import React, { useState } from 'react';
import Note from './Note/Note';

const note = {
  id: 1,
  title: 'Note in next label',
  content: 'this not is for testing purpose',
  selectedLabels: ['javascript', 'tailwindcss'],
  bgColor: 'white',
};

const NoteList = ({ classes }) => {
  return (
    <div className={`${classes} py-4 `}>
      <Note note={note} />
    </div>
  );
};

export default NoteList;
