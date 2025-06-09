import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

// Lazy-loaded components
const Start = lazy(() => import('../components/start/Start'));
const Profile = lazy(() => import('../components/profile/Profile'));
const Info = lazy(() => import('../components/info/Info'));

// Global Styles
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@300..700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Spline Sans Mono', monospace;
    background: #0a0a0a;
    overflow-x: hidden;
  }
`;

const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%)',
    color: '#ddd6fe',
    fontFamily: "'Spline Sans Mono', monospace",
    fontSize: '1.6rem',
    fontWeight: 400,
    textAlign: 'center',
    letterSpacing: '0.05em'
  }}>
    Loading the Cosmos...
  </div>
);

const App = () => (
  <>
    <GlobalStyles />
   
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Suspense>
  </>
);

export default App;
