import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Lazy-loaded components
const Start = lazy(() => import('../components/start/Start'));
const Profile = lazy(() => import('../components/profile/Profile'));
const Info = lazy(() => import('../components/info/Info'));

// Global Styles
const GlobalStyles = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&display=swap');

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%);
  color: #ddd6fe;
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.05em;
`;

const Loading = () => <LoadingContainer>Loading the Cosmos...</LoadingContainer>;

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