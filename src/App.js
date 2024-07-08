// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoMap from './KakaoMap';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/kakao-map" element={<KakaoMap />} />
        {/* 다른 라우트들은 여기에 추가할 수 있습니다. */}
        <Route path="/" element={<div>메인 페이지</div>} />
      </Routes>
    </Router>
  );
};

export default App;
