import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;

