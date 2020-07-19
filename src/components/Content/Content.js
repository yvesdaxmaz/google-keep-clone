import React, { useState } from 'react';
import NoteForm from './NoteForm/NoteForm';
import NoteList from './NoteList/NoteList';

const Content = ({ classes }) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleStartTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const handleEndTyping = () => {
    setIsTyping(false);
  };

  return (
    <div className={`${classes} px-4`}>
      <div className="py-8 h-full">
        <NoteForm
          isTyping={isTyping}
          clicked={handleStartTyping}
          endTyping={handleEndTyping}
        />
        <NoteList grid />
      </div>
    </div>
  );
};

export default Content;
