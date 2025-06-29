import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Editor from './pages/Editor';
import Rooms from './pages/Rooms';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';
import Problem from './pages/Problem';
import ProblemDetails from './pages/ProblemDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<Rooms />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/problems" element={<Problem />} />
        <Route path="/problems/:slug" element={<ProblemDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
