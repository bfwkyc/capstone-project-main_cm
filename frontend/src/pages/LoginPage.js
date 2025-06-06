// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import { UserContext } from '../context/UserContext';
import '../styles/LoginPage.css';

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const REST_API_KEY = 'ca9b89ace9bbff6cdd5ddf07a2fe5a1c'; 
  const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  
  const handleLogin = (e) => {
    e.preventDefault();

    const loggedInUser = { phone };
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    navigate('/');
  };

  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginUrl;
  };
  
  return (
    <div className="login-page">
      <Header />
      <MenuBar />
      <div className="login-content">
        <h2>로그인</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            휴대폰 번호
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="login-btn">로그인</button>
        </form>

        <div className="divider">또는</div>

        <button className="kakao-btn" onClick={handleKakaoLogin}>
          카카오톡으로 로그인
        </button>

        <div className="signup-link">
          아직 계정이 없으신가요? <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
