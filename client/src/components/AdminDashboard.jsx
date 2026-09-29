import React, { useState } from 'react';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { LanguageSelector } from './LanguageSelector';
import { sound } from '../sounds';
import { Play, RotateCcw, Trophy, Users, CheckCircle2, Clock, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';
import { translations } from '../translations';

export const AdminDashboard = ({
  user,
  gameState,
  participants = [],
  leaderboard = [],
  onStartGame,
  onResetGame,
  onLaunchCeremony,
  isMuted,
  onToggleMute,
  lang = 'fr',
  onSelectLang,
  t = translations[lang] || translations.fr
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('live_leaderboard');

  const participantList = participants.filter(p => p.role === 'participant');
  const submittedCount = participantList.filter(p => p.submitted).length;
  const inProgressCount = participantList.filter(p => !p.submitted && gameState.status === 'in_progress').length;
  const waitingCount = participantList.filter(p => !p.submitted && gameState.status === 'lobby').length;

  const top10 = leaderboard.slice(0, 10);
  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const handleStart = () => {
    sound.playGameStart();
    onStartGame();
  };

  const handleReset = () => {
    sound.playClick();
    onResetGame();
    setConfirmReset(false);
  };

  const handleLaunchCeremony = () => {
    sound.playFanfare();
    onLaunchCeremony();
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Admin Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ec4899, #be185d)',
            padding: '3px',
            borderRadius: '14px',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)'
          }}>
            <div style={{ background: '#090d16', padding: '6px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#f472b6" />
              <span style={{ fontWeight: 900, letterSpacing: '1px', fontSize: '0.95rem' }}>{t.adminPanelTitle}</span>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{user.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.adminSubtitle}</div>
          </div>
        </div>

        {/* Global Controls & Direct Reset Button */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setConfirmReset(true)}
            className="btn-secondary"
            style={{ padding: '9px 16px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)', fontWeight: 700, fontSize: '0.88rem' }}
          >
            <RotateCcw size={16} /> {lang === 'fr' ? 'Réinitialiser le Jeu' : 'Reset Game'}
          </button>

          <LanguageSelector currentLang={lang} onSelectLang={onSelectLang} />
          <button onClick={onToggleMute} className="btn-secondary" style={{ padding: '9px 12px' }}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Main Control Panel Card */}
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.sessionStatus}</span>
              {gameState.status === 'lobby' && (
                <span className="badge badge-status-waiting">{t.statusLobby}</span>
              )}
              {gameState.status === 'in_progress' && (
                <span className="badge badge-status-playing" style={{ animation: 'pulseGlow 2s infinite' }}>{t.statusInProgress}</span>
              )}
              {gameState.status === 'ended' && (
                <span className="badge badge-status-submitted">{t.statusEnded}</span>
              )}
            </div>
            <h2 style={{ fontSize: '2.1rem' }}>{t.adminCardTitle}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem' }}>
              {t.adminCardSubtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {gameState.status === 'lobby' ? (
              <button
                onClick={handleStart}
                disabled={participantList.length === 0}
                className="btn-primary btn-start-game animate-pulse-glow"
                style={{ padding: '16px 36px', fontSize: '1.25rem', fontWeight: 800 }}
              >
                <Play size={24} fill="#ffffff" /> {t.startGameBtn}
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {/* Grand Finale Ceremony Button */}
                <button
                  onClick={handleLaunchCeremony}
                  className="btn-accent animate-pulse-glow"
                  style={{ padding: '14px 24px', fontSize: '1.05rem', fontWeight: 900 }}
                >
                  <Trophy size={20} /> {lang === 'fr' ? 'LANCER LA CÉRÉMONIE FINALE 🏆' : 'LAUNCH GRAND FINALE AWARDS 🏆'}
                </button>

                <button
                  onClick={() => setConfirmReset(true)}
                  className="btn-secondary"
                  style={{ padding: '14px 20px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                >
                  <RotateCcw size={18} /> {t.resetGameBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <Users size={16} /> {t.totalPlayers}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#f8fafc', marginTop: '4px' }}>
              {participantList.length}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.85rem' }}>
              <Clock size={16} /> {t.inGameCount}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fbbf24', marginTop: '4px' }}>
              {gameState.status === 'lobby' ? waitingCount : inProgressCount}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} /> {t.submittedCount}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#34d399', marginTop: '4px' }}>
              {submittedCount} / {participantList.length}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '0.85rem' }}>
              <Trophy size={16} /> {t.topScore}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#818cf8', marginTop: '4px' }}>
              {leaderboard.length > 0 ? `${leaderboard[0].score} pts` : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveAdminTab('live_leaderboard')}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: 'none',
              background: activeAdminTab === 'live_leaderboard' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.06)',
              color: activeAdminTab === 'live_leaderboard' ? '#111827' : 'var(--text-muted)',
              fontWeight: 900,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Trophy size={18} /> {t.liveLeaderboardTitle}
          </button>

          <button
            onClick={() => setActiveAdminTab('roster')}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: 'none',
              background: activeAdminTab === 'roster' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255,255,255,0.06)',
              color: activeAdminTab === 'roster' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 900,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={18} /> {t.lobbyRosterTitle} ({participantList.length})
          </button>
        </div>

        {/* Grand Ceremony launcher button */}
        <button
          onClick={handleLaunchCeremony}
          className="btn-accent"
          style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 800 }}
        >
          <Sparkles size={16} /> {lang === 'fr' ? 'Cérémonie Top 10 & Podium' : 'Top 10 & Podium Awards'}
        </button>
      </div>

      {/* LIVE PROJECTOR LEADERBOARD (TAB 1) */}
      {activeAdminTab === 'live_leaderboard' && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          {/* Top 3 Live Podium Preview */}
          {leaderboard.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '16px',
              marginBottom: '32px',
              padding: '24px 12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              {/* 2nd Place */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '180px' }}>
                {top2 ? (
                  <>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top2.avatar} size={64} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#94a3b8', color: '#0f172a', fontWeight: 900, fontSize: '0.8rem', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        2
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', textAlign: 'center' }}>
                      {top2.name}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#94a3b8', fontWeight: 800 }}>
                      {top2.score} pts
                    </div>
                    <div style={{ width: '100%', height: '90px', background: 'linear-gradient(to top, rgba(148, 163, 184, 0.35), rgba(148, 163, 184, 0.1))', borderTop: '4px solid #94a3b8', borderRadius: '14px 14px 0 0', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 900, fontSize: '1.1rem' }}>
                      🥈 2ème
                    </div>
                  </>
                ) : (
                  <div style={{ height: '140px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
                )}
              </div>

              {/* 1st Place Champion */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1.2, maxWidth: '220px' }}>
                {top1 ? (
                  <>
                    <div style={{ fontSize: '2rem', marginBottom: '-6px', animation: 'float 2s infinite' }}>👑</div>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top1.avatar} size={84} animate={true} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#f59e0b', color: '#1c1917', fontWeight: 900, fontSize: '0.9rem', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        1
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fbbf24', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', textAlign: 'center' }}>
                      {top1.name}
                    </div>
                    <div style={{ fontSize: '1.1rem', color: '#f59e0b', fontWeight: 900 }}>
                      {top1.score} pts
                    </div>
                    <div style={{ width: '100%', height: '120px', background: 'linear-gradient(to top, rgba(245, 158, 11, 0.45), rgba(245, 158, 11, 0.15))', borderTop: '5px solid #f59e0b', borderRadius: '16px 16px 0 0', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontWeight: 900, fontSize: '1.2rem', boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)' }}>
                      🥇 1er
                      <span style={{ fontSize: '0.75rem', color: '#fef3c7' }}>{top1.correctCount || 0}/20</span>
                    </div>
                  </>
                ) : (
                  <div style={{ height: '170px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
                )}
              </div>

              {/* 3rd Place */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '180px' }}>
                {top3 ? (
                  <>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top3.avatar} size={64} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#d97706', color: '#ffffff', fontWeight: 900, fontSize: '0.8rem', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        3
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', textAlign: 'center' }}>
                      {top3.name}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#d97706', fontWeight: 800 }}>
                      {top3.score} pts
                    </div>
                    <div style={{ width: '100%', height: '70px', background: 'linear-gradient(to top, rgba(217, 119, 6, 0.35), rgba(217, 119, 6, 0.1))', borderTop: '4px solid #d97706', borderRadius: '14px 14px 0 0', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontWeight: 900, fontSize: '1.1rem' }}>
                      🥉 3ème
                    </div>
                  </>
                ) : (
                  <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)' }}>—</div>
                )}
              </div>
            </div>
          )}

          {/* Full Top 10 Live Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {top10.map((item) => {
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
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)'
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

                    <CartoonAvatar id={item.avatar} size={42} />

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {av.emoji} {avName} • {item.correctCount || 0}/20 corrects
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fbbf24' }}>
                      {item.score} <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>pts</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: item.submitted ? '#34d399' : '#60a5fa', fontWeight: 600 }}>
                      {item.submitted ? 'Terminé ✅' : `En cours (${item.progress || 0}/20)`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PARTICIPANT ROSTER (TAB 2) */}
      {activeAdminTab === 'roster' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          {participantList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
              {t.noParticipantsYet}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {participantList.map((p) => {
                const av = AVATAR_LIST.find(a => a.id === p.avatar) || AVATAR_LIST[0];
                return (
                  <div
                    key={p.id}
                    className="glass-card"
                    style={{
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <CartoonAvatar id={p.avatar} size={46} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{av.emoji} {av.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginTop: '2px' }}>
                        {p.score || 0} pts
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {confirmReset && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '440px', width: '100%', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔄</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{t.confirmResetTitle}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {t.confirmResetMsg}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => setConfirmReset(false)} className="btn-secondary" style={{ justifyContent: 'center' }}>
                {t.cancelBtn}
              </button>
              <button onClick={handleReset} className="btn-primary" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', justifyContent: 'center' }}>
                {t.confirmResetAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
