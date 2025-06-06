// src/pages/SignupPage.js
import React from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/LoginPage.css';

function SignupPage() {
  return (
    <div className="login-page">
      <Header />
      <MenuBar />
      <div className="login-content">
        <h2>회원가입</h2>
        <form className="login-form">
          <label>
            휴대폰 번호
            <input type="tel" placeholder="010-0000-0000" />
          </label>
          <label>
            이름
            <input type="text" placeholder="이름" />
          </label>
          <label>
            비밀번호
            <input type="password" placeholder="비밀번호" />
          </label>
          <label>
            비밀번호 확인
            <input type="password" placeholder="비밀번호 다시 입력" />
          </label>
          <button type="submit" className="login-btn">회원가입 완료</button>
        </form>

        <div className="signup-link">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
