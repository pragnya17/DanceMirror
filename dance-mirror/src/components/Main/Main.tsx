import React from 'react';
import Header from './Header/Header';
import Video from './Video/Video';

function Main() {
  return (
    <div>
      <div className="overflow-hidden">
        <Header id="header"/>
        <Video id="video"/>
      </div>
    </div>
  );
}

export default Main;
