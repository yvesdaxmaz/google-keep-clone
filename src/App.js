import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import { withRouter } from 'react-router-dom';
import KeepContext from './context/KeepContext';

function App(props) {
  const [grid, setGrid] = useState(false);
  const [labels, setLabels] = useState(['javascript', 'Projects', 'tailwind']);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Note in next label',
      content: 'this not is for testing purpose',
      selectedLabels: ['javascript', 'tailwind'],
      bgColor: 'bg-white',
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const addLabel = label => {
    setLabels([...labels, label]);
  };

  const switchToGridLayout = () => {
    setGrid(!grid);
  };

  const selectLabel = (noteId, labels) => {
    let updateNotes = [...notes];
    let noteIndex = updateNotes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      let note = updateNotes[noteIndex];
      note.selectedLabels = labels;
    }

    setNotes(updateNotes);
  };

  const selectBg = (noteId, color) => {
    let updateNotes = [...notes];
    let noteIndex = updateNotes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      let note = updateNotes[noteIndex];
      note.bgColor = color;
    }

    setNotes(updateNotes);
  };

  const deleteNote = noteId => {
    setNotes([...notes.filter(n => n.id !== noteId)]);
  };

  const addNote = note => {
    note.id = notes.length + 1;
    setNotes([...notes, note]);
  };

  useEffect(() => {
    let labelPathPatern = /\/label\/(.+)/;
    let isMatch = props.location.pathname.match(labelPathPatern);
    if (isMatch) {
      let name = isMatch[1];
      name = name.charAt(0).toUpperCase() + name.substring(1);
      setName(name);
    } else {
      setName('');
    }
  }, [props.location.pathname]);

  let filteredNotes = notes;

  let labelPathPatern = /\/label\/(.+)/;
  let isMatch = props.location.pathname.match(labelPathPatern);
  if (isMatch) {
    filteredNotes = filteredNotes.filter(note =>
      note.selectedLabels.includes(isMatch[1]),
    );
  }

  return (
    <KeepContext.Provider
      value={{
        grid,
        labels,
        addLabel,
        selectLabel,
        notes: filteredNotes,
        deleteNote,
        addNote,
        selectBg,
        switchLayout: switchToGridLayout,
      }}
    >
      <div className="App">
        <Header expandSidebar={handleExpandSidebar} name={name}></Header>
        <main className="flex">
          <SideBar
            classes={`${
              isExpanded ? 'fixed z-10 sm:relative max-w-xs pr-4' : ''
            } pt-4 shadow bg-white`}
            isExpanded={isExpanded}
          />
          <Content classes="flex-grow" />
        </main>
      </div>
    </KeepContext.Provider>
  );
}

export default withRouter(App);
