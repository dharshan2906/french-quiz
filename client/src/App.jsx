import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { LoginView } from './components/LoginView';
import { ParticipantLobby } from './components/ParticipantLobby';
import { QuizGame } from './components/QuizGame';
import { ResultsView } from './components/ResultsView';
import { AdminDashboard } from './components/AdminDashboard';
import { LeaderboardModal } from './components/LeaderboardModal';
import { FrenchRulesModal } from './components/FrenchRulesModal';
import { GrandCeremonyModal } from './components/GrandCeremonyModal';
import { sound } from './sounds';
import { AVATAR_LIST } from './avatars';
import { translations } from './translations';

const BACKEND_URL = window.location.port === '5173'
  ? `http://${window.location.hostname}:5000`
  : window.location.origin;

function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lang, setLang] = useState('fr'); // 'fr' or 'en'
  const [user, setUser] = useState(null); // { id, name, avatar, role }
  const [gameState, setGameState] = useState({
    status: 'lobby',
    startTime: null,
    duration: 300,
    participants: []
  });
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [resultData, setResultData] = useState(null);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showCeremonyModal, setShowCeremonyModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const socketRef = useRef(null);
  const t = translations[lang] || translations.fr;

  // Initialize socket connection
  useEffect(() => {
    const s = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10
    });

    s.on('connect', () => {
      console.log('Connected to server with ID:', s.id);
      setConnected(true);
    });

    s.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    s.on('init_state', (data) => {
      setGameState({
        status: data.status,
        startTime: data.startTime,
        duration: data.duration,
        participants: data.participants || []
      });
      if (data.questions) setQuestions(data.questions);
      if (data.leaderboard) setLeaderboard(data.leaderboard);
    });

    s.on('state_update', (data) => {
      setGameState({
        status: data.status,
        startTime: data.startTime,
        duration: data.duration,
        participants: data.participants || []
      });
      if (data.leaderboard) setLeaderboard(data.leaderboard);
    });

    s.on('game_started', (data) => {
      sound.playGameStart();
      setGameState(prev => ({
        ...prev,
        status: 'in_progress',
        startTime: data.startTime,
        duration: data.duration
      }));
      if (data.questions) setQuestions(data.questions);
      setResultData(null);
    });

    s.on('game_reset', () => {
      setGameState(prev => ({
        ...prev,
        status: 'lobby',
        startTime: null,
        participants: []
      }));
      setLeaderboard([]);
      setResultData(null);
      setShowCeremonyModal(false);
      setShowLeaderboardModal(false);

      // If user was a participant, return them to the fresh login screen
      setUser(prev => {
        if (prev && prev.role === 'participant') {
          return null; // Clears participant user data completely!
        }
        return prev; // Retains admin session
      });
    });

    s.on('game_ended', (data) => {
      setGameState(prev => ({ ...prev, status: 'ended' }));
      if (data.leaderboard) setLeaderboard(data.leaderboard);
    });

    s.on('submit_result', (data) => {
      setResultData(data);
      if (data.leaderboard) setLeaderboard(data.leaderboard);
    });

    s.on('launch_ceremony', (data) => {
      if (data && data.leaderboard) setLeaderboard(data.leaderboard);
      setShowCeremonyModal(true);
    });

    socketRef.current = s;
    setSocket(s);

    fetch(`${BACKEND_URL}/api/questions`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.warn('Fetch questions error:', err));

    return () => {
      s.disconnect();
    };
  }, []);

  const handleJoin = (userData) => {
    const userId = 'user_' + Math.random().toString(36).substring(2, 9);
    const fullUser = { ...userData, id: userId };
    setUser(fullUser);

    if (socketRef.current) {
      socketRef.current.emit('join_game', fullUser);
    }
  };

  const handleLeave = () => {
    setUser(null);
    setResultData(null);
  };

  const handleAdminStartGame = () => {
    if (socketRef.current) {
      socketRef.current.emit('admin_start_game');
    }
  };

  const handleAdminResetGame = () => {
    if (socketRef.current) {
      socketRef.current.emit('admin_reset_game');
    }
  };

  const handleAdminLaunchCeremony = () => {
    if (socketRef.current) {
      socketRef.current.emit('admin_launch_ceremony');
    }
    setShowCeremonyModal(true);
  };

  const handleParticipantProgress = (answeredCount) => {
    if (socketRef.current) {
      socketRef.current.emit('progress_update', {
        progress: answeredCount,
        answeredCount
      });
    }
  };

  const handleSubmitQuiz = (answers, timeSpent) => {
    if (socketRef.current) {
      socketRef.current.emit('submit_quiz', {
        answers,
        timeSpent
      });
    }
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Bot generator for easy testing by admin
  const handleAddBot = () => {
    const botNames = ['Lucas', 'Camille', 'Gabriel', 'Emma', 'Hugo', 'Chloé', 'Thomas', 'Inès'];
    const randomName = botNames[Math.floor(Math.random() * botNames.length)] + ' (Bot)';
    const randomAvatar = AVATAR_LIST[Math.floor(Math.random() * AVATAR_LIST.length)].id;
    const botId = 'bot_' + Math.random().toString(36).substring(2, 9);

    if (socketRef.current) {
      socketRef.current.emit('join_game', {
        id: botId,
        name: randomName,
        avatar: randomAvatar,
        role: 'participant'
      });

      if (gameState.status === 'in_progress') {
        setTimeout(() => {
          const fakeAnswers = {};
          questions.forEach(q => {
            const isCorrect = Math.random() < 0.85;
            fakeAnswers[q.id] = isCorrect ? q.correctAnswer : (q.options[1] || 'as mangé');
          });
          socketRef.current.emit('submit_quiz', {
            answers: fakeAnswers,
            timeSpent: Math.floor(Math.random() * 120) + 60
          });
        }, 1500);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main View Switcher */}
      <main style={{ flex: 1, paddingBottom: '32px' }}>
        {!user ? (
          <LoginView
            onJoin={handleJoin}
            onViewLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenRules={() => setShowRulesModal(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            lang={lang}
            onSelectLang={setLang}
            t={t}
          />
        ) : user.role === 'admin' ? (
          <AdminDashboard
            user={user}
            gameState={gameState}
            participants={gameState.participants}
            leaderboard={leaderboard}
            onStartGame={handleAdminStartGame}
            onResetGame={handleAdminResetGame}
            onLaunchCeremony={handleAdminLaunchCeremony}
            onViewLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenRules={() => setShowRulesModal(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            lang={lang}
            onSelectLang={setLang}
            t={t}
          />
        ) : resultData ? (
          <ResultsView
            user={user}
            resultData={resultData}
            onViewLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenRules={() => setShowRulesModal(true)}
            lang={lang}
            onSelectLang={setLang}
            t={t}
          />
        ) : gameState.status === 'in_progress' ? (
          <QuizGame
            user={user}
            questions={questions}
            startTime={gameState.startTime}
            duration={gameState.duration}
            onSubmitQuiz={handleSubmitQuiz}
            onProgressUpdate={handleParticipantProgress}
            onViewLeaderboard={() => setShowLeaderboardModal(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            lang={lang}
            onSelectLang={setLang}
            t={t}
            socket={socketRef.current}
            leaderboard={leaderboard}
          />
        ) : (
          <ParticipantLobby
            user={user}
            participants={gameState.participants}
            onViewLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenRules={() => setShowRulesModal(true)}
            onLeave={handleLeave}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            lang={lang}
            onSelectLang={setLang}
            t={t}
          />
        )}
      </main>

      {/* Leaderboard Modal */}
      {showLeaderboardModal && (
        <LeaderboardModal
          leaderboard={leaderboard}
          onClose={() => setShowLeaderboardModal(false)}
          currentUserId={user?.id}
          lang={lang}
          t={t}
        />
      )}

      {/* French Grammar Rules Modal */}
      {showRulesModal && (
        <FrenchRulesModal
          onClose={() => setShowRulesModal(false)}
          lang={lang}
          t={t}
        />
      )}

      {/* Grand Finale Awards Ceremony Modal */}
      {showCeremonyModal && (
        <GrandCeremonyModal
          leaderboard={leaderboard}
          onClose={() => setShowCeremonyModal(false)}
          lang={lang}
        />
      )}

      {/* Subtle Footer */}
      <footer style={{ textAlign: 'center', padding: '16px', color: 'var(--text-subtle)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>🇫🇷 Quiz Français Passé Composé</span>
          <span>•</span>
          <span>5 Min • 1 Attempt</span>
          <span>•</span>
          <span style={{ color: connected ? '#34d399' : '#f87171' }}>
            ● {connected ? (lang === 'fr' ? 'Serveur Connecté' : 'Server Connected') : (lang === 'fr' ? 'Connexion...' : 'Connecting...')}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
