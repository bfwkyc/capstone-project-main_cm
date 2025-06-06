import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import axios from 'axios';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MissingRegister.css';
import '../styles/wrap.css';

const today = new Date().toISOString().split('T')[0];

function MissingRegister() {
  const [form, setForm] = useState({
    name: '',
    type: '',
    breed: '',
    colors: [],
    gender: '',
    neutered: '',
    features: '',
    lostDate: today,
    lostLocation: '',
    lostSituation: '',
    images: [],
  });

  const [upkind, setUpkind] = useState('');
  const [kindList, setKindList] = useState([]);

  const navigate = useNavigate();

  const colors = ['흰색', '검정', '회색', '갈색', '노랑', '주황', '크림', '고동', '베이지'];
  const requiredFields = ['images', 'name', 'type', 'breed', 'colors', 'gender', 'lostDate', 'lostLocation'];

  useEffect(() => {
    if (!upkind) {
      setKindList([]);
      return;
    }

    axios.get('/api/kind', { params: { up_kind_cd: upkind } }).then((res) => {
      const items = res.data?.response?.body?.items?.item;
      setKindList(Array.isArray(items) ? items : items ? [items] : []);
    });
  }, [upkind]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm((prevForm) => ({
      ...prevForm,
      images: [...prevForm.images, ...previews],
    }));

    // const dummyPrediction = {
    //   type: '강아지',
    //   breed: '진도견',
    //   colors: ['흰색'],
    // };
    // setPredictedData(dummyPrediction);
    // setShowPopup(true);
    // setQuestionIndex(0);
  };

  // const [predictedData, setPredictedData] = useState(null);
  // const [showPopup, setShowPopup] = useState(false);
  // const [questionIndex, setQuestionIndex] = useState(0);

  // const handleAnswer = (isYes) => {
  //   if (!predictedData) return;
  //   const field = ['type', 'breed', 'colors'][questionIndex];

  //   if (isYes) {
  //     if (field === 'colors') {
  //       setForm({ ...form, colors: predictedData.colors });
  //     } else {
  //       setForm({ ...form, [field]: predictedData[field] });
  //     }
  //   }

  //   if (questionIndex === 2) {
  //     setShowPopup(false);
  //   } else {
  //     setQuestionIndex((prev) => prev + 1);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = requiredFields.filter((field) => {
      if (field === 'images') return form.images.length === 0;
      if (field === 'colors') return !form.colors || form.colors.length === 0;
      return !form[field];
    });

    if (missingFields.length > 0) {
      alert('필수 항목을 모두 입력해주세요!');
      return;
    }

    console.log('Form submitted:', form);
    alert('등록이 완료되었습니다!');
    navigate('/');
  };

  return (
    <div className="register-container">
      <Header />
      <MenuBar />
      <div className="wrap">
        <h2>실종 동물 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>이미지</label>
            <div className="image-preview-area">
              {form.images.map((img, idx) => (
                <div className="image-thumb" key={idx}>
                  <img src={img} alt={`uploaded-${idx}`} />
                  <button type="button" className="delete-btn" onClick={() => {
                    const updated = [...form.images];
                    updated.splice(idx, 1);
                    setForm({ ...form, images: updated });
                  }}>✕</button>
                </div>
              ))}
              <label htmlFor="image-upload" className="upload-box">+</label>
              <input type="file" id="image-upload" multiple onChange={handleImageUpload} accept="image/*" hidden />
            </div>
          </div>

          {/* 팝업 제거 */}
          {/* {showPopup && predictedData && (...) } */}

          <div className="form-group">
            <label>이름</label>
            <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>동물 종류</label>
            <select
              name="type"
              value={form.type}
              onChange={(e) => {
                setUpkind(e.target.value); // API 호출
                setForm({ ...form, type: e.target.value, breed: '' });
              }}
            >
              <option value="">선택하세요</option>
              <option value="417000">개</option>
              <option value="422400">고양이</option>
              <option value="429900">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label>품종</label>
            <select
              name="breed"
              value={form.breed}
              onChange={handleChange}
              disabled={!upkind}
            >
              {!upkind ? (
                <option value="">먼저 동물 종류를 선택해주세요</option>
              ) : (
                <>
                  <option value="">선택하세요</option>
                  {kindList.map((item) => (
                    <option key={item.kindCd} value={item.kindNm}>{item.kindNm}</option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>털색</label>
            <div className="color-options">
              {colors.map((c) => {
                const isSelected = form.colors.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    className={isSelected ? 'selected' : ''}
                    onClick={() => {
                      const updatedColors = isSelected ? form.colors.filter((color) => color !== c) : [...form.colors, c];
                      setForm({ ...form, colors: updatedColors });
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>성별</label>
            <div className="select-group">
              <button type="button" className={form.gender === '수컷' ? 'selected' : ''} onClick={() => setForm({ ...form, gender: '수컷' })}>수컷</button>
              <button type="button" className={form.gender === '암컷' ? 'selected' : ''} onClick={() => setForm({ ...form, gender: '암컷' })}>암컷</button>
            </div>
          </div>

          <div className="form-group">
            <label>중성화 여부</label>
            <div className="select-group">
              <button type="button" className={form.neutered === '예' ? 'selected' : ''} onClick={() => setForm({ ...form, neutered: '예' })}>예</button>
              <button type="button" className={form.neutered === '아니오' ? 'selected' : ''} onClick={() => setForm({ ...form, neutered: '아니오' })}>아니오</button>
            </div>
          </div>

          <div className="form-group">
            <label>특징</label>
            <textarea name="features" value={form.features} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>실종일</label>
            <input type="date" name="lostDate" value={form.lostDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>실종장소</label>
            <input name="lostLocation" value={form.lostLocation} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>실종상황</label>
            <textarea name="lostSituation" value={form.lostSituation} onChange={handleChange} />
          </div>

          <div className="btn-group">
            <button type="submit" className="submit">등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MissingRegister;
