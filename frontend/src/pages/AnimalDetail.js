import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import AnimalDetailInfo from '../components/AnimalDetailInfo';
import '../styles/AnimalDetail.css';
import axios from 'axios';

function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    axios.get('/api/animals')
      .then((res) => {
        const items = res.data?.response?.body?.items?.item;
        const found = (Array.isArray(items) ? items : items ? [items] : []).find(a => a.desertionNo === id);
        if (found) {
          setAnimal({
            images: [found.popfile1, found.popfile2].filter(Boolean),
            type: found.upKindNm,
            breed: found.kindNm,
            gender: found.sexCd === 'M' ? '수컷' : found.sexCd === 'F' ? '암컷' : '미상',
            colors: found.colorCd,
            neutered: found.neuterYn === 'Y' ? '예' : '아니오',
            features: found.specialMark,
            date: found.happenDt?.replace(/(\\d{4})(\\d{2})(\\d{2})/, '$1-$2-$3'),
            location: found.happenPlace,
            notice: `${found.noticeSdt?.replace(/(\\d{4})(\\d{2})(\\d{2})/, '$1-$2-$3')} ~ ${found.noticeEdt?.replace(/(\\d{4})(\\d{2})(\\d{2})/, '$1-$2-$3')}`,
            shelter: found.careNm,
            shelterDirector: found.careOwnerNm,
            shelterAddress: found.careAddr,
            shelterPhone: found.careTel,
          });
        }
      });
  }, [id]);

  if (!animal) return <p>로딩 중...</p>;

  return (
    <div className="animal-detail-container">
      <Header />
      <MenuBar />
      <div className="detail-content">
        <div className="image-section">
          {animal.images.map((src, i) => (
            <img key={i} src={src} alt={`animal-${i}`} />
          ))}
        </div>
        <AnimalDetailInfo data={animal} />
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
        </div>
      </div>
    </div>
  );
}

export default AnimalDetail;
