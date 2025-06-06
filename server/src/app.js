const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// MongoDB Atlas 연결
const DB_URI = 'mongodb+srv://project:1234@cluster0.iron4.mongodb.net/capstone?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
const exampleRoute = require('./routes/example');
app.use('/api/example', exampleRoute);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
