import React, { useState } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="App">
      <Router>
        <Header expandSidebar={handleExpandSidebar}></Header>
        <main className="flex">
          <SideBar
            classes={`${isExpanded ? 'max-w-xs pr-4' : ''} pt-4 shadow`}
            isExpanded={isExpanded}
          />
          <Content classes="" />
        </main>
      </Router>
    </div>
  );
}

export default App;
