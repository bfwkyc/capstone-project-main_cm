import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import Home from './pages/Home';
import MissingRegister from './pages/MissingRegister';
import MissingResult from './pages/MissingResult';
import ProtectedAnimals from './pages/ProtectedAnimals';
import AdoptableAnimals from './pages/AdoptableAnimals';
import AdoptionRegister from './pages/AdoptionRegister';
import AnimalDetail from './pages/AnimalDetail';
import NoticePage from './pages/NoticePage';
import FaqPage from './pages/FaqPage';
import InquiryPage from './pages/InquiryPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import AdoptionMatch from './pages/AdoptionMatch';
import KakaoCallback from './pages/KakaoCallback';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.log('유저 정보 파싱 실패. 초기화.');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/missing/register" element={<MissingRegister />} />
        <Route path="/missing/result" element={<MissingResult />} />
        <Route path="/shelter/animals" element={<ProtectedAnimals />} />
        <Route path="/adopt/animals" element={<AdoptableAnimals />} />
        <Route path="/adopt/register" element={<AdoptionRegister />} />
        <Route path="/animal/:id" element={<AnimalDetail />} />
        <Route path="/info/notice" element={<NoticePage />} />
        <Route path="/info/faq" element={<FaqPage />} />
        <Route path="/info/qna" element={<InquiryPage />} />
        <Route path="/info/qna" element={<InquiryPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/adopt/match" element={<AdoptionMatch />} />
        <Route path="/oauth/callback/kakao" element={<KakaoCallback />} />
      </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
