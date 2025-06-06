import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/Header.css';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">☰</button>
      </div>

      <div className="header-center">
        <Link to="/" className="logo">RePet</Link>
      </div>

      <div className="header-right">
        {user ? (
          <button className="login" onClick={handleLogout}>
            <span className="icon">🔐</span>
            <span className="label">로그아웃</span>
          </button>
        ) : (
          <Link to="/login" className="login">
            <span className="icon">🔓</span>
            <span className="label">로그인</span>
          </Link>
        )}

        <button className="alarm-btn">
          <span className="icon">🔔</span>
          <span className="label">알림</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
