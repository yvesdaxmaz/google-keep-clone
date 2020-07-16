import React, { useState } from 'react';
import NoteForm from './NoteForm/NoteForm';
const Content = ({ classes }) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleStartTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  const handleEndTyping = () => {
    console.log('Ending Typing');
    setIsTyping(false);
  };

  return (
    <div className={`${classes} px-4`}>
      <div className="py-8">
        <NoteForm
          isTyping={isTyping}
          clicked={handleStartTyping}
          endTyping={handleEndTyping}
        />
      </div>
    </div>
  );
};

export default Content;
