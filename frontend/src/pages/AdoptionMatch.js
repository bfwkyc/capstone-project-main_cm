import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import AnimalCardList from '../components/AnimalCardList';
import '../styles/AdoptionMatch.css';
import axios from 'axios';
import petData from '../data/petRecommendations.json';
import kindCodeMap from '../data/kindCodeMap.json';

const questions = [
  {
    question: "Q1. 키우고 싶은 동물의 종류는?",
    options: ["강아지", "고양이"]
  },
  {
    question: "Q2. 동물의 크기 또는 체구에 대한 선호는?",
    options: ["작고 아담한", "중간 정도", "크고 존재감 있는"]
  },
  {
    question: "Q3. 어떤 성격의 반려동물을 원하나요?",
    options: ["조용하고 차분한", "활발하고 사교적인"]
  },
  {
    question: "Q4. 털 관리나 알레르기에 민감한가요?",
    options: ["털이 적게 빠졌으면 좋겠어요", "털이 많아도 괜찮아요"]
  },
  {
    question: "Q5. 가족 환경을 알려주세요",
    options: ["아이나 노인, 다른 반려동물이 있음", "해당 없음"]
  }
];

function AdoptionMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [recommendedAnimal, setRecommendedAnimal] = useState('');
  const [matchedAnimals, setMatchedAnimals] = useState([]);
  const navigate = useNavigate();

  const findMatchingBreed = (userAnswers) => {
    const match = petData.find((row) =>
      row["Q1_동물종류"] === userAnswers[0] &&
      row["Q2_크기"] === userAnswers[1] &&
      row["Q3_성격"] === userAnswers[2] &&
      row["Q4_털관리"] === userAnswers[3] &&
      row["Q5_가족환경"] === userAnswers[4]
    );
    return match ? `${userAnswers[0]} > ${match["추천 품종"]}` : null;
  };

  const handleSelect = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const result = findMatchingBreed(newAnswers);
      setRecommendedAnimal(result || "추천 결과를 찾을 수 없습니다.");
      setIsFinished(true);
    }
  };

  const handleViewList = () => {
    navigate('/adopt/animals');
  };

  useEffect(() => {
    const fetchMatchedAnimals = async () => {
      if (recommendedAnimal.includes('>')) {
        const [animalType, rawBreed] = recommendedAnimal.split('>').map(s => s.trim());
        const upkind = animalType === '강아지' ? '417000' : '422400';
        const kindCd = kindCodeMap[rawBreed];

        if (!kindCd) {
          console.warn(`품종 코드 없음: ${rawBreed}`);
          return;
        }

        try {
          const res = await axios.get('/api/animals/adopt/match', {
            params: {
              kind: kindCd,
              upkind
            }
          });

          const items = res.data?.response?.body?.items?.item;
          const animals = Array.isArray(items) ? items : items ? [items] : [];

          const formatted = animals.map((animal) => ({
            id: animal.desertionNo,
            image: animal.popfile1,
            breed: animal.kindNm,
            details: `${animal.sexCd === 'M' ? '수컷' : animal.sexCd === 'F' ? '암컷' : '미상'} / ${animal.colorCd}`,
            date: animal.happenDt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            location: animal.happenPlace
          }));

          setMatchedAnimals(formatted);
        } catch (error) {
          console.error('API fetch error:', error);
        }
      }
    };

    if (isFinished && recommendedAnimal) {
      fetchMatchedAnimals();
    }
  }, [isFinished, recommendedAnimal]);

  return (
    <div className="adoption-match-page">
      <Header />
      <MenuBar />
      <div className="wrap">
        <div className="match-container">
          {!isFinished ? (
            <>
              <h2>입양 추천 질문 {step + 1} / {questions.length}</h2>
              <h3>{questions[step].question}</h3>
              <div className="card-options">
                {questions[step].options.map((option, idx) => (
                  <div
                    key={idx}
                    className="option-card"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="result-area">
              <h2>🎉 매칭 완료!</h2>
              <p>추천하는 입양 동물은 <b>{recommendedAnimal}</b> 입니다.</p>
              <div className="btn-group">
                <button className="submit" onClick={handleViewList}>입양 리스트 보기</button>
              </div>
            </div>
          )}
        </div>

        {isFinished && matchedAnimals.length > 0 && (
          <>
            <h3 style={{ marginTop: '40px' }}>🐾 추천 입양 동물</h3>
            <AnimalCardList animals={matchedAnimals} />
          </>
        )}
      </div>
    </div>
  );
}

export default AdoptionMatch;
