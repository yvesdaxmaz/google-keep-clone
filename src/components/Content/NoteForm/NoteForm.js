import React, { useState } from 'react';
import Button from './../../../UI/Button/Button';
import { FaRegCheckSquare, FaImage } from 'react-icons/fa';
import { RiPushpin2Line } from 'react-icons/ri';
import ContentEditable from 'react-contenteditable';
import NoteOptions from '../../NoteOptions/NoteOptions';
import NoteParameters from './NoteParemeters/NoteParameters';

const NoteForm = ({ classes, isTyping, clicked, endTyping }) => {
  const [title, setTitle] = useState('');
  const [searchLabel, setSearchLabel] = useState('');
  const [labels, setLabels] = useState([
    'javascript',
    'Projects',
    'Reactjs',
    'twailwindcss',
  ]);
  const [selectedLabels, setSelectedLabel] = useState(['javascript']);
  const [note, setNote] = useState('');
  const [bgColor, setBgColor] = useState('bg-white');

  const handleTitleChange = event => {
    let title = event.target.value;
    if (title === '<br>') {
      setTitle('');
    } else {
      setTitle(title);
    }
  };

  const handleCloseForm = () => {
    setTitle('');
    setNote('');
    setBgColor('bg-white');
    endTyping();
  };

  const handleSearchLabel = searchTerm => {
    setSearchLabel(searchTerm);
  };

  const handleAddLabel = () => {
    setLabels([...labels, searchLabel]);
  };

  const selectLabel = label => {
    let selected = [...selectedLabels];
    if (selected.indexOf(label) !== -1) {
      selected = selected.filter(l => l !== label);
    } else {
      selected = [...selected, label];
    }
    setSelectedLabel(selected);
  };

  const handleNoteChange = event => {
    let note = event.target.value;
    if (note === '<br>') {
      setNote('');
    } else {
      setNote(note);
    }
  };

  const handleChangeBackground = bgColor => {
    setBgColor(bgColor);
  };

  let filteredLabels = labels;

  if (searchLabel !== '') {
    filteredLabels = labels.filter(l =>
      l.toLowerCase().includes(searchLabel.toLowerCase()),
    );
  }

  return (
    <div className=" w-full max-w-2xl mx-auto " onClick={clicked}>
      <div
        className={`${bgColor} rounded shadow border-2 border-gray-300 px-4`}
      >
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
            {selectedLabels && (
              <div className="mt-4 mb-2">
                <ul className="flex flex-wrap">
                  {selectedLabels.map(l => (
                    <li className="flex mr-2">
                      <div className="relative px-2 py-1 bg-gray-300 text-xs rounded-full">
                        {l}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between mb-2">
              <NoteOptions large change={handleChangeBackground} />
              <NoteParameters
                labels={filteredLabels}
                search={handleSearchLabel}
                searchTerm={searchLabel}
                addLabel={handleAddLabel}
                selectedLabels={selectedLabels}
                selectLabel={selectLabel}
              />
              <Button
                classes={'ml-auto'}
                texted
                title="Fermer"
                clicked={handleCloseForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
