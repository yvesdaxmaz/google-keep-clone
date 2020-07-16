import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import { withRouter } from 'react-router-dom';

function App(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');
  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
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
  );
}

export default withRouter(App);
