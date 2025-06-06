// src/pages/MyPage.js
import React, { useContext } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MyPage.css';
import { UserContext } from '../context/UserContext';

function MyPage() {
  const { user } = useContext(UserContext);  
  const name = user?.name || '홍길동';     
  const email = user?.email || 'example@email.com';
  
  return (
    <div className="mypage">
      <Header />
      <MenuBar />
      <div className="mypage-content">
        <h2>마이페이지</h2>
        <div className="mypage-section">
          <h3>👤 내 정보</h3>
          <p>이름: {name}</p>
          <p>이메일: {email}</p>
        </div>

        <div className="mypage-section">
          <h3>📅 등록한 실종 동물</h3>
          <ul>
            <li>말티즈 (2025-04-10 등록)</li>
            <li>진돗개 (2025-03-28 등록)</li>
          </ul>
        </div>

        <div className="mypage-section">
          <h3>🔍 매칭 결과 알림</h3>
          <ul>
            <li>말티즈와 유사한 보호 동물이 발견되었습니다. (2025-04-12)</li>
            <li>진돗개와 유사한 보호 동물이 없습니다. (2025-04-09)</li>
          </ul>
        </div>

        <div className="mypage-section">
          <h3>💬 1:1 문의 내역</h3>
          <ul>
            <li>입양 관련 문의 (답변 완료)</li>
            <li>실종 등록 오류 문의 (처리 중)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
