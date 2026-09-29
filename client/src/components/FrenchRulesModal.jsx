import React from 'react';
import { sound } from '../sounds';
import { BookOpen, X } from 'lucide-react';

export const FrenchRulesModal = ({ onClose, lang = 'fr', t }) => {
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
      zIndex: 2100,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
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
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              padding: '8px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen size={20} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{t.grammarModalTitle} 🇫🇷</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.grammarModalSubtitle}</p>
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

        {/* Scrollable Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Formula */}
          <div className="glass-card" style={{ padding: '18px', background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <div style={{ fontSize: '0.85rem', color: '#c7d2fe', fontWeight: 700, marginBottom: '6px' }}>
              📐 {t.generalFormula}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              {t.formulaText}
            </div>
          </div>

          {/* 1. Verbs with AVOIR */}
          <div className="glass-card" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#60a5fa', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t.withAvoir}
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              • J'ai, Tu as, Il/Elle a, Nous avons, Vous avez, Ils/Elles ont.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>manger</strong> ➔ <em>Tu as mangé</em> (une pomme)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>finir</strong> ➔ <em>Elle a fini</em> (son travail)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>faire</strong> ➔ <em>Nous avons fait</em> (nos devoirs)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>prendre</strong> ➔ <em>Ils ont pris</em> (le train)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>boire</strong> ➔ <em>Tu as bu</em> (du lait)
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>écrire</strong> ➔ <em>Il a écrit</em> (une lettre)
              </div>
            </div>
          </div>

          {/* 2. Verbs with ÊTRE */}
          <div className="glass-card" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t.withEtre}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#fbbf24', marginBottom: '10px' }}>
              {t.etreWarning}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>aller</strong> ➔ <em>Je suis allé(e)</em>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>venir</strong> ➔ <em>Elle est venue</em>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>arriver</strong> ➔ <em>Nous sommes arrivé(e)s</em>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>partir</strong> ➔ <em>Il est parti</em>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                <strong>naître</strong> ➔ <em>Elle est née</em>
              </div>
            </div>
          </div>

          {/* Special Irregulars */}
          <div className="glass-card" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#f59e0b', marginBottom: '8px' }}>
              {t.specialParticiples}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <strong>Avoir :</strong> Vous <strong>avez eu</strong> un examen.
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <strong>Être :</strong> Ils <strong>ont été</strong> très heureux.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => { sound.playClick(); onClose(); }} className="btn-primary" style={{ padding: '10px 24px' }}>
            {t.gotItBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
