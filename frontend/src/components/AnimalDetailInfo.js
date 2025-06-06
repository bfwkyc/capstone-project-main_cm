import React from 'react';
import '../styles/AnimalDetail.css';

function AnimalDetailInfo({ data }) {
  return (
    <div className="animal-info-section">
      <div className="wrap">
      <section>
        <h3>🐾동물의 정보</h3>
        <div className="info-row">
          <label>동물종류</label>
          <span>{data.type}</span>
        </div>
        <div className="info-row">
          <label>품종</label>
          <span>{data.breed}</span>
        </div>
        <div className="info-row">
          <label>성별</label>
          <span>{data.gender}</span>
        </div>
        <div className="info-row">
          <label>털색</label>
          <span>{data.colors}</span>
        </div>
        <div className="info-row">
          <label>중성화 유무</label>
          <span>{data.neutered}</span>
        </div>
        <div className="info-row">
          <label>특징</label>
          <span>{data.features}</span>
        </div>
      </section>

      <section>
        <h3>🐾구조 정보</h3>
        <div className="info-row">
          <label>구조일</label>
          <span>{data.date}</span>
        </div>
        <div className="info-row">
          <label>구조장소</label>
          <span>{data.location}</span>
        </div>
        <div className="info-row">
          <label>공고기간</label>
          <span>{data.notice}</span>
        </div>
      </section>

      <section>
        <h3>🐾동물보호센터 안내</h3>
        <div className="info-row">
          <label>관할 보호센터명</label>
          <span>{data.shelter}</span>
        </div>
        <div className="info-row">
          <label>대표자</label>
          <span>{data.shelterDirector}</span>
        </div>
        <div className="info-row">
          <label>주소</label>
          <span>{data.shelterAddress}</span>
        </div>
        <div className="info-row">
          <label>전화번호</label>
          <span>{data.shelterPhone}</span>
        </div>
      </section>
      </div>
    </div>
  );
}

export default AnimalDetailInfo;
