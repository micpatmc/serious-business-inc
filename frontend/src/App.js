import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage.js';
import DisplayPage from './DisplayPage.js';
import ContactPage from './ContactPage.js';

const App = () => {
  //testdsfds
  return (<>
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />}/>
        <Route path="/contacts" element={<ContactPage />}/>
        <Route path="/" element={<DisplayPage />}/>
      </Routes>
    </Router>
  </>);
};

export default App;