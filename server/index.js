const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const questions = require('./questions');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const GAME_DURATION = 600; // 10 minutes in seconds (user specified)
const ADMIN_PASSWORD = 'kavi@08'; // user specified

let gameState = {
  status: 'lobby', // 'lobby' | 'in_progress' | 'ended'
  startTime: null,
  duration: GAME_DURATION,
  participants: {},
  adminPresent: false
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getLeaderboard() {
  const list = Object.values(gameState.participants)
    .filter(p => p.role === 'participant')
    .map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score || 0,
      correctCount: p.correctCount || 0,
      totalQuestions: questions.length,
      accuracy: Math.round(((p.correctCount || 0) / questions.length) * 100),
      timeSpent: p.timeSpent || 0,
      submitted: p.submitted || false,
      progress: p.progress || 0,
      streak: p.streak || 0
    }));

  list.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.timeSpent - b.timeSpent;
  });

  return list.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

function broadcastState() {
  const leaderboard = getLeaderboard();
  io.emit('state_update', {
    status: gameState.status,
    startTime: gameState.startTime,
    duration: gameState.duration,
    participants: Object.values(gameState.participants),
    leaderboard
  });
}

// REST Endpoints
app.get('/api/state', (req, res) => {
  res.json({
    status: gameState.status,
    startTime: gameState.startTime,
    duration: gameState.duration,
    participants: Object.values(gameState.participants),
    leaderboard: getLeaderboard()
  });
});

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(getLeaderboard());
});

app.post('/api/admin/start', (req, res) => {
  gameState.status = 'in_progress';
  gameState.startTime = Date.now();
  Object.keys(gameState.participants).forEach(id => {
    if (gameState.participants[id].role === 'participant') {
      gameState.participants[id].score = 0;
      gameState.participants[id].correctCount = 0;
      gameState.participants[id].timeSpent = 0;
      gameState.participants[id].submitted = false;
      gameState.participants[id].progress = 0;
      gameState.participants[id].streak = 0;
      gameState.participants[id].answers = {};
    }
  });
  broadcastState();
  io.emit('game_started', {
    startTime: gameState.startTime,
    duration: gameState.duration,
    questions
  });
  res.json({ success: true, message: 'Game started' });
});

app.post('/api/admin/reset', (req, res) => {
  gameState.status = 'lobby';
  gameState.startTime = null;
  Object.keys(gameState.participants).forEach(id => {
    if (gameState.participants[id].role === 'participant') {
      gameState.participants[id].score = 0;
      gameState.participants[id].correctCount = 0;
      gameState.participants[id].timeSpent = 0;
      gameState.participants[id].submitted = false;
      gameState.participants[id].progress = 0;
      gameState.participants[id].streak = 0;
      gameState.participants[id].answers = {};
    }
  });
  broadcastState();
  io.emit('game_reset');
  res.json({ success: true, message: 'Game reset to lobby' });
});

