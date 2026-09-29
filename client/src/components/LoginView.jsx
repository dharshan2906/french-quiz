import React, { useState } from 'react';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { LanguageSelector } from './LanguageSelector';
import { sound } from '../sounds';
import { translations } from '../translations';
import { User, ShieldCheck, Sparkles, Volume2, VolumeX, BookOpen, Trophy } from 'lucide-react';

export const LoginView = ({
  onJoin,
  onViewLeaderboard,
  onOpenRules,
  isMuted,
  onToggleMute,
  lang = 'fr',
  onSelectLang,
  t = translations[lang] || translations.fr
}) => {
  const [role, setRole] = useState('participant');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('pengiun');
  const [adminPin, setAdminPin] = useState('');
  const [error, setError] = useState('');

  const selectedAvatarObj = AVATAR_LIST.find(a => a.id === avatar) || AVATAR_LIST[0];

  const handleAvatarSelect = (id) => {
    sound.playSelect();
    setAvatar(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();

    if (role === 'participant') {
      if (!name.trim()) {
        setError(t.nameRequired);
        return;
      }
      onJoin({
        name: name.trim(),
        avatar,
        role: 'participant'
      });
    } else {
      // Secure Admin Password check (no hints shown)
      if (adminPin !== 'kavi@08') {
        setError(t.adminPinError);
        return;
      }
      onJoin({
        name: name.trim() || 'Professeur Admin',
        avatar: avatar || 'tiger',
        role: 'admin'
      });
    }
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #ffffff 50%, #ef4444 100%)',
            padding: '3px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
          }}>
            <div style={{ background: '#090d16', padding: '6px 14px', borderRadius: '10px' }}>
              <span style={{ fontWeight: 900, letterSpacing: '1px', fontSize: '1rem' }}>{t.appTitle}</span>
            </div>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.appSubtitle}</span>
        </div>

        {/* Global Navigation Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LanguageSelector currentLang={lang} onSelectLang={onSelectLang} />
          <button
            onClick={() => { sound.playClick(); onOpenRules(); }}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            title={t.grammarGuide}
          >
            <BookOpen size={16} /> <span className="nav-text">{t.grammarGuide}</span>
          </button>
          <button
            onClick={() => { sound.playClick(); onViewLeaderboard(); }}
            className="btn-secondary"
            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            title={t.leaderboard}
          >
            <Trophy size={16} color="#f59e0b" /> <span className="nav-text">{t.leaderboard}</span>
          </button>
          <button
            onClick={onToggleMute}
            className="btn-secondary"
            style={{ padding: '8px 10px' }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="glass-panel" style={{ padding: '36px 32px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '999px', border: '1px solid rgba(99, 102, 241, 0.3)', marginBottom: '14px' }}>
            <Sparkles size={16} color="#818cf8" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe' }}>{t.bannerBadge}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', background: 'linear-gradient(to right, #ffffff, #c7d2fe, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.welcomeTitle}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto' }}>
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '16px' }}>
          <button
            type="button"
            onClick={() => { sound.playClick(); setRole('participant'); }}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: role === 'participant' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: role === 'participant' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: role === 'participant' ? '0 6px 20px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            <User size={20} /> {t.roleParticipant}
          </button>

          <button
            type="button"
            onClick={() => { sound.playClick(); setRole('admin'); }}
            style={{
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: role === 'admin' ? 'linear-gradient(135deg, #ec4899, #be185d)' : 'transparent',
              color: role === 'admin' ? '#ffffff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: role === 'admin' ? '0 6px 20px rgba(236, 72, 153, 0.4)' : 'none'
            }}
          >
            <ShieldCheck size={20} /> {t.roleAdmin}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar Character Mascot Selection Section */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              {t.pickAvatar}
            </label>

            {/* Selected Mascot Character Highlight Card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              marginBottom: '18px',
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '18px',
              border: `2px solid ${selectedAvatarObj.color}80`,
              boxShadow: `0 8px 30px ${selectedAvatarObj.color}25`
            }}>
              <CartoonAvatar id={avatar} size={74} animate={true} />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {lang === 'fr' ? selectedAvatarObj.nameFr : selectedAvatarObj.name} {selectedAvatarObj.emoji}
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    ({lang === 'fr' ? selectedAvatarObj.name : selectedAvatarObj.nameFr})
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '2px' }}>
                  {lang === 'fr' ? "Personnage avatar actif pour vos parties !" : "Active character mascot ready for battle!"}
                </div>
              </div>
            </div>

            {/* Avatar Character Cards Grid (10 mascots) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))',
              gap: '12px',
              padding: '14px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '18px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              {AVATAR_LIST.map((av) => {
                const isSelected = avatar === av.id;
                const displayName = lang === 'fr' ? av.nameFr : av.name;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => handleAvatarSelect(av.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? `2.5px solid ${av.color}` : '2px solid transparent',
                      borderRadius: '16px',
                      padding: '10px 4px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: isSelected ? `0 0 20px ${av.color}80` : 'none'
                    }}
                  >
                    <CartoonAvatar id={av.id} size={50} />
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: isSelected ? '#ffffff' : 'var(--text-subtle)',
                      textAlign: 'center'
                    }}>
                      {displayName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
              {role === 'participant' ? t.yourName : (lang === 'fr' ? "Nom de l’enseignant / Admin Name :" : "Teacher / Admin Name :")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder={role === 'participant' ? t.namePlaceholder : 'Prof. Dubois'}
              className="text-input"
              maxLength={25}
              autoFocus
            />
          </div>

          {/* Admin password input */}
          {role === 'admin' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
                {t.adminPin}
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => { setAdminPin(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="text-input"
              />
            </div>
          )}

          {error && (
            <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#fca5a5', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1.15rem' }}
          >
            {role === 'participant' ? t.enterLobbyBtn : t.enterAdminBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
