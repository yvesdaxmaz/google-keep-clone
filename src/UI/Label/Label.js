import React, { useState, useContext } from 'react';
import { MdLabel, MdCheck } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { GoPencil } from 'react-icons/go';
import Button from './../Button/Button';
import KeepContext from './../../context/KeepContext';

const Label = ({ label }) => {
  const { editLabel, deleteLabel } = useContext(KeepContext);
  const [hover, setHover] = useState(false);
  const [name, setName] = useState(label);
  const [edit, setEdit] = useState(false);
  const handleMouseHovered = () => {
    setHover(!hover);
  };

  const handleOnBlur = event => {
    setEdit(false);
    if (name !== label && name !== '') {
      editLabel(label, name);
    }
  };

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <div
      className="flex items-center py-1"
      onMouseEnter={handleMouseHovered}
      onMouseLeave={handleMouseHovered}
    >
      <div>
        {hover | edit ? (
          <Button small clicked={() => deleteLabel(label)}>
            <IoMdTrash />
          </Button>
        ) : (
          <Button small>
            <MdLabel />
          </Button>
        )}
      </div>

      <div className="flex-grow mx-2">
        <input
          type="text"
          value={name}
          placeholder="Saisissez le nom du libellé"
          className={`${
            edit ? 'border-gray-400' : 'border-transparent'
          } border-b w-full text-gray-700 font-semibold text-sm`}
          onChange={handleChange}
          onFocus={() => setEdit(true)}
          onBlur={handleOnBlur}
        />
      </div>
      <div>
        {!edit ? (
          <Button small>
            <GoPencil />
          </Button>
        ) : (
          <Button small clicked={handleOnBlur}>
            <MdCheck />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Label;
