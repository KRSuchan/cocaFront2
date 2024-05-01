// App.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // 로그인 페이지 컴포넌트
import MainPage from './MainPage'; // 메인 페이지 컴포넌트

function App() {
  return (
    <Router>
      <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend+Zetta&display=swap" />
      </Helmet>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
