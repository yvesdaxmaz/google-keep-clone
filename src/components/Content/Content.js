import React, { useState } from 'react';
import NoteForm from './NoteForm/NoteForm';
const Content = ({ classes }) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleStartTyping = () => {
    setIsTyping(true);
  };
  return (
    <div className={`${classes} px-4`}>
      <div className="py-8">
        <NoteForm isTyping={isTyping} clicked={handleStartTyping} />
      </div>
    </div>
  );
};

export default Content;
