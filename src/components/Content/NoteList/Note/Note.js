import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from './../../../../UI/Button/Button';
import { RiPushpin2Line } from 'react-icons/ri';
import { TiPin } from 'react-icons/ti';
import NoteOptions from './../../../NoteOptions/NoteOptions';
import NoteParameters from '../../../NoteParemeters/NoteParameters';
import Badge from './../../../../UI/Badge/Badge';
import KeepContext from './../../../../context/KeepContext';
const Note = ({ classes, note, clicked }) => {
  const {
    grid,
    selectLabel,
    selectBg,
    archiveNote,
    unArchiveNote,
    pinnedNote,
  } = useContext(KeepContext);
  const [checked, setChecked] = useState(false);
  const wrapperRef = useRef(null);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleArchive = () => {
    archiveNote(note.id);
  };

  const handleUnarchive = () => {
    unArchiveNote(note.id);
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
    selectBg(note.id, bgColor);
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  return (
    <div
      className=" w-full max-w-2xl mx-auto mb-2"
      onClick={clicked}
      ref={wrapperRef}
    >
      <div
        className={`${note.bgColor} rounded shadow border-2 border-gray-300 p-4`}
      >
        <div className="">
          <div className="flex items-start" style={{ wordWrap: 'anywhere' }}>
            <span
              className="flex-grow mr-2 text-sm font-semibold text-gray-600"
              dangerouslySetInnerHTML={{ __html: note.title }}
            ></span>
            <Button classes="" small clicked={() => pinnedNote(note.id)}>
              {note.pinned ? (
                <TiPin size="1.2em" />
              ) : (
                <RiPushpin2Line size="1.2em" />
              )}
            </Button>
          </div>
          <div className="text-sm mb-2">
            <span
              className="w-full text-gray-600"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></span>
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
          <NoteOptions
            change={handleChangeBackground}
            large={!grid}
            archived={note.archived}
            archive={handleArchive}
            unarchive={handleUnarchive}
            noteId={note.id}
          />
          <NoteParameters
            small
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
