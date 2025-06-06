const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animalsController');

// 보호 동물 데이터 가져오기
router.get('/', animalsController.getAnimals);

module.exports = router;