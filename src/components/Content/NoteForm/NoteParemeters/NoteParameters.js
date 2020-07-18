import React, { useState, useRef, useEffect } from 'react';
import Button from './../../../../UI/Button/Button';
import { BsThreeDotsVertical, BsSearch, BsPlus, BsCheck } from 'react-icons/bs';

const NoteParameters = ({
  classes,
  children,
  spacing,
  small,
  labels,
  searchTerm,
  search,
  addLabel,
  selectedLabels,
  selectLabel,
  note,
  checked,
  check,
}) => {
  const [dropped, setDrowpped] = useState(false);
  const [droppedLabelOptions, setDroppedLabelOptions] = useState(false);

  const wrapperRef = useRef(null);

  const handleCloseDropdown = () => {
    setDrowpped(!dropped);
  };

  const showLabelOptions = () => {
    setDrowpped(false);
    setDroppedLabelOptions(!droppedLabelOptions);
  };

  const handleSearchLabel = event => {
    search(event.target.value);
  };

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDrowpped(false);
      setDroppedLabelOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  return (
    <div className={`relative ${classes}`} ref={wrapperRef}>
      <Button small={small} clicked={handleCloseDropdown}>
        <BsThreeDotsVertical />
      </Button>
      <div
        className={`${
          dropped ? '' : 'hidden'
        } absolute top-10 w-56 left-0 white rounded border border-gray-300 shadow`}
      >
        <div className="flex flex-col justify-right text-sm py-1 bg-white">
          {!note ? (
            <div className="">
              <div
                className="px-4 py-1 hover:bg-gray-200"
                onClick={showLabelOptions}
              >
                Ajouter un libellé
              </div>
              <div className="px-4 py-1 hover:bg-gray-200" onClick={check}>
                {!checked
                  ? 'Afficher les cases à cocher'
                  : 'Masquer les cases à cocher'}
              </div>
            </div>
          ) : (
            <div>
              <div className="px-4 py-1 hover:bg-gray-200">
                Supprimer la note
              </div>

              <div
                className="px-4 py-1 hover:bg-gray-200"
                onClick={showLabelOptions}
              >
                Modifier les libellés
              </div>
              <div className="px-4 py-1 hover:bg-gray-200">
                Effectuer une copie
              </div>
              <div className="px-4 py-1 hover:bg-gray-200">
                {!checked
                  ? 'Afficher les cases à cocher'
                  : 'Masquer les cases à cocher'}
              </div>

              <div className="px-4 py-1 hover:bg-gray-200">
                Copier dans Google Docs
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          droppedLabelOptions ? '' : 'hidden'
        } absolute top-10 w-56 left-0 white rounded border border-gray-300 shadow`}
      >
        <div className="flex flex-col justify-right text-sm py-1 bg-white">
          <div className="text-sm px-4 py-2" onClick={showLabelOptions}>
            Note associée à un libellé
          </div>
          <div className="px-4 py-2 text-xs text-gray-700">
            <div className="flex items-center">
              <div className="flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  className="w-full"
                  onChange={handleSearchLabel}
                  placeholder="Saisissez le nom du libellé"
                />
              </div>
              <BsSearch />
            </div>
          </div>
          <ul>
            {labels.map(label => (
              <li
                className="flex items-center px-4 py-1 hover:bg-gray-100"
                key={label}
              >
                <span
                  className="relative flex items-center justify-center mr-2 rounded h-4 w-4 border-2 border-gray-600"
                  onClick={() => selectLabel(label)}
                >
                  {selectedLabels.indexOf(label) !== -1 ? <BsCheck /> : null}
                </span>
                <span className="flex-grow">{label}</span>
              </li>
            ))}
          </ul>
          {searchTerm !== '' && labels.indexOf(searchTerm) === -1 ? (
            <div className="flex items-center border-t text-xs border-gray-300 px-4 py-1 hover:bg-gray-100">
              <BsPlus size="1.5em" />
              <div className="flex-grow ml-2" onClick={addLabel}>
                Créer le libellé
                <span className="ml-1">
                  &ldquo;<span className="font-bold">{searchTerm}</span>&rdquo;
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NoteParameters;
