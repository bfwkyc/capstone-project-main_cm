const Missing = require('../models/missingModel');

// 실종 동물 등록
exports.createMissing = async (req, res) => {
  try {
    const missing = new Missing(req.body);
    await missing.save();
    res.status(201).json({ message: '실종 동물이 등록되었습니다.', data: missing });
  } catch (error) {
    res.status(400).json({ message: '등록에 실패했습니다.', error });
  }
};

// 실종 동물 목록 조회
exports.getMissingList = async (req, res) => {
  try {
    const missingList = await Missing.find();
    res.status(200).json(missingList);
  } catch (error) {
    res.status(500).json({ message: '데이터를 가져오는데 실패했습니다.', error });
  }
};