import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from './../../../../UI/Button/Button';
import { RiPushpin2Line } from 'react-icons/ri';
import NoteOptions from './../../../NoteOptions/NoteOptions';
import NoteParameters from '../../../NoteParemeters/NoteParameters';
import Badge from './../../../../UI/Badge/Badge';
import KeepContext from './../../../../context/KeepContext';
const Note = ({ classes, note, clicked }) => {
  const { labels, selectLabel } = useContext(KeepContext);
  const [searchLabel, setSearchLabel] = useState('');
  const [bgColor, setBgColor] = useState('bg-white');
  const [checked, setChecked] = useState(false);
  const wrapperRef = useRef(null);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleSelectLabel = label => {
    let selected = [...note.selectedLabels];
    if (selected.indexOf(label) !== -1) {
      selected = selected.filter(l => l !== label);
    } else {
      selected = [...selected, label];
    }
    selectLabel(note.id, selected);
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
                    <Badge label={l} clicked={() => handleSelectLabel(l)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center">
          <NoteOptions large change={handleChangeBackground} />
          <NoteParameters
            note={note}
            selectedLabels={note.selectedLabels}
            selectLabel={handleSelectLabel}
            checked={checked}
            check={handleChecked}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
