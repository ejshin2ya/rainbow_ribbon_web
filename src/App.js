// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KakaoMap from "./KakaoMap";
import LoginPage from "./pages/login";
import SignupPage from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/kakao-map" element={<KakaoMap />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<div>메인 페이지</div>} />
      </Routes>
    </Router>
  );
};

export default App;
