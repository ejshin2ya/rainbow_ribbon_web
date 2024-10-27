import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KakaoMap from './KakaoMap';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import MainPage from './pages/main';
import RegistrationPage from './pages/registraiton';
import { Reservation } from './pages/Reservation';
import { CommonRoute } from './components/CommonRoute';
import { CompanyManagement } from './pages/CompanyManagement';
import { BusinessManagement } from './pages/BusinessManagement';
import { Chat } from './pages/Chat';
import { AuthProvider } from './contexts/AuthContext';

declare global {
  interface Window {
    kakao: any;
    updateLocation: any;
  }
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/kakao-map" element={<KakaoMap />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/partners" element={<CommonRoute />}>
            <Route index element={<Reservation />} />
            <Route path="company" element={<CompanyManagement />} />
            <Route path="business" element={<BusinessManagement />} />
            <Route path="chat" element={<Chat />} />
          </Route>
          <Route index element={<MainPage />} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
