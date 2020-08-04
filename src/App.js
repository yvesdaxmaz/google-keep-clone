import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import { withRouter } from 'react-router-dom';
import KeepContext from './context/KeepContext';
import Modal from './components/Modal/Modal';

function App(props) {
  const [edit, setEdit] = useState(false);
  const [grid, setGrid] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [labels, setLabels] = useState(['javascript', 'Projects', 'tailwind']);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Note in next label',
      content: 'this not is for testing purpose',
      selectedLabels: ['javascript', 'tailwind'],
      bgColor: 'bg-white',
      archived: false,
      deleted: false,
      pinned: false,
    },
    {
      id: 2,
      title: 'This is an archive note',
      content: 'this not is for testing archive note',
      selectedLabels: ['javascript', 'tailwind'],
      bgColor: 'bg-white',
      archived: true,
      deleted: false,
      pinned: false,
    },
    {
      id: 3,
      title: 'This is a pinned notet',
      content: 'this not is for testing archive note',
      selectedLabels: ['javascript', 'tailwind'],
      bgColor: 'bg-green-300',
      archived: false,
      deleted: false,
      pinned: true,
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const editLabel = (oldLabel, newLabel) => {
    const newLabels = [...labels].map(label => {
      if (label === oldLabel) {
        return newLabel;
      }
      return label;
    });
    setLabels(newLabels);
    setNotes(
      [...notes].map(n => {
        return {
          ...n,
          selectedLabels: n.selectedLabels.map(l => {
            if (l === oldLabel) {
              return newLabel;
            }
            return l;
          }),
        };
      }),
    );
  };

  const addLabel = label => {
    setLabels([...labels, label]);
  };

  const switchToGridLayout = () => {
    setGrid(!grid);
  };

  const startEdit = () => {
    setEdit(true);
  };

  const endEdit = () => {
    setEdit(false);
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

  const pinnedNote = noteId => {
    let updateNotes = [...notes];
    let noteIndex = updateNotes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      let note = updateNotes[noteIndex];
      note.pinned = !note.pinned;
      note.archived = false;
    }

    setNotes(updateNotes);
  };
  const archiveNote = noteId => {
    let updateNotes = [...notes];
    let noteIndex = updateNotes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      let note = updateNotes[noteIndex];
      note.archived = true;
      note.pinned = false;
    }

    setNotes(updateNotes);
  };
  const unArchiveNote = noteId => {
    let updateNotes = [...notes];
    let noteIndex = updateNotes.findIndex(n => n.id === noteId);
    if (noteIndex !== -1) {
      let note = updateNotes[noteIndex];
      note.archived = false;
    }

    setNotes(updateNotes);
  };

  const deleteNote = noteId => {
    setNotes([
      ...notes.map(n => {
        if (n.id === noteId) {
          return {
            ...n,
            deleted: true,
          };
        } else {
          return n;
        }
      }),
    ]);
  };

  const restaureNote = noteId => {
    setNotes([
      ...notes.map(n => {
        if (n.id === noteId) {
          return {
            ...n,
            deleted: false,
          };
        } else {
          return n;
        }
      }),
    ]);
  };

  const hardDeleteNote = noteId => {
    setNotes([...notes.filter(n => n.id !== noteId)]);
  };

  const clearSelectedNotes = () => {
    setSelectedNotes([]);
  };
  const selectNote = noteId => {
    let noteIndex = selectedNotes.findIndex(id => id === noteId);
    if (noteIndex !== -1) {
      setSelectedNotes([...selectedNotes].filter(id => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const deleteLabel = label => {
    setLabels([...labels.filter(l => l !== label)]);
    setNotes(
      [...notes].map(n => {
        return {
          ...n,
          selectedLabels: n.selectedLabels.filter(l => l !== label),
        };
      }),
    );
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

  return (
    <KeepContext.Provider
      value={{
        grid,
        labels,
        addLabel,
        editLabel,
        deleteLabel,
        selectLabel,
        notes,
        deleteNote,
        addNote,
        selectNote,
        selectedNotes,
        clearSelectedNotes,
        selectBg,
        switchLayout: switchToGridLayout,
        archiveNote,
        unArchiveNote,
        startEdit,
        endEdit,
        pinnedNote,
        hardDeleteNote,
        restaureNote

      }}
    >
      <div className="h-screen">
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
        {edit && <Modal />}
      </div>
    </KeepContext.Provider>
  );
}

export default withRouter(App);
