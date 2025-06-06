// src/pages/MyPageHistory.js
import React from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MyPage.css';

function MyPageHistory() {
  return (
    <div className="mypage">
      <Header />
      <MenuBar />
      <div className="mypage-content">
        <h2>등록 및 매칭 내역</h2>
        <div className="mypage-section">
          <h3>📅 실종 동물 등록 내역</h3>
          <ul>
            <li>푸들 (2025-04-01 등록)</li>
            <li>포메라니안 (2025-03-22 등록)</li>
          </ul>
        </div>

        <div className="mypage-section">
          <h3>🔍 매칭 결과</h3>
          <ul>
            <li>푸들과 유사한 보호 동물 발견됨 (2025-04-03)</li>
            <li>포메라니안과 유사한 보호 동물 없음 (2025-04-02)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPageHistory;
