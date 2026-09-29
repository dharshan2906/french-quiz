import React from 'react';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { LanguageSelector } from './LanguageSelector';
import { sound } from '../sounds';
import { Users, Clock, AlertCircle, Trophy, BookOpen, Volume2, VolumeX, LogOut } from 'lucide-react';

export const ParticipantLobby = ({
  user,
  participants = [],
  onViewLeaderboard,
  onOpenRules,
  onLeave,
  isMuted,
  onToggleMute,
  lang,
  onSelectLang,
  t
}) => {
  const avatarObj = AVATAR_LIST.find(a => a.id === user.avatar) || AVATAR_LIST[0];
  const participantList = participants.filter(p => p.role === 'participant');

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CartoonAvatar id={user.avatar} size={48} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{user.name}</div>
            <span style={{ fontSize: '0.8rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} /> {t.readyOnline}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LanguageSelector currentLang={lang} onSelectLang={onSelectLang} />
          <button onClick={() => { sound.playClick(); onOpenRules(); }} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
            <BookOpen size={16} /> <span>{t.grammarGuide}</span>
          </button>
          <button onClick={() => { sound.playClick(); onViewLeaderboard(); }} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem' }}>
            <Trophy size={16} color="#f59e0b" /> <span>{t.leaderboard}</span>
          </button>
          <button onClick={onToggleMute} className="btn-secondary" style={{ padding: '8px 10px' }}>
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button onClick={() => { sound.playClick(); onLeave(); }} className="btn-secondary" style={{ padding: '8px 10px', color: '#f87171' }} title={t.leave}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Hero Waiting Box */}
      <div className="glass-panel" style={{ padding: '38px', textAlign: 'center', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${avatarObj.color}25 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '18px' }}>
            <CartoonAvatar id={user.avatar} size={118} animate={true} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 22px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '999px',
            color: '#fbbf24',
            fontWeight: 800,
            fontSize: '0.95rem',
            marginBottom: '16px'
          }}>
            <span style={{ animation: 'timerUrgent 1.5s infinite', display: 'inline-block' }}>⏳</span>
            {t.waitingAdminTitle}
          </div>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
            {t.getReady} {user.name} !
          </h2>

          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 24px', fontSize: '1.05rem', lineHeight: '1.5' }}>
            {t.waitingAdminSubtitle}
          </p>

          {/* Quick Rules Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#38bdf8" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.rule5Min}</span>
            </div>
            <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="#ec4899" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.rule1Attempt}</span>
            </div>
            <div className="glass-card" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} color="#f59e0b" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.rule20Q}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Participants Roster */}
      <div className="glass-panel" style={{ padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#818cf8" />
            <h3 style={{ fontSize: '1.25rem' }}>{t.lobbyRosterTitle} ({participantList.length})</h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Live Mascots</span>
        </div>

        {participantList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
            {t.firstPlayer}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            {participantList.map((p) => {
              const isMe = p.id === user.id;
              const av = AVATAR_LIST.find(a => a.id === p.avatar) || AVATAR_LIST[0];
              const avDisplayName = lang === 'fr' ? av.nameFr : av.name;
              return (
                <div
                  key={p.id}
                  className="glass-card"
                  style={{
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: isMe ? '1.5px solid #818cf8' : '1px solid rgba(255,255,255,0.08)',
                    background: isMe ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)'
                  }}
                >
                  <CartoonAvatar id={p.avatar} size={42} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {p.name} {isMe && <span style={{ color: '#818cf8', fontSize: '0.75rem' }}>{t.youBadge}</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{av.emoji} {avDisplayName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
