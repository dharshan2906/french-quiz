import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { LanguageSelector } from './LanguageSelector';
import { sound } from '../sounds';
import { Trophy, CheckCircle2, XCircle, Sparkles, BookOpen, Medal, Eye } from 'lucide-react';
import { translations } from '../translations';

export const ResultsView = ({
  user,
  resultData,
  onViewLeaderboard,
  onOpenRules,
  lang = 'fr',
  onSelectLang,
  t = translations[lang] || translations.fr
}) => {
  // Mode: 'podium' | 'top10' | 'review'
  const [viewMode, setViewMode] = useState('podium');

  useEffect(() => {
    sound.playFanfare();
    try {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 9999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 60 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 300);
    } catch (e) {}
  }, []);

  const {
    score = 0,
    correctCount = 0,
    totalQuestions = 20,
    accuracy = 0,
    rank = 1,
    detailedResults = [],
    leaderboard = []
  } = resultData || {};

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  const top10List = leaderboard.slice(0, 10);

  const getRankBadge = (r) => {
    if (r === 1) return { text: lang === 'fr' ? '1er - Champion d’Or 🥇' : '1st - Gold Champion 🥇', color: '#f59e0b' };
    if (r === 2) return { text: lang === 'fr' ? '2ème - Argent 🥈' : '2nd - Silver 🥈', color: '#94a3b8' };
    if (r === 3) return { text: lang === 'fr' ? '3ème - Bronze 🥉' : '3rd - Bronze 🥉', color: '#d97706' };
    return { text: `#${r} ${lang === 'fr' ? 'au Classement' : 'on Leaderboard'}`, color: '#818cf8' };
  };

  const rankBadge = getRankBadge(rank);

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '20px 16px' }}>
      {/* Top Header with Language Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CartoonAvatar id={user.avatar} size={44} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{user.name}</div>
            <div style={{ fontSize: '0.8rem', color: rankBadge.color, fontWeight: 700 }}>
              {rankBadge.text} • {score} pts
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LanguageSelector currentLang={lang} onSelectLang={onSelectLang} />
          <button onClick={() => setViewMode('review')} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
            <BookOpen size={16} /> <span>{t.reviewRulesBtn}</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs (Podium Top 3 vs Full Top 10 vs Detailed Review) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '10px',
        marginBottom: '24px',
        background: 'rgba(0,0,0,0.35)',
        padding: '6px',
        borderRadius: '16px'
      }}>
        <button
          onClick={() => { sound.playClick(); setViewMode('podium'); }}
          style={{
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            background: viewMode === 'podium' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'transparent',
            color: viewMode === 'podium' ? '#111827' : 'var(--text-muted)',
            fontWeight: 900,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: viewMode === 'podium' ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none'
          }}
        >
          <Trophy size={18} /> {t.top3Title}
        </button>

        <button
          onClick={() => { sound.playClick(); setViewMode('top10'); }}
          style={{
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            background: viewMode === 'top10' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
            color: viewMode === 'top10' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 900,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: viewMode === 'top10' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none'
          }}
        >
          <Medal size={18} /> {t.top10Title}
        </button>

        <button
          onClick={() => { sound.playClick(); setViewMode('review'); }}
          style={{
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            background: viewMode === 'review' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
            color: viewMode === 'review' ? '#ffffff' : 'var(--text-muted)',
            fontWeight: 900,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: viewMode === 'review' ? '0 4px 15px rgba(16, 185, 129, 0.4)' : 'none'
          }}
        >
          <CheckCircle2 size={18} /> {t.reviewTitle}
        </button>
      </div>

      {/* VIEW 1: GRAND PODIUM TOP 3 REVEAL */}
      {viewMode === 'podium' && (
        <div className="glass-panel" style={{ padding: '36px 20px', textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fbbf24', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            🏆 {t.top3Title} 🏆
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.05rem' }}>
            {lang === 'fr' ? "Félicitations aux 3 meilleurs champions de la session !" : "Congratulations to the top 3 champions of the session!"}
          </p>

          {/* 3D Animated Grand Podium */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '14px',
            maxWidth: '680px',
            margin: '0 auto 32px'
          }}>
            {/* 2nd Place (Silver) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              {top2 ? (
                <>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <CartoonAvatar id={top2.avatar} size={70} animate={true} />
                    <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#94a3b8', color: '#0f172a', fontWeight: 900, fontSize: '0.85rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                      2
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', color: '#e2e8f0' }}>
                    {top2.name}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#94a3b8', fontWeight: 800 }}>
                    {top2.score} pts
                  </div>
                  <div style={{
                    width: '100%',
                    height: '110px',
                    background: 'linear-gradient(to top, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.15))',
                    borderTop: '4px solid #94a3b8',
                    borderRadius: '16px 16px 0 0',
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    fontWeight: 900,
                    fontSize: '1.1rem'
                  }}>
                    🥈 2ème
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{top2.correctCount || 0}/20 corrects</span>
                  </div>
                </>
              ) : (
                <div style={{ height: '140px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
              )}
            </div>

            {/* 1st Place (Gold Champion) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1.2 }}>
              {top1 ? (
                <>
                  <div style={{ fontSize: '2.2rem', marginBottom: '-8px', animation: 'float 2s infinite' }}>👑</div>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <CartoonAvatar id={top1.avatar} size={90} animate={true} />
                    <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#f59e0b', color: '#1c1917', fontWeight: 900, fontSize: '1rem', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.7)' }}>
                      1
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fbbf24', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                    {top1.name}
                  </div>
                  <div style={{ fontSize: '1.15rem', color: '#f59e0b', fontWeight: 900 }}>
                    {top1.score} pts
                  </div>
                  <div style={{
                    width: '100%',
                    height: '150px',
                    background: 'linear-gradient(to top, rgba(245, 158, 11, 0.5), rgba(245, 158, 11, 0.2))',
                    borderTop: '5px solid #f59e0b',
                    borderRadius: '18px 18px 0 0',
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fbbf24',
                    fontWeight: 900,
                    fontSize: '1.3rem',
                    boxShadow: '0 0 35px rgba(245, 158, 11, 0.4)'
                  }}>
                    🥇 CHAMPION
                    <span style={{ fontSize: '0.82rem', color: '#fef3c7' }}>{top1.correctCount || 0}/20 corrects</span>
                  </div>
                </>
              ) : (
                <div style={{ height: '170px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
              )}
            </div>

            {/* 3rd Place (Bronze) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              {top3 ? (
                <>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <CartoonAvatar id={top3.avatar} size={70} animate={true} />
                    <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#d97706', color: '#ffffff', fontWeight: 900, fontSize: '0.85rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                      3
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.05rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', color: '#e2e8f0' }}>
                    {top3.name}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#d97706', fontWeight: 800 }}>
                    {top3.score} pts
                  </div>
                  <div style={{
                    width: '100%',
                    height: '80px',
                    background: 'linear-gradient(to top, rgba(217, 119, 6, 0.4), rgba(217, 119, 6, 0.15))',
                    borderTop: '4px solid #d97706',
                    borderRadius: '16px 16px 0 0',
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d97706',
                    fontWeight: 900,
                    fontSize: '1.1rem'
                  }}>
                    🥉 3ème
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{top3.correctCount || 0}/20 corrects</span>
                  </div>
                </>
              ) : (
                <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
              )}
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); setViewMode('top10'); }}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '1.05rem' }}
          >
            📋 {t.showTop10Btn} ➔
          </button>
        </div>
      )}

      {/* VIEW 2: TOP 10 RANKINGS LIST */}
      {viewMode === 'top10' && (
        <div className="glass-panel" style={{ padding: '32px 24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#818cf8' }}>
                🌟 {t.top10Title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {lang === 'fr' ? "Les 10 meilleurs participants de cette session" : "The top 10 players of this session"}
              </p>
            </div>

            <button
              onClick={() => { sound.playClick(); setViewMode('podium'); }}
              className="btn-accent"
              style={{ padding: '10px 18px', fontSize: '0.9rem' }}
            >
              <Trophy size={16} /> {t.revealPodiumBtn}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {top10List.map((item, index) => {
              const isMe = item.id === user.id;
              const isTop1 = item.rank === 1;
              const isTop2 = item.rank === 2;
              const isTop3 = item.rank === 3;
              const av = AVATAR_LIST.find(a => a.id === item.avatar) || AVATAR_LIST[0];
              const avName = lang === 'fr' ? av.nameFr : av.name;

              return (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: isMe ? '2px solid #818cf8' : '1px solid rgba(255,255,255,0.08)',
                    background: isMe ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '32px',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: isTop1 ? '#f59e0b' : isTop2 ? '#94a3b8' : isTop3 ? '#d97706' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : `#${item.rank}`}
                    </div>

                    <CartoonAvatar id={item.avatar} size={44} />

                    <div>
                      <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>
                        {item.name} {isMe && <span style={{ color: '#818cf8', fontSize: '0.8rem' }}>{t.youBadge}</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {av.emoji} {avName} • {item.correctCount || 0}/20 corrects
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fbbf24' }}>
                      {item.score} <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: FULL 20 SENTENCES DETAILED REVIEW */}
      {viewMode === 'review' && (
        <div className="glass-panel" style={{ padding: '32px 24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            {t.reviewTitle} ({correctCount}/{totalQuestions})
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            {t.resultsSubtitle}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {detailedResults.map((item, idx) => {
              const isCorrect = item.isCorrect;
              return (
                <div
                  key={item.questionId || idx}
                  className="glass-card"
                  style={{
                    padding: '16px 20px',
                    borderLeft: isCorrect ? '4px solid #10b981' : '4px solid #ef4444',
                    background: isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
                      #{idx + 1} {item.fullPrompt}
                    </div>
                    {isCorrect ? (
                      <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                        <CheckCircle2 size={16} /> {t.correctBadge}
                      </span>
                    ) : (
                      <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                        <XCircle size={16} /> {t.incorrectBadge}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>
                    ➡️ {item.completedSentence} ✅
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>{t.yourAnswer} </span>
                      <strong style={{ color: isCorrect ? '#34d399' : '#f87171' }}>
                        {item.userAnswer || t.emptyAnswer}
                      </strong>
                    </div>
                    {!isCorrect && (
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>{t.expectedAnswer} </span>
                        <strong style={{ color: '#34d399' }}>{item.correctAnswer}</strong>
                      </div>
                    )}
                    {item.translation && (
                      <div style={{ color: '#cbd5e1', fontStyle: 'italic' }}>
                        🇬🇧 "{item.translation}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
