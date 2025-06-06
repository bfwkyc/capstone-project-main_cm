// src/pages/MyPageQnA.js
import React from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MyPage.css';

function MyPageQnA() {
  return (
    <div className="mypage">
      <Header />
      <MenuBar />
      <div className="mypage-content">
        <h2>1:1 문의 내역</h2>
        <div className="mypage-section">
          <ul>
            <li>입양 문의 (답변 완료)</li>
            <li>실종 등록 오류 문의 (처리 중)</li>
            <li>보호소 정보 관련 문의 (답변 대기)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyPageQnA;
