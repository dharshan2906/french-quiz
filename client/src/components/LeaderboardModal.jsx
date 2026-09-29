import React, { useState } from 'react';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { sound } from '../sounds';
import { Trophy, X, Search } from 'lucide-react';

export const LeaderboardModal = ({ leaderboard = [], onClose, currentUserId, lang = 'fr', t }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = leaderboard.filter(item =>
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const formatTime = (secs) => {
    if (!secs) return '0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(99, 102, 241, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              padding: '8px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={22} color="#111827" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{t.leaderboardTitle}</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.leaderboardSubtitle}</p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="btn-secondary"
            style={{ padding: '8px', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Top 3 Podium */}
          {leaderboard.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: '14px',
              marginBottom: '32px',
              padding: '22px 10px',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {/* 2nd Place (Left) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '160px' }}>
                {top2 ? (
                  <>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top2.avatar} size={60} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#94a3b8', color: '#0f172a', fontWeight: 900, fontSize: '0.75rem', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        2
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'center', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                      {top2.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
                      {top2.score} {t.pts}
                    </div>
                    <div style={{ width: '100%', height: '80px', background: 'linear-gradient(to top, rgba(148, 163, 184, 0.25), rgba(148, 163, 184, 0.1))', borderTop: '3px solid #94a3b8', borderRadius: '12px 12px 0 0', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 800 }}>
                      🥈 {t.secondLabel}
                    </div>
                  </>
                ) : (
                  <div style={{ height: '140px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)', fontSize: '0.8rem' }}>En attente...</div>
                )}
              </div>

              {/* 1st Place (Center - Champion) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '180px' }}>
                {top1 ? (
                  <>
                    <div style={{ fontSize: '1.6rem', marginBottom: '-6px', animation: 'float 2s ease-in-out infinite' }}>👑</div>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top1.avatar} size={76} animate={true} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#f59e0b', color: '#1c1917', fontWeight: 900, fontSize: '0.85rem', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(245, 158, 11, 0.6)' }}>
                        1
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.15rem', textAlign: 'center', color: '#fbbf24', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                      {top1.name}
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#f59e0b', fontWeight: 800 }}>
                      {top1.score} {t.pts}
                    </div>
                    <div style={{ width: '100%', height: '110px', background: 'linear-gradient(to top, rgba(245, 158, 11, 0.35), rgba(245, 158, 11, 0.15))', borderTop: '4px solid #f59e0b', borderRadius: '14px 14px 0 0', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontWeight: 900, boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)' }}>
                      🥇 {t.championLabel}
                      <span style={{ fontSize: '0.72rem', color: '#fde68a', marginTop: '2px' }}>{top1.accuracy}% {t.accuracy.toLowerCase()}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ height: '170px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>Aucun résultat</div>
                )}
              </div>

              {/* 3rd Place (Right) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '160px' }}>
                {top3 ? (
                  <>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <CartoonAvatar id={top3.avatar} size={60} />
                      <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', background: '#d97706', color: '#ffffff', fontWeight: 900, fontSize: '0.75rem', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                        3
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', textAlign: 'center', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>
                      {top3.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#d97706', fontWeight: 700 }}>
                      {top3.score} {t.pts}
                    </div>
                    <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to top, rgba(217, 119, 6, 0.25), rgba(217, 119, 6, 0.1))', borderTop: '3px solid #d97706', borderRadius: '12px 12px 0 0', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontWeight: 800 }}>
                      🥉 {t.thirdLabel}
                    </div>
                  </>
                ) : (
                  <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: 'var(--text-subtle)', fontSize: '0.8rem' }}>En attente...</div>
                )}
              </div>
            </div>
          )}

          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlayer}
              className="text-input"
              style={{ paddingLeft: '42px', fontSize: '0.95rem' }}
            />
          </div>

          {/* Full Ranked Table */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
              {t.noPlayersFound}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filtered.map((item) => {
                const isMe = item.id === currentUserId;
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
                      border: isMe ? '2px solid #818cf8' : '1px solid rgba(255,255,255,0.08)',
                      background: isMe ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255,255,255,0.03)'
                    }}
                  >
                    {/* Left: Rank & Avatar & Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '32px',
                        fontWeight: 900,
                        fontSize: '1rem',
                        color: isTop1 ? '#f59e0b' : isTop2 ? '#94a3b8' : isTop3 ? '#d97706' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : `#${item.rank}`}
                      </div>

                      <CartoonAvatar id={item.avatar} size={42} />

                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>
                          {item.name} {isMe && <span style={{ color: '#818cf8', fontSize: '0.78rem' }}>{t.youBadge}</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
                          <span>{av.emoji} {avName}</span>
                          <span>•</span>
                          <span>{t.accuracy}: <strong style={{ color: '#34d399' }}>{item.accuracy}%</strong></span>
                          <span>•</span>
                          <span>⏱️ {formatTime(item.timeSpent)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#818cf8', fontFamily: 'var(--font-main)' }}>
                        {item.score} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.pts}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: item.submitted ? '#34d399' : '#fbbf24', fontWeight: 600 }}>
                        {item.submitted ? (lang === 'fr' ? 'Terminé ✅' : 'Submitted ✅') : `${t.statusPlaying} (${item.progress || 0}/20)`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => { sound.playClick(); onClose(); }} className="btn-secondary">
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
