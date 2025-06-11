import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MenuBar.css';

function MenuBar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      title: '실종동물찾기',
      sub: [
        { title: '실종 동물 등록', path: 'https://foundit2-siglip-b16-384px.vercel.app/' },
        { title: '매칭 결과', path: '/missing/result' },
        { title: '등록 가이드', path: '/missing/guide' },
      ],
    },
    {
      title: '보호소',
      sub: [
        { title: '보호 중인 동물', path: '/shelter/animals' },
        { title: '보호소 안내', path: '/shelter/info' },
      ],
    },
    {
      title: '입양',
      sub: [
        { title: '입양 대상 동물', path: '/adopt/animals' },
        { title: '입양 등록', path: '/adopt/register' },
        { title: '나랑 맞는 동물 찾기', path: '/adopt/match' },
      ],
    },
    {
      title: '이용안내',
      sub: [
        { title: '공지사항', path: '/info/notice' },
        { title: 'FAQ', path: '/info/faq' },
        { title: '1:1 문의', path: '/info/qna' },
      ],
    },
    {
      title: '마이페이지', path: '/mypage',
      sub: [
        { title: '정보수정', path: '/mypage/edit' },
        { title: '등록 및 매칭 내역', path: '/mypage/history' },
        { title: '1:1 문의 내역', path: '/mypage/qna' },
      ],
    },
  ];

  return (
    <div className="menu-bar">
      {menuItems.map((menu, idx) => (
        <div
          key={idx}
          className="menu-container"
          onMouseEnter={() => setActiveMenu(idx)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link to={menu.path} className={`menu-item ${activeMenu === idx ? 'active' : ''}`}>
            {menu.title}
          </Link>

          {activeMenu === idx && (
            <div className="dropdown">
              {menu.sub.map((sub, subIdx) => {
                const isExternal = sub.path.startsWith('http');
                if (isExternal) {
                  return (
                    <a href={sub.path} className="dropdown-item" key={subIdx}>
                      {sub.title}
                    </a>
                  );
                }
                return (
                  <Link to={sub.path} className="dropdown-item" key={subIdx}>
                    {sub.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MenuBar;
