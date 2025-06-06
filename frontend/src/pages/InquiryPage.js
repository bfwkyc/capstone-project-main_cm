// src/pages/InquiryPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/InquiryPage.css';

const initialInquiries = [
  { id: 1, title: '입양 관련 문의', date: '2025-04-12' },
  { id: 2, title: '실종 등록 오류', date: '2025-04-11' },
];

function InquiryPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [showForm, setShowForm] = useState(false);
  const [newInquiry, setNewInquiry] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: inquiries.length + 1,
      title: newInquiry.title,
      date: new Date().toISOString().split('T')[0],
    };
    setInquiries([newItem, ...inquiries]);
    setShowForm(false);
    setNewInquiry({ title: '', content: '' });
  };

  return (
    <div className="inquiry-page">
      <Header />
      <MenuBar />
      <div className="inquiry-container">
        <h2>1:1 문의</h2>
        {!showForm ? (
          <>
            <button className="new-btn" onClick={() => setShowForm(true)}>
              1:1 문의 등록
            </button>
            <ul className="inquiry-list">
              {inquiries.map((item) => (
                <li key={item.id}>
                  <span className="title">{item.title}</span>
                  <span className="date">{item.date}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <label>
              제목 <input
                type="text"
                value={newInquiry.title}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, title: e.target.value })
                }
                required
              />
            </label>
            <label>
              내용 <textarea
                rows="5"
                value={newInquiry.content}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, content: e.target.value })
                }
                required
              />
            </label>
            <div className="form-buttons">
              <button type="submit">등록</button>
              <button type="button" onClick={() => setShowForm(false)}>
                취소
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default InquiryPage;
