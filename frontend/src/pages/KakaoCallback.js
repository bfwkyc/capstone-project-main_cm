import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function KakaoCallback() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) return;

    console.log('카카오 인가 코드:', code);

    // 이미 처리한 코드인지 확인
    const usedCode = sessionStorage.getItem('usedKakaoCode');
    if (usedCode === code) {
      console.log('이미 사용한 코드임. 요청 안 보냄.');
      return; 
    }

    sessionStorage.setItem('usedKakaoCode', code);

    // 백엔드 서버에 인가 코드 전달
    axios
      .get(`http://localhost:4000/auth/kakao/callback?code=${code}`)
      .then((res) => {
        const user = res.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      })
      .catch((err) => {
        console.error('카카오 로그인 실패:', err);
        alert('로그인에 실패했습니다.');

        localStorage.removeItem('user'); 
        setUser(null); 
      });
  }, [navigate, setUser]);

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
