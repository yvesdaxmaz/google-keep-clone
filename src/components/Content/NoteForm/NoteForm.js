import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from './../../../UI/Button/Button';
import { FaRegCheckSquare, FaImage } from 'react-icons/fa';
import { RiPushpin2Line } from 'react-icons/ri';
import ContentEditable from 'react-contenteditable';
import NoteOptions from '../../NoteOptions/NoteOptions';
import NoteParameters from '../../NoteParemeters/NoteParameters';
import Badge from './../../../UI/Badge/Badge';
import KeepContext from './../../../context/KeepContext';
const NoteForm = ({ classes, isTyping, clicked, endTyping }) => {
  const { addNote } = useContext(KeepContext);
  const [archived, setArchived] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedLabels, setSelectedLabel] = useState([]);
  const [bgColor, setBgColor] = useState('bg-white');
  const [checked, setChecked] = useState(false);
  const wrapperRef = useRef(null);
  const handleTitleChange = event => {
    let title = event.target.value;
    if (title === '<br>') {
      setTitle('');
    } else {
      setTitle(title);
    }
  };

  const handleContentChange = event => {
    let note = event.target.value;
    console.log(note);
    setContent(note);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };
  const handleArchive = () => {
    setArchived(true);
  };
  const handleUnarchive = () => {
    setArchived(false);
  };

  const handleCloseForm = () => {
    saveNote();
    setBgColor('bg-white');
    endTyping();
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

  const saveNote = () => {
    addNote({
      title,
      content,
      selectedLabels,
      bgColor,
      archived,
      deleted: false,
    });
  };

  const handleChangeBackground = bgColor => {
    setBgColor(bgColor);
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      endTyping();

      if (title !== '' || content !== '') {
        saveNote();
      }
      setContent('');
      setTitle('');
      setBgColor('bg-white');
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  });

  return (
    <div
      className=" w-full max-w-2xl mx-auto "
      onClick={clicked}
      ref={wrapperRef}
    >
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
              {!content && (
                <span className="absolute h-6 w-full font-semibold text-gray-600">
                  Créer une note...
                </span>
              )}

              <ContentEditable
                html={content}
                onChange={handleContentChange}
                className={`${content === '' && 'h-6'} z-10 text-gray-800`}
              />
            </div>
            {selectedLabels && (
              <div className="mt-4 mb-2">
                <ul className="flex flex-wrap">
                  {selectedLabels.map(l => (
                    <li className="flex mr-2" key={l}>
                      <Badge label={l} clicked={selectLabel} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between mb-2">
              <NoteOptions
                large
                change={handleChangeBackground}
                archived={archived}
                archive={handleArchive}
                unarchive={handleUnarchive}
              />
              <NoteParameters
                selectedLabels={selectedLabels}
                selectLabel={selectLabel}
                checked={checked}
                check={handleChecked}
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
