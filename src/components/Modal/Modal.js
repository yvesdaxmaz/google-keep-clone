import React, { useContext, useRef, useEffect } from 'react';
import Button from './../../UI/Button/Button';
import Label from './../../UI/Label/Label';
import KeepContext from './../../context/KeepContext';
import CreateLabel from './CreateLabel/CreateLabel';

const Modal = ({ classes }) => {
  const { labels, endEdit } = useContext(KeepContext);
  const wrapperRef = useRef(null);

  const handleMouseDown = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      endEdit();
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);

  return (
    <div
      className={`fixed flex items-center justify-center z-20 top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50`}
    >
      <div
        ref={wrapperRef}
        className="w-full max-w-sm bg-white border shadow text-gray-700"
      >
        <div className="py-4 px-4">
          <h2 className="text-xl">Modifier les libellés</h2>
        </div>
        <div className="px-4">
          <CreateLabel />
        </div>
        <div className="">
          <div className="px-4 py-4">
            {labels.map(label => (
              <Label label={label} key={label} />
            ))}
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-300 py-4 px-4">
          <Button texted title="Terminé" clicked={endEdit}></Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
