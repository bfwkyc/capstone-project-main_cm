const express = require('express');
const router = express.Router();
const missingController = require('../controllers/missingcontroller');

// 실종 동물 등록
router.post('/', missingController.createMissing);

// 실종 동물 목록 조회
router.get('/', missingController.getMissingList);

module.exports = router;