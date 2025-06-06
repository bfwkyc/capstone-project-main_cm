import React from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/NoticePage.css';

const notices = [
  {
    id: 1,
    title: '4월 보호소 점검 안내',
    date: '2025-04-10',
    content: '4월 20일에 전국 보호소 정기 위생점검이 진행됩니다. 방문 시 참고 바랍니다.'
  },
  {
    id: 2,
    title: '입양자 대상 교육 일정 안내',
    date: '2025-04-08',
    content: '4월 22일, 25일에 입양자 필수 교육이 진행됩니다. 자세한 내용은 문의해주세요.'
  },
  {
    id: 3,
    title: '실종 동물 등록 시 유의사항',
    date: '2025-04-01',
    content: '정확한 위치와 날짜를 기재해주셔야 신속한 매칭이 가능합니다.'
  }
];

function NoticePage() {
  return (
    <div className="notice-page">
      <Header />
      <MenuBar />
      <div className="notice-content">
        <h2>📅 공지사항</h2>
        <ul className="notice-list">
          {notices.map((notice) => (
            <li key={notice.id} className="notice-item">
              <h3>{notice.title}</h3>
              <span className="notice-date">{notice.date}</span>
              <p>{notice.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NoticePage;
