const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth'); 
app.use('/auth', authRouter); 

// 홈 화면용 API (최근 보호동물)
app.get('/api/animals/home', async (req, res) => {
  try {
    const { upkind, bgnde, endde } = req.query;
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          _type: 'json',
          upkind,
          bgnde,
          endde,
          numOfRows: 10
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: '홈 화면 호출 실패', detail: error?.response?.data || error.message });
  }
});

// 필터 검색용 API
app.get('/api/animals', async (req, res) => {
  try {
    const {
      bgnde, endde, sex_cd,
      upkind, kind,
      sido, sigungu, shelter
    } = req.query;

    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          _type: 'json',
          bgnde,
          endde,
          sexCd: sex_cd,
          upkind,
          kind,
          upr_cd: sido,
          org_cd: sigungu,
          care_reg_no: shelter,
          numOfRows: 500
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: '검색 API 실패', detail: error?.response?.data || error.message });
  }
});

// 시도 목록 조회 API
app.get('/api/sido', async (req, res) => {
  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/sido_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          _type: 'json',
          numOfRows: 1000
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('시도 목록 호출 실패:', error?.response?.data || error.message);
    res.status(500).json({
      error: '시도 목록 호출 실패',
      detail: error?.response?.data || error.message,
    });
  }
});

// 시군구 목록 조회 API
app.get('/api/sigungu', async (req, res) => {
  try {
    const { upr_cd } = req.query;
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/sigungu_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          upr_cd,
          _type: 'json',
          numOfRows: 1000
        }
      }
    );

    const items = response.data?.response?.body?.items?.item;
    const filtered = (Array.isArray(items) ? items : items ? [items] : [])
      .filter(item => item.orgdownNm !== '가정보호')
      .sort((a, b) => a.orgdownNm.localeCompare(b.orgdownNm));
    response.data.response.body.items.item = filtered;

    res.json(response.data);
  } catch (error) {
    console.error('시군구 목록 호출 실패:', error?.response?.data || error.message);
    res.status(500).json({
      error: '시군구 목록 호출 실패',
      detail: error?.response?.data || error.message,
    });
  }
});

// 보호소 목록 조회 API
app.get('/api/shelter', async (req, res) => {
  try {
    const { upr_cd, org_cd } = req.query;
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/shelter_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          upr_cd,
          org_cd,
          _type: 'json',
          numOfRows: 1000
        }
      }
    );

    const items = response.data?.response?.body?.items?.item;
    const sorted = (Array.isArray(items) ? items : items ? [items] : [])
      .sort((a, b) => a.careNm?.localeCompare(b.careNm));
    response.data.response.body.items.item = sorted;

    res.json(response.data);
  } catch (error) {
    console.error('보호소 목록 호출 실패:', error?.response?.data || error.message);
    res.status(500).json({
      error: '보호소 목록 호출 실패',
      detail: error?.response?.data || error.message,
    });
  }
});

// 품종 목록 조회 API
app.get('/api/kind', async (req, res) => {
  try {
    const { up_kind_cd } = req.query;
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/kind_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          up_kind_cd,
          _type: 'json',
          numOfRows: 1000
        }
      }
    );

    const items = response.data?.response?.body?.items?.item;
    const sorted = (Array.isArray(items) ? items : items ? [items] : [])
      .sort((a, b) => a.kindNm?.localeCompare(b.kindNm));
    response.data.response.body.items.item = sorted;

    res.json(response.data);
  } catch (error) {
    console.error('품종 목록 호출 실패:', error?.response?.data || error.message);
    res.status(500).json({
      error: '품종 목록 호출 실패',
      detail: error?.response?.data || error.message,
    });
  }
});

// 구조동물 상세 조회 API (desertionNo 기준)
app.get('/api/animal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          _type: 'json',
          numOfRows: 1000
        }
      }
    );

    const items = response.data?.response?.body?.items?.item || [];
    const list = Array.isArray(items) ? items : [items];
    const found = list.find(animal => animal.desertionNo === id);

    if (!found) {
      return res.status(404).json({ error: '해당 ID의 동물을 찾을 수 없습니다.' });
    }

    res.json(found);
  } catch (error) {
    console.error('상세조회 API 호출 실패:', error?.response?.data || error.message);
    res.status(500).json({
      error: '상세조회 API 호출 실패',
      detail: error?.response?.data || error.message,
    });
  }
});

app.get('/api/animals/adopt/match', async (req, res) => {
  try {
    const { kind, upkind } = req.query;

    const bgnde = '20240101';
    const endde = (() => {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      return twoWeeksAgo.toISOString().slice(0, 10).replace(/-/g, '');
    })();

    const response = await axios.get(
      'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2',
      {
        params: {
          serviceKey: process.env.SERVICE_KEY,
          _type: 'json',
          upkind,
          kind,
          bgnde,
          endde,
          numOfRows: 8
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: '추천 매칭 검색 실패', detail: error?.response?.data || error.message });
  }
});


app.listen(PORT, () => {
  console.log(`백엔드 서버 실행 중: http://localhost:${PORT}`);
});
