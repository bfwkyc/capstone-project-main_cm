import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import AnimalFilterBox from '../components/AnimalFilterBox';
import AnimalCardList from '../components/AnimalCardList';
import '../styles/AnimalCardList.css';
import '../styles/ProtectedAnimals.css';
import '../styles/wrap.css';
import axios from 'axios';

function ProtectedAnimals() {
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAnimals = animals.slice(indexOfFirst, indexOfLast);

  const formatDateInput = (date) => date.toISOString().slice(0, 10);

  const handleSearch = (filters) => {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);

    const formatDateParam = (date) => date.toISOString().slice(0, 10).replace(/-/g, '');

    const bgnde = filters.bgnde || formatDateParam(twoWeeksAgo);
    const endde = filters.endde || formatDateParam(today);

    axios.get('/api/animals', {
      params: {
        ...filters,
        bgnde,
        endde
      }
    })
      .then((res) => {
        const items = res.data?.response?.body?.items?.item;
        const result = (Array.isArray(items) ? items : items ? [items] : []).map(animal => ({
          id: animal.desertionNo,
          image: animal.popfile1,
          breed: `${animal.kindNm} ${animal.sexCd === 'M' ? '♂' : animal.sexCd === 'F' ? '♀' : ''}`,
          details: `${animal.sexCd === 'M' ? '수컷' : animal.sexCd === 'F' ? '암컷' : '미상'} / ${animal.colorCd}`,
          date: animal.happenDt.replace(/(\\d{4})(\\d{2})(\\d{2})/, '$1-$2-$3'),
          location: animal.happenPlace,
        }));
        setAnimals(result);
        setCurrentPage(1);
      })
      .catch(() => {
        setAnimals([]);
        setCurrentPage(1);
      });
  };

  useEffect(() => {
    handleSearch({});
  }, []);

  const totalPages = Math.ceil(animals.length / itemsPerPage);
  const pagesToShow = 10;
  const currentGroup = Math.floor((currentPage - 1) / pagesToShow);
  const startPage = currentGroup * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const today = new Date();
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(today.getDate() - 14);

  return (
    <div className="protected-animals">
      <Header />
      <MenuBar />
      <div className="wrap">
        <h2 className="page-title">보호 중인 동물</h2>

        <AnimalFilterBox
          onSearch={handleSearch}
          minDateLimit={formatDateInput(twoWeeksAgo)}
          maxDateLimit={formatDateInput(today)}
        />
        <AnimalCardList animals={currentAnimals} />

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>≪</button>
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>◁</button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              );
            })}

            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>▷</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>≫</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProtectedAnimals;
