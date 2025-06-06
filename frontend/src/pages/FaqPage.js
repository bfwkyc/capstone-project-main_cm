// src/pages/FaqPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/FaqPage.css';

const faqData = [
  {
    question: '실종 동물은 어떻게 등록하나요?',
    answer: '홈페이지 상단 메뉴에서 "실종동물찾기 > 실종 동물 등록"으로 이동하여 양식을 작성하고 제출해주세요.',
  },
  {
    question: '입양하고 싶은 동물은 어떻게 찾을 수 있나요?',
    answer: '입양 메뉴에서 입양 가능한 동물을 확인하거나, 이상형 테스트를 통해 추천받을 수 있어요.',
  },
  {
    question: '매칭 결과는 어디서 확인하나요?',
    answer: '"실종동물찾기 > 매칭 결과"에서 확인할 수 있습니다. 알림을 통해도 안내드려요.',
  },
  {
    question: '등록한 정보는 수정이 가능한가요?',
    answer: '마이페이지에서 본인이 등록한 정보를 확인하고 수정할 수 있어요.',
  },
];

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Header />
      <MenuBar />
      <div className="faq-content">
        <h2>자주 묻는 질문</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleItem(index)}
              >
                {item.question}
              </div>
              <div className="faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