// Socket Connections
io.on('connection', (socket) => {
  socket.emit('init_state', {
    status: gameState.status,
    startTime: gameState.startTime,
    duration: gameState.duration,
    questions,
    leaderboard: getLeaderboard(),
    participants: Object.values(gameState.participants)
  });

  // User Join
  socket.on('join_game', (userData) => {
    const { name, avatar, role, id } = userData;
    const participantId = id || socket.id;

    gameState.participants[participantId] = {
      id: participantId,
      socketId: socket.id,
      name: name || (role === 'admin' ? 'Professeur Admin' : 'Étudiant'),
      avatar: avatar || 'pengiun',
      role: role || 'participant',
      score: 0,
      correctCount: 0,
      totalQuestions: questions.length,
      timeSpent: 0,
      submitted: false,
      progress: 0,
      streak: 0,
      answers: {}
    };

    if (role === 'admin') {
      gameState.adminPresent = true;
    }

    socket.participantId = participantId;
    broadcastState();
  });

  // Admin Start Game
  socket.on('admin_start_game', () => {
    gameState.status = 'in_progress';
    gameState.startTime = Date.now();
    Object.keys(gameState.participants).forEach(id => {
      if (gameState.participants[id].role === 'participant') {
        gameState.participants[id].score = 0;
        gameState.participants[id].correctCount = 0;
        gameState.participants[id].timeSpent = 0;
        gameState.participants[id].submitted = false;
        gameState.participants[id].progress = 0;
        gameState.participants[id].streak = 0;
        gameState.participants[id].answers = {};
      }
    });
    broadcastState();
    io.emit('game_started', {
      startTime: gameState.startTime,
      duration: gameState.duration,
      questions
    });
  });

  // Admin Reset Game
  socket.on('admin_reset_game', () => {
    gameState.status = 'lobby';
    gameState.startTime = null;
    Object.keys(gameState.participants).forEach(id => {
      if (gameState.participants[id].role === 'participant') {
        gameState.participants[id].score = 0;
        gameState.participants[id].correctCount = 0;
        gameState.participants[id].timeSpent = 0;
        gameState.participants[id].submitted = false;
        gameState.participants[id].progress = 0;
        gameState.participants[id].streak = 0;
        gameState.participants[id].answers = {};
      }
    });
    broadcastState();
    io.emit('game_reset');
  });

  // Admin End Game
  socket.on('admin_end_game', () => {
    gameState.status = 'ended';
    broadcastState();
    io.emit('game_ended', { leaderboard: getLeaderboard() });
  });

  // Admin Launch Grand Finale Ceremony
  socket.on('admin_launch_ceremony', () => {
    const leaderboard = getLeaderboard();
    io.emit('launch_ceremony', { leaderboard });
  });

  // Per-Question Instant Answer & Timing Points
  socket.on('answer_question', ({ questionId, answer, timeSecondsOnQuestion, questionIndex }) => {
    const pId = socket.participantId;
    if (!pId || !gameState.participants[pId]) return;

    const p = gameState.participants[pId];
    const q = questions.find(item => item.id === questionId);
    if (!q) return;

    const userAnswer = (answer || '').trim();
    const normalize = (str) =>
      str.toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();

    const isCorrect = q.acceptedAnswers.some(ans => ans.toLowerCase().trim() === userAnswer.toLowerCase()) ||
                      q.acceptedAnswers.some(ans => normalize(ans) === normalize(userAnswer));

    let pointsEarned = 0;
    if (isCorrect) {
      p.correctCount = (p.correctCount || 0) + 1;
      p.streak = (p.streak || 0) + 1;
      // Timing points: 1000 max, fast answers get more bonus points!
      const speedScore = Math.max(100, Math.round(1000 - Math.min(20, (timeSecondsOnQuestion || 5)) * 40));
      const streakBonus = Math.min(500, p.streak * 50);
      pointsEarned = speedScore + streakBonus;
      p.score = (p.score || 0) + pointsEarned;
    } else {
      p.streak = 0;
    }

    p.progress = questionIndex + 1;
    p.answers[questionId] = userAnswer;
    p.timeSpent = (p.timeSpent || 0) + (timeSecondsOnQuestion || 5);

    const leaderboard = getLeaderboard();
    const myRank = leaderboard.find(l => l.id === pId)?.rank || 1;

    // Send instant evaluation to participant
    socket.emit('answer_result', {
      questionId,
      isCorrect,
      correctAnswer: q.correctAnswer,
      completedSentence: q.completedSentence,
      rule: q.rule,
      translation: q.translation,
      pointsEarned,
      totalScore: p.score,
      streak: p.streak,
      rank: myRank,
      leaderboard
    });

    // Broadcast updated leaderboard to all users live!
    broadcastState();
  });

  // Complete Quiz Submission
  socket.on('submit_quiz', ({ answers, timeSpent }) => {
    const pId = socket.participantId;
    if (!pId || !gameState.participants[pId]) return;

    const participant = gameState.participants[pId];
    participant.submitted = true;
    participant.timeSpent = timeSpent || participant.timeSpent || GAME_DURATION;
    participant.progress = questions.length;

    // Detailed results
    let correctCount = 0;
    let detailedResults = [];

    questions.forEach((q) => {
      const userAnswer = (answers[q.id] || participant.answers[q.id] || '').trim();
      const normalize = (str) =>
        str.toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();

      const isCorrect = q.acceptedAnswers.some(ans => ans.toLowerCase().trim() === userAnswer.toLowerCase()) ||
                        q.acceptedAnswers.some(ans => normalize(ans) === normalize(userAnswer));

      if (isCorrect) correctCount++;

      detailedResults.push({
        questionId: q.id,
        sentence: q.sentence,
        fullPrompt: q.fullPrompt,
        completedSentence: q.completedSentence,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        rule: q.rule,
        translation: q.translation
      });
    });

    participant.correctCount = correctCount;

    const leaderboard = getLeaderboard();
    const rankObj = leaderboard.find(l => l.id === pId);

    socket.emit('submit_result', {
      score: participant.score,
      correctCount,
      totalQuestions: questions.length,
      accuracy: Math.round((correctCount / questions.length) * 100),
      timeSpent: participant.timeSpent,
      rank: rankObj ? rankObj.rank : 1,
      detailedResults,
      leaderboard
    });

    broadcastState();
  });

  socket.on('disconnect', () => {
    broadcastState();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🇫🇷 French Quiz Server running on http://localhost:${PORT}`);
});
