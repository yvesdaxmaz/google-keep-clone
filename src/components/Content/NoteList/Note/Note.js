import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from './../../../../UI/Button/Button';
import { RiPushpin2Line } from 'react-icons/ri';
import { TiPin } from 'react-icons/ti';
import NoteOptions from './../../../NoteOptions/NoteOptions';
import NoteParameters from '../../../NoteParemeters/NoteParameters';
import Badge from './../../../../UI/Badge/Badge';
import CheckMark from './../../../../UI/CheckMark/CheckMark';
import KeepContext from './../../../../context/KeepContext';
const Note = ({ classes, note, clicked }) => {
  const {
    grid,
    selectLabel,
    selectBg,
    archiveNote,
    unArchiveNote,
    pinnedNote,
    selectNote,
    selectedNotes,
    clearSelectedNotes,
  } = useContext(KeepContext);
  const [checked, setChecked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef(null);

  const handleChecked = () => {
    setChecked(!checked);
    console.log('show checkbox');
  };

  const handleArchive = () => {
    archiveNote(note.id);
  };

  const handleUnarchive = () => {
    unArchiveNote(note.id);
  };

  const handleSelectNote = () => {
    selectNote(note.id);
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
    const {
      target: { classList, parentNode },
    } = event;
    let parentNodeClasses = Array.from(parentNode.classList);

    if (
      Array.from(classList).includes('checkmark') ||
      parentNodeClasses.includes('checkmark')
    ) {
      console.log('click on checkmark');
    } else {
      clearSelectedNotes();
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  let isSelected = selectedNotes.findIndex(n => n === note.id);

  return (
    <div
      className={`note relative w-full max-w-2xl mx-auto mb-2 ${
        hovered ? 'shadow' : ''
      }`}
      onClick={clicked}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
    >
      {(hovered || isSelected !== -1) && (
        <div className="absolute top-0 lefst-0 -ml-3 -mt-3">
          <CheckMark
            altText={
              isSelected !== -1
                ? 'Désélectionner la note'
                : 'Sélectionner la note'
            }
            clicked={handleSelectNote}
            checked={isSelected !== -1 ? true : false}
          />
        </div>
      )}
      <div
        className={`rounded ${note.bgColor} ${
          isSelected !== -1
            ? 'border-2 border-gray-800'
            : 'border border-gray-300'
        } ${hovered ? 'shadow' : ''} p-4`}
      >
        <div className="">
          <div className="flex items-start" style={{ wordWrap: 'anywhere' }}>
            <span
              className="flex-grow mr-2 text-sm font-semibold text-gray-600"
              dangerouslySetInnerHTML={{ __html: note.title }}
            ></span>
            <Button
              classes=""
              small
              clicked={() => pinnedNote(note.id)}
              altText={note.pinned ? 'Retirer la note' : 'Epingler la note'}
            >
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
        <div
          className={`flex flex-wrap items-center ${
            hovered && isSelected === -1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <NoteOptions
            change={handleChangeBackground}
            large={!grid}
            deleted={note.deleted}
            archived={note.archived}
            archive={handleArchive}
            unarchive={handleUnarchive}
            noteId={note.id}
          />
          {!note.deleted && (
            <NoteParameters
              small
              note={note}
              selectedLabels={note.selectedLabels}
              selectLabel={handleSelectLabel}
              checked={checked}
              check={handleChecked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
