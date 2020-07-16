import React, { useState } from 'react';
import Button from './../../../UI/Button/Button';
import { FaRegCheckSquare, FaImage } from 'react-icons/fa';
import { RiPushpin2Line } from 'react-icons/ri';
import ContentEditable from 'react-contenteditable';

const NoteForm = ({ classes, isTyping, clicked }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const handleTitleChange = event => {
    let title = event.target.value;
    if (title === '<br>') {
      setTitle('');
    } else {
      setTitle(title);
    }
  };

  const handleNoteChange = event => {
    let note = event.target.value;
    if (note === '<br>') {
      setNote('');
    } else {
      setNote(note);
    }
  };

  return (
    <div className=" w-full max-w-2xl mx-auto " onClick={clicked}>
      <div className="rounded shadow border-2 border-gray-300 px-4">
        {!isTyping ? (
          <div className="flex items-center text-gray-600 h-10">
            <span className="text-sm font-bold flex-grow">
              Crée une note...
            </span>
            <Button classes="mr-2">
              <FaRegCheckSquare size="1.2em" />
            </Button>
            <Button classes="">
              <FaImage size="1.2em" />
            </Button>
          </div>
        ) : (
          <div className="">
            <div
              className="relative flex items-start mb-2"
              style={{ wordWrap: 'anywhere' }}
            >
              {!title && (
                <span className="absolute w-full text-sm font-semibold text-gray-600 mt-2">
                  Title
                </span>
              )}
              <ContentEditable
                html={title}
                onChange={handleTitleChange}
                className={`${title === '' &&
                  'h-8'} z-10 flex-grow mr-1 mt-2 text-sm font-semibold text-gray-800 `}
              />
              <Button classes="">
                <RiPushpin2Line size="1.2em" />
              </Button>
            </div>
            <div
              className="relative text-sm mb-2"
              style={{ wordWrap: 'anywhere' }}
            >
              {!note && (
                <span className="absolute h-6 w-full text-gray-800">
                  Créer une note...
                </span>
              )}

              <ContentEditable
                html={note}
                onChange={handleNoteChange}
                className={`${note === '' && 'h-6'} z-10 text-gray-800`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
