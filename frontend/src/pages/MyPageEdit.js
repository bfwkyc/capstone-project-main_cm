// src/pages/MyPageEdit.js
import React, { useContext } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MyPage.css';
import { UserContext } from '../context/UserContext';

function MyPageEdit() {
  const { user } = useContext(UserContext);  
  const name = user?.name || '홍길동';      
  const email = user?.email || 'example@email.com';
  
  return (
    <div className="mypage">
      <Header />
      <MenuBar />
      <div className="mypage-content">
        <h2>정보 수정</h2>
        <form className="mypage-section">
          <label>
            이름
            <input type="text" defaultValue={name} />
          </label>
          <label>
            이메일
            <input type="email" defaultValue={email} />
          </label>
          <label>
            비밀번호 변경
            <input type="password" placeholder="새 비밀번호 입력" />
          </label>
          <button type="submit">수정 완료</button>
        </form>
      </div>
    </div>
  );
}

export default MyPageEdit;
