import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/HomePage';
import Login from './components/Login';
import MovieForm from './components/Movie';
import ViewMovie from './components/View';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage" element={<MovieForm />} />
          <Route path="/view" element={<ViewMovie />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
