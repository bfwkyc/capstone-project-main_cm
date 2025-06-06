const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('qs');

router.get('/kakao/callback', async (req, res) => {
    const { code } = req.query;
  
    try {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        qs.stringify({
          grant_type: 'authorization_code',
          client_id: 'ca9b89ace9bbff6cdd5ddf07a2fe5a1c',
          redirect_uri: 'http://localhost:3000/oauth/callback/kakao',
          code,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
  
      const accessToken = tokenResponse.data.access_token;
  
      const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      res.json(userResponse.data); // 프론트에 사용자 정보 전송
    } catch (err) {
      console.error('카카오 로그인 에러:', err.response?.data || err.message);
      res.status(500).json({ error: 'Kakao login failed', detail: err.response?.data || err.message });
    }
  });  
  
module.exports = router;
