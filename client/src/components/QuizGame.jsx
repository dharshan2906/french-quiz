import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CartoonAvatar } from '../avatars';
import { LanguageSelector } from './LanguageSelector';
import { sound } from '../sounds';
import { Clock, Trophy, Flame, Sparkles, CheckCircle2, XCircle, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { translations } from '../translations';

const QUESTION_TIME_LIMIT = 30; // 30 seconds per question (as requested)

const OPTION_STYLES = [
  { bg: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: '#60a5fa', shape: '▲', label: 'A' },
  { bg: 'linear-gradient(135deg, #db2777, #be185d)', border: '#f472b6', shape: '◆', label: 'B' },
  { bg: 'linear-gradient(135deg, #d97706, #b45309)', border: '#fbbf24', shape: '●', label: 'C' },
  { bg: 'linear-gradient(135deg, #059669, #047857)', border: '#34d399', shape: '■', label: 'D' }
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const QuizGame = ({
  user,
  questions = [],
  onSubmitQuiz,
  onViewLeaderboard,
  isMuted,
  onToggleMute,
  lang = 'fr',
  onSelectLang,
  t = translations[lang] || translations.fr,
  socket,
  leaderboard = []
}) => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  // Phase: 'answering' | 'feedback' | 'leaderboard_recap'
  const [phase, setPhase] = useState('answering');
  const [lastResult, setLastResult] = useState(null);
  const [recapCountdown, setRecapCountdown] = useState(3);

  const questionTimerRef = useRef(null);
  const recapTimerRef = useRef(null);

  // Initialize and shuffle questions + options on game start
  useEffect(() => {
    if (questions && questions.length > 0) {
      const prepared = shuffleArray(questions).map(q => ({
        ...q,
        shuffledOptions: shuffleArray(q.options || [q.correctAnswer])
      }));
      setShuffledQuestions(prepared);
      setCurrentIndex(0);
      setSecondsLeft(QUESTION_TIME_LIMIT);
      setPhase('answering');
    }
  }, [questions]);

  const currentQ = shuffledQuestions[currentIndex] || questions[0];

  // 30-Second Per-Question Timer
  useEffect(() => {
    if (phase === 'answering') {
      questionTimerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(questionTimerRef.current);
            handleTimeOut();
            return 0;
          }
          if (prev <= 6 && prev > 1) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(questionTimerRef.current);
  }, [phase, currentIndex]);

  const handleTimeOut = () => {
    sound.playWrong();
    setSelectedOption('__TIMEOUT__');

    const newAnswers = { ...userAnswers, [currentQ.id]: '' };
    setUserAnswers(newAnswers);
    setStreak(0);

    setLastResult({
      isCorrect: false,
      isTimeOut: true,
      pointsEarned: 0,
      correctAnswer: currentQ.correctAnswer,
      completedSentence: currentQ.completedSentence,
      rule: currentQ.rule
    });

    if (socket) {
      socket.emit('answer_question', {
        questionId: currentQ.id,
        answer: '',
        timeSecondsOnQuestion: QUESTION_TIME_LIMIT,
        questionIndex: currentIndex
      });
    }

    setPhase('feedback');
    setTimeout(() => {
      setPhase('leaderboard_recap');
      setRecapCountdown(3);
    }, 2200);
  };

  const handleSelectOption = (option) => {
    if (phase !== 'answering' || selectedOption) return;

    clearInterval(questionTimerRef.current);
    setSelectedOption(option);
    const timeSpent = QUESTION_TIME_LIMIT - secondsLeft;

    const newAnswers = { ...userAnswers, [currentQ.id]: option };
    setUserAnswers(newAnswers);

    const isCorrect = (option || '').trim().toLowerCase() === (currentQ.correctAnswer || '').trim().toLowerCase() ||
                      (currentQ.acceptedAnswers && currentQ.acceptedAnswers.includes(option.trim()));

    if (isCorrect) {
      sound.playCorrect();
      try {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.65 },
          colors: ['#34d399', '#38bdf8', '#f59e0b', '#ec4899', '#a855f7']
        });
      } catch (e) {}

      // Fast timing bonus: up to 1000 points!
      const speedPts = Math.max(100, Math.round(1000 - timeSpent * 28));
      const currentStreak = streak + 1;
      const streakBonus = currentStreak * 50;
      const points = speedPts + streakBonus;

      setStreak(currentStreak);
      setTotalScore(prev => prev + points);

      setLastResult({
        isCorrect: true,
        pointsEarned: points,
        correctAnswer: currentQ.correctAnswer,
        completedSentence: currentQ.completedSentence,
        rule: currentQ.rule
      });
    } else {
      sound.playWrong();
      setStreak(0);
      setLastResult({
        isCorrect: false,
        pointsEarned: 0,
        correctAnswer: currentQ.correctAnswer,
        completedSentence: currentQ.completedSentence,
        rule: currentQ.rule
      });
    }

    if (socket) {
      socket.emit('answer_question', {
        questionId: currentQ.id,
        answer: option,
        timeSecondsOnQuestion: timeSpent,
        questionIndex: currentIndex
      });
    }

    setPhase('feedback');
    setTimeout(() => {
      setPhase('leaderboard_recap');
      setRecapCountdown(3);
    }, 1800);
  };

  // Recap 3s auto countdown
  useEffect(() => {
    if (phase === 'leaderboard_recap') {
      if (recapCountdown > 0) {
        recapTimerRef.current = setTimeout(() => {
          setRecapCountdown(prev => prev - 1);
        }, 1000);
      }
    }
    return () => clearTimeout(recapTimerRef.current);
  }, [phase, recapCountdown]);

  const handleNextQuestion = () => {
    sound.playClick();
    clearTimeout(recapTimerRef.current);

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setLastResult(null);
      setSecondsLeft(QUESTION_TIME_LIMIT);
      setPhase('answering');
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    sound.playFanfare();
    onSubmitQuiz(userAnswers);
  };

  // Dynamic color calculation for timer bar: Green -> Yellow -> Red
  const timePercent = Math.max(0, Math.min(100, (secondsLeft / QUESTION_TIME_LIMIT) * 100));
  const getTimerColor = () => {
    if (timePercent > 50) return '#10b981'; // Vibrant Green
    if (timePercent > 25) return '#f59e0b'; // Amber / Yellow
    return '#ef4444'; // Urgent Red
  };

  const timerColor = getTimerColor();
  const isUrgent = secondsLeft <= 7;
  const myRank = leaderboard.find(l => l.id === user.id)?.rank || 1;

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '12px', minHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <div className="glass-panel" style={{ padding: '14px 20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* User Info & Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CartoonAvatar id={user.avatar} size={46} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{user.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#fbbf24' }}>
                  {totalScore} pts
                </span>
                {streak > 1 && (
                  <span style={{ fontSize: '0.78rem', color: '#f97316', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Flame size={14} fill="#f97316" /> {streak}x streak
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Question Index Pill */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            padding: '6px 14px',
            borderRadius: '999px',
            color: '#c7d2fe',
            fontWeight: 800,
            fontSize: '0.88rem'
          }}>
            Question {currentIndex + 1} / {shuffledQuestions.length || 20}
          </div>

          {/* Navigation Actions */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <LanguageSelector currentLang={lang} onSelectLang={onSelectLang} />
            <button onClick={() => { sound.playClick(); onViewLeaderboard(); }} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }} title={t.leaderboard}>
              <Trophy size={16} color="#f59e0b" />
            </button>
            <button onClick={onToggleMute} className="btn-secondary" style={{ padding: '6px 10px' }}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>

        {/* 30-Second Dynamic Color Timer Line (Green -> Yellow -> Red) */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.85rem' }}>
            <span style={{ color: timerColor, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={16} /> {secondsLeft}s {isUrgent && <span style={{ animation: 'timerUrgent 0.8s infinite' }}>⚠️ {t.hurryUp}</span>}
            </span>
            <span style={{ fontWeight: 800, color: '#818cf8' }}>
              Rang #{myRank}
            </span>
          </div>

          {/* Shrinking Color Bar */}
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', border: `1px solid ${timerColor}40` }}>
            <div
              style={{
                width: `${timePercent}%`,
                height: '100%',
                background: timerColor,
                borderRadius: '999px',
                transition: 'width 1s linear, background-color 0.4s ease',
                boxShadow: `0 0 14px ${timerColor}90`
              }}
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: 30-SECOND ACTIVE QUESTION & 4 CHOICE CARDS */}
      {phase !== 'leaderboard_recap' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* French Sentence Card */}
          <div className="glass-panel" style={{ padding: '26px 20px', marginBottom: '18px', textAlign: 'center', position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '999px', color: '#c7d2fe', fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px' }}>
              <Sparkles size={14} /> Verbe : <strong>{currentQ?.verb}</strong>
            </div>

            {/* Main French Sentence */}
            <div style={{
              fontSize: '1.85rem',
              fontWeight: 900,
              lineHeight: 1.35,
              color: '#ffffff',
              marginBottom: '10px'
            }}>
              {currentQ?.sentence.split('______')[0]}
              <span style={{
                display: 'inline-block',
                padding: '2px 14px',
                margin: '0 4px',
                borderBottom: '3px solid #818cf8',
                color: selectedOption ? (lastResult?.isCorrect ? '#34d399' : '#f87171') : '#60a5fa',
                fontWeight: 900
              }}>
                {selectedOption === '__TIMEOUT__' ? '⏱️ (Temps écoulé)' : (selectedOption || '______')}
              </span>
              {currentQ?.sentence.split('______')[1]}
            </div>

            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              🇬🇧 "{currentQ?.translation}"
            </div>

            {/* Immediate Result Banner */}
            {phase === 'feedback' && lastResult && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '12px',
                background: lastResult.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${lastResult.isCorrect ? '#10b981' : '#ef4444'}`,
                color: lastResult.isCorrect ? '#34d399' : '#fca5a5',
                fontWeight: 900,
                fontSize: '1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {lastResult.isCorrect ? (
                  <>
                    <CheckCircle2 size={24} /> BRAVO ! +{lastResult.pointsEarned} PTS 🚀
                  </>
                ) : (
                  <>
                    <XCircle size={24} /> {lastResult.isTimeOut ? t.timeOut : 'Oups !'} Bonne réponse : {lastResult.correctAnswer}
                  </>
                )}
              </div>
            )}
          </div>

          {/* 4 Big Color Choice Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            flex: 1
          }}>
            {(currentQ?.shuffledOptions || currentQ?.options || []).map((opt, idx) => {
              const style = OPTION_STYLES[idx % OPTION_STYLES.length];
              const isChosen = selectedOption === opt;
              const isCorrectOpt = (opt || '').trim().toLowerCase() === (currentQ.correctAnswer || '').trim().toLowerCase();

              let btnBg = style.bg;
              let btnBorder = style.border;

              if (phase === 'feedback') {
                if (isCorrectOpt) {
                  btnBg = 'linear-gradient(135deg, #10b981, #059669)';
                  btnBorder = '#34d399';
                } else if (isChosen && !isCorrectOpt) {
                  btnBg = 'linear-gradient(135deg, #ef4444, #dc2626)';
                  btnBorder = '#f87171';
                } else {
                  btnBg = 'rgba(255,255,255,0.05)';
                  btnBorder = 'rgba(255,255,255,0.1)';
                }
              }

              return (
                <button
                  key={opt + idx}
                  disabled={phase !== 'answering'}
                  onClick={() => handleSelectOption(opt)}
                  style={{
                    background: btnBg,
                    border: `2px solid ${btnBorder}`,
                    borderRadius: '16px',
                    padding: '22px 14px',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    cursor: phase === 'answering' ? 'pointer' : 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minHeight: '94px',
                    boxShadow: isChosen ? '0 0 25px rgba(255,255,255,0.6)' : '0 6px 18px rgba(0,0,0,0.3)',
                    transform: isChosen ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.88rem',
                    fontWeight: 900
                  }}>
                    {style.shape}
                  </div>
                  <span style={{ textAlign: 'center', wordBreak: 'break-word' }}>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: INTERACTIVE LIVE LEADERBOARD RECAP AFTER EACH QUESTION */
        <div className="glass-panel" style={{ padding: '28px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ marginBottom: '12px' }}>
              <CartoonAvatar id={user.avatar} size={76} animate={true} />
            </div>

            {lastResult?.isCorrect ? (
              <div style={{ color: '#34d399', fontSize: '1.9rem', fontWeight: 900, marginBottom: '6px' }}>
                🎉 +{lastResult.pointsEarned} POINTS !
              </div>
            ) : (
              <div style={{ color: '#f87171', fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
                {lastResult?.isTimeOut ? '⏰ Temps écoulé (0 pt)' : '❌ 0 Point'}
              </div>
            )}

            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
              Vous êtes au <strong>Rang #{myRank}</strong> avec <strong>{totalScore} pts</strong> !
            </div>

            {/* Sentence Pill */}
            <div style={{
              padding: '12px 18px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '20px',
              color: '#38bdf8',
              fontSize: '1.15rem',
              fontWeight: 800
            }}>
              ➡️ {lastResult?.completedSentence}
            </div>

            {/* Mini Top 3 snippet */}
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={16} color="#f59e0b" /> TOP CLASSEMENT EN DIRECT :
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {leaderboard.slice(0, 3).map((item) => {
                  const isMe = item.id === user.id;
                  return (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: isMe ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.04)',
                        border: isMe ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>
                          {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
                        </span>
                        <CartoonAvatar id={item.avatar} size={28} />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                          {item.name} {isMe && '(Vous)'}
                        </span>
                      </div>
                      <span style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.9rem' }}>
                        {item.score} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Big Next Question Button */}
          <button
            onClick={handleNextQuestion}
            className="btn-primary"
            style={{
              padding: '16px',
              fontSize: '1.2rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {currentIndex < shuffledQuestions.length - 1 ? (
              <>
                Question Suivante ➔ {recapCountdown > 0 && `(${recapCountdown}s)`}
              </>
            ) : (
              <>
                Voir le Grand Podium Final 🏁
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
