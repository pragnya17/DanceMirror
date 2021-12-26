import React from 'react';
import Header from './Header/Header';
import MediaComponent from './Video/Video';

function Main() {
  return (
    <div>
      <div className="overflow-hidden">
        <Header id="header"/>
        <MediaComponent/>
      </div>
    </div>
  );
}

export default Main;
