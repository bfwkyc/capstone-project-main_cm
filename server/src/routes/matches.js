const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController');

// 매칭 데이터 가져오기
router.get('/', matchesController.getMatches);

module.exports = router;

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import '../styles/MissingResult.css';

function MissingResult() {
  const [matches, setMatches] = useState([]);
  const [responses, setResponses] = useState({});
  const [showFailed, setShowFailed] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/matches');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  // 나머지 코드는 기존 코드 유지
}