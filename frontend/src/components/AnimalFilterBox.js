import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AnimalFilterBox.css';

function AnimalFilterBox({ onSearch, defaultType, defaultBreed, minDateLimit, maxDateLimit, defaultRange }) {
  const [sidoList, setSidoList] = useState([]);
  const [sido, setSido] = useState('');
  const [sigunguList, setSigunguList] = useState([]);
  const [sigungu, setSigungu] = useState('');
  const [shelterList, setShelterList] = useState([]);
  const [shelter, setShelter] = useState('');
  const [upkind, setUpkind] = useState('');
  const [kindList, setKindList] = useState([]);
  const [kind, setKind] = useState('');
  const [sex, setSex] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('/api/sido').then((res) => {
      const items = res.data?.response?.body?.items?.item;
      setSidoList(Array.isArray(items) ? items : items ? [items] : []);
    });
  }, []);

  useEffect(() => {
    if (!sido) {
      setSigunguList([]);
      setSigungu('');
      setShelterList([]);
      setShelter('');
      return;
    }
    axios.get('/api/sigungu', { params: { upr_cd: sido } }).then((res) => {
      const items = res.data?.response?.body?.items?.item;
      setSigunguList(Array.isArray(items) ? items : items ? [items] : []);
    });
  }, [sido]);

  useEffect(() => {
    if (!sido || !sigungu) {
      setShelterList([]);
      setShelter('');
      return;
    }
    axios.get('/api/shelter', { params: { upr_cd: sido, org_cd: sigungu } }).then((res) => {
      const items = res.data?.response?.body?.items?.item;
      setShelterList(Array.isArray(items) ? items : items ? [items] : []);
    });
  }, [sido, sigungu]);

  useEffect(() => {
    if (!upkind) {
      setKindList([]);
      setKind('');
      return;
    }
    axios.get('/api/kind', { params: { up_kind_cd: upkind } }).then((res) => {
      const items = res.data?.response?.body?.items?.item;
      setKindList(Array.isArray(items) ? items : items ? [items] : []);
    });
  }, [upkind]);

  useEffect(() => {
    if (defaultRange && !startDate && !endDate) {
      setStartDate(defaultRange.start);
      setEndDate(defaultRange.end);
    }
  }, [defaultRange, startDate, endDate]);

  const handleSearch = () => {
    const formatDate = (dateStr) => dateStr?.replaceAll('-', '');
    onSearch({
      sido,
      sigungu,
      shelter,
      upkind,
      kind,
      sex_cd: sex,
      bgnde: formatDate(startDate),
      endde: formatDate(endDate),
      numOfRows: 500
    });
  };

  return (
    <div className="animal-filter-box">
      <div className="filter-box">
        <div className="filter-row">
          <label>날짜</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={minDateLimit} max={maxDateLimit} />
          <span>~</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={minDateLimit} max={maxDateLimit} />
        </div>
        <div className="filter-row">
          <label>시도</label>
          <select value={sido} onChange={(e) => setSido(e.target.value)}>
            <option value="">전체</option>
            {sidoList.map((sido) => (
              <option key={sido.orgCd} value={sido.orgCd}>{sido.orgdownNm}</option>
            ))}
          </select>
          <label>시군구</label>
          <select value={sigungu} onChange={(e) => setSigungu(e.target.value)}>
            <option value="">전체</option>
            {sigunguList.map((item) => (
              <option key={item.orgCd} value={item.orgCd}>{item.orgdownNm}</option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <label>보호센터</label>
          <select value={shelter} onChange={(e) => setShelter(e.target.value)}>
            <option value="">전체</option>
            {shelterList.map((item) => (
              <option key={item.careRegNo} value={item.careRegNo}>{item.careNm}</option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <label>축종 및 품종</label>
          <select value={upkind} onChange={(e) => setUpkind(e.target.value)}>
            <option value="">전체</option>
            <option value="417000">개</option>
            <option value="422400">고양이</option>
            <option value="429900">기타</option>
          </select>
          <select value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="">전체</option>
            {kindList.map((item) => (
              <option key={item.kindCd} value={item.kindCd}>{item.kindNm}</option>
            ))}
          </select>
          <label>성별</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="">전체</option>
            <option value="M">수컷</option>
            <option value="F">암컷</option>
            <option value="Q">미상</option>
          </select>
        </div>
        <div className="search-btn-wrapper">
          <button className="search-btn" onClick={handleSearch}>조회</button>
        </div>
      </div>
    </div>
  );
}

export default AnimalFilterBox;
