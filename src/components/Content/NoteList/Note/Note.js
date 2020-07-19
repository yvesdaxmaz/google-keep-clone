import React, { useState, useEffect, useRef } from 'react';
import Button from './../../../../UI/Button/Button';
import { FaRegCheckSquare, FaImage } from 'react-icons/fa';
import { RiPushpin2Line } from 'react-icons/ri';
import ContentEditable from 'react-contenteditable';
import NoteOptions from './../../../NoteOptions/NoteOptions';
import NoteParameters from '../../../NoteParemeters/NoteParameters';
import Badge from './../../../../UI/Badge/Badge';

const Note = ({ classes, note, clicked }) => {
  const [searchLabel, setSearchLabel] = useState('');
  const [bgColor, setBgColor] = useState('bg-white');
  const [checked, setChecked] = useState(false);
  const [labels, setLabels] = useState(['javascript', 'tailwind', 'node']);
  const wrapperRef = useRef(null);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleSearchLabel = searchTerm => {
    setSearchLabel(searchTerm);
  };

  const handleChangeBackground = bgColor => {
    setBgColor(bgColor);
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    }
  };
  let filteredLabels = labels;
  if (searchLabel !== '') {
    filteredLabels = labels.filter(l =>
      l.toLowerCase().includes(searchLabel.toLowerCase()),
    );
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  return (
    <div
      className=" w-full max-w-2xl mx-auto "
      onClick={clicked}
      ref={wrapperRef}
    >
      <div className={`${bgColor} rounded shadow border-2 border-gray-300 p-4`}>
        <div className="">
          <div className="flex items-start" style={{ wordWrap: 'anywhere' }}>
            <span className="flex-grow mr-2 text-sm font-semibold text-gray-600">
              {note.title}
            </span>
            <Button classes="" small>
              <RiPushpin2Line size="1.2em" />
            </Button>
          </div>
          <div className="text-sm mb-2">
            <span className="w-full text-gray-600">{note.content}</span>
          </div>
          {note.selectedLabels && (
            <div className="mt-4 mb-2">
              <ul className="flex flex-wrap">
                {note.selectedLabels.map(l => (
                  <li className="flex mr-2" key={l}>
                    <Badge label={l} clicked={() => {}} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center">
          <NoteOptions large change={handleChangeBackground} />
        </div>
      </div>
    </div>
  );
};

export default Note;
