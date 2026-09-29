import React from 'react';
import { sound } from '../sounds';

export const LanguageSelector = ({ currentLang = 'fr', onSelectLang }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.06)',
      padding: '4px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.12)'
    }}>
      <button
        type="button"
        onClick={() => { sound.playClick(); onSelectLang('fr'); }}
        style={{
          background: currentLang === 'fr' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'transparent',
          color: currentLang === 'fr' ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          borderRadius: '8px',
          padding: '6px 12px',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: currentLang === 'fr' ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none'
        }}
      >
        <span>🇫🇷</span> FR
      </button>

      <button
        type="button"
        onClick={() => { sound.playClick(); onSelectLang('en'); }}
        style={{
          background: currentLang === 'en' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
          color: currentLang === 'en' ? '#ffffff' : 'var(--text-muted)',
          border: 'none',
          borderRadius: '8px',
          padding: '6px 12px',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          boxShadow: currentLang === 'en' ? '0 2px 8px rgba(99, 102, 241, 0.4)' : 'none'
        }}
      >
        <span>🇬🇧</span> EN
      </button>
    </div>
  );
};
