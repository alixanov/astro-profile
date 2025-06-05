import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from '../components/start/Start';
import Profile from '../components/profile/Profile';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
  );
};

export default App;