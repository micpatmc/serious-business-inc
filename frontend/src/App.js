import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage.js';
import DisplayPage from './DisplayPage.js';

const App = () => {
  return (<>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />}/>
        <Route path="/" element={<DisplayPage />}/>
      </Routes>
    </Router>
  </>);
};

export default App;