import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KakaoMap from "./KakaoMap";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import RegistrationPage from "./pages/registraiton";

declare global {
  interface Window {
    kakao: any
    updateLocation: any
  }
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/kakao-map" element={<KakaoMap />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/reservation">
          <Route index element/>
        </Route>
        <Route
          index
          element={
            <>
              <div>메인 페이지</div>
              <a href="/login">로그인 페이지</a>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
