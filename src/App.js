import React, { useState } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="App">
      <Header expandSidebar={handleExpandSidebar}></Header>
      <main className="flex">
        <SideBar
          classes={`${isExpanded ? 'max-w-xs pr-4' : ''} pt-4 shadow`}
          isExpanded={isExpanded}
        />
      </main>
    </div>
  );
}

export default App;
