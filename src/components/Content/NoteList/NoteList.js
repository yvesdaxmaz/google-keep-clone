import React, { useContext } from 'react';
import Note from './Note/Note';
import KeepContext from './../../../context/KeepContext';
import { AiOutlineBulb } from 'react-icons/ai';

const NoteList = ({ classes }) => {
  const { grid, notes } = useContext(KeepContext);
  return (
    <>
      {notes.length > 0 ? (
        <div
          className={`${classes} py-4 ${
            grid
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'
              : ''
          }`}
        >
          {notes.map((note, i) => (
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

export default NoteList;
