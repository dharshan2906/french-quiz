import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartoonAvatar, AVATAR_LIST } from '../avatars';
import { sound } from '../sounds';
import { Trophy, Sparkles, X, ChevronRight, RotateCcw, Crown, Flame, Award } from 'lucide-react';

export const GrandCeremonyModal = ({ leaderboard = [], onClose, lang = 'fr' }) => {
  // Step 1: Top 10 to Top 4 (Zoom-in rows)
  // Step 2: Top 3 Podium (3rd and 2nd place spotlight)
  // Step 3: Top 1 Champion (Massive fireworks, crown, golden aura)
  const [stage, setStage] = useState(1);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  // 4th to 10th
  const runnersUp = leaderboard.slice(3, 10);

  useEffect(() => {
    sound.playGameStart();
  }, []);

  // Trigger continuous fireworks on Stage 3 (Champion reveal)
  useEffect(() => {
    if (stage === 3) {
      sound.playFanfare();
      const end = Date.now() + 5000;
      const colors = ['#f59e0b', '#fbbf24', '#38bdf8', '#ec4899', '#10b981', '#ffffff'];

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.7 },
          colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.7 },
          colors
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleNextStage = () => {
    sound.playClick();
    if (stage === 1) {
      setStage(2);
      sound.playCorrect();
    } else if (stage === 2) {
      setStage(3);
    }
  };

  const handleReplay = () => {
    sound.playClick();
    setStage(1);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at center, #111827 0%, #030712 100%)',
      zIndex: 3000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '20px'
    }}>
      {/* Background Animated Spotlight Beams */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '20%',
        width: '350px',
        height: '600px',
        background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.25) 0%, transparent 80%)',
        transform: 'rotate(-25deg)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '20%',
        width: '350px',
        height: '600px',
        background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.25) 0%, transparent 80%)',
        transform: 'rotate(25deg)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '8px 14px',
            borderRadius: '12px',
            color: '#111827',
            fontWeight: 900,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
          }}>
            <Trophy size={20} /> CÉRÉMONIE FINALE DES PRIX 🏆
          </div>
          <span style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
            {stage === 1 && (lang === 'fr' ? 'Étape 1 : Classement du 10ème au 4ème' : 'Step 1 : 10th to 4th Rankings')}
            {stage === 2 && (lang === 'fr' ? 'Étape 2 : Podium 3ème & 2ème Place' : 'Step 2 : 3rd & 2nd Place Spotlight')}
            {stage === 3 && (lang === 'fr' ? 'Étape 3 : LE GRAND CHAMPION N°1 🥇' : 'Step 3 : ULTIMATE CHAMPION #1 🥇')}
          </span>
        </div>

        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="btn-secondary"
          style={{ padding: '8px 12px', borderRadius: '50%' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* STAGE 1: TOP 10 TO TOP 4 ZOOM-IN ROWS */}
      {stage === 1 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '999px', border: '1px solid #818cf8', color: '#c7d2fe', fontWeight: 800, marginBottom: '10px' }}>
              <Sparkles size={16} /> {lang === 'fr' ? 'RETOUR SUR LE TOP 10' : 'TOP 10 HONORS'}
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {lang === 'fr' ? 'Du 10ème au 4ème Rang' : 'From 10th to 4th Place'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              {lang === 'fr' ? 'Bravo à nos brillants finalistes !' : 'Great job to our top finalists!'}
            </p>
          </div>

          {/* Zoom-in Grid Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            maxWidth: '900px',
            width: '100%',
            marginBottom: '32px'
          }}>
            {runnersUp.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                {lang === 'fr' ? 'Passons directement au Top 3 !' : 'Let’s move to the Top 3!'}
              </div>
            ) : (
              runnersUp.map((item, idx) => {
                const av = AVATAR_LIST.find(a => a.id === item.avatar) || AVATAR_LIST[0];
                return (
                  <div
                    key={item.id}
                    className="glass-card"
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.05)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${idx * 0.2}s`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(99, 102, 241, 0.3)',
                        color: '#c7d2fe',
                        fontWeight: 900,
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(99, 102, 241, 0.5)'
                      }}>
                        #{item.rank}
                      </div>

                      <CartoonAvatar id={item.avatar} size={46} />

                      <div>
                        <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#ffffff' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {av.emoji} {lang === 'fr' ? av.nameFr : av.name}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fbbf24' }}>
                        {item.score} <span style={{ fontSize: '0.75rem' }}>pts</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                        {item.correctCount || 0}/20
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleNextStage}
            className="btn-primary"
            style={{
              padding: '16px 36px',
              fontSize: '1.25rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#111827',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)'
            }}
          >
            Dévoiler le Top 3 (Spotlight) ➔
          </button>
        </div>
      )}

      {/* STAGE 2: TOP 3 SPOTLIGHT (3RD & 2ND PLACE) */}
      {stage === 2 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              🌟 {lang === 'fr' ? 'LE PODIUM DES CHAMPIONS' : 'THE CHAMPIONS PODIUM'} 🌟
            </h1>
            <p style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: 700 }}>
              {lang === 'fr' ? 'Sous les projecteurs : 3ème & 2ème Place !' : 'In the Spotlight: 3rd & 2nd Place!'}
            </p>
          </div>

          {/* Podium 2nd & 3rd */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '36px',
            maxWidth: '650px',
            width: '100%',
            marginBottom: '40px'
          }}>
            {/* 2nd Place Silver */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              padding: '24px',
              background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.25) 0%, rgba(148, 163, 184, 0.05) 100%)',
              border: '2px solid #94a3b8',
              borderRadius: '24px',
              boxShadow: '0 0 35px rgba(148, 163, 184, 0.4)',
              transform: 'scale(1.05)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🥈</div>
              <CartoonAvatar id={top2?.avatar || 'cat'} size={80} animate={true} />
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', marginTop: '10px' }}>
                {top2?.name || 'Joueur 2'}
              </div>
              <div style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: 900, marginTop: '4px' }}>
                {top2?.score || 0} pts
              </div>
              <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 800, marginTop: '4px' }}>
                {top2?.correctCount || 0} / 20 Corrects
              </div>
              <div style={{
                marginTop: '12px',
                padding: '4px 14px',
                background: '#94a3b8',
                color: '#0f172a',
                borderRadius: '999px',
                fontWeight: 900,
                fontSize: '0.85rem'
              }}>
                MÉDAILLE D'ARGENT 🥈
              </div>
            </div>

            {/* 3rd Place Bronze */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              padding: '20px',
              background: 'linear-gradient(180deg, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0.05) 100%)',
              border: '2px solid #d97706',
              borderRadius: '24px',
              boxShadow: '0 0 30px rgba(217, 119, 6, 0.35)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🥉</div>
              <CartoonAvatar id={top3?.avatar || 'dog'} size={70} animate={true} />
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', marginTop: '10px' }}>
                {top3?.name || 'Joueur 3'}
              </div>
              <div style={{ fontSize: '1.15rem', color: '#d97706', fontWeight: 900, marginTop: '4px' }}>
                {top3?.score || 0} pts
              </div>
              <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 800, marginTop: '4px' }}>
                {top3?.correctCount || 0} / 20 Corrects
              </div>
              <div style={{
                marginTop: '12px',
                padding: '4px 14px',
                background: '#d97706',
                color: '#ffffff',
                borderRadius: '999px',
                fontWeight: 900,
                fontSize: '0.85rem'
              }}>
                MÉDAILLE DE BRONZE 🥉
              </div>
            </div>
          </div>

          <button
            onClick={handleNextStage}
            className="btn-primary animate-pulse-glow"
            style={{
              padding: '18px 42px',
              fontSize: '1.35rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #f59e0b, #eab308)',
              color: '#111827',
              boxShadow: '0 0 45px rgba(245, 158, 11, 0.8)'
            }}
          >
            👑 DÉVOILER LE GRAND CHAMPION N°1 ➔ 🎆
          </button>
        </div>
      )}

      {/* STAGE 3: GRAND CHAMPION N°1 WITH HUGE FIREWORKS & CROWN */}
      {stage === 3 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          {/* Floating Crown */}
          <div style={{ fontSize: '4.5rem', animation: 'float 2s infinite', marginBottom: '-15px' }}>
            👑
          </div>

          {/* Champion Giant Card */}
          <div style={{
            padding: '36px 48px',
            background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.35) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '3px solid #fbbf24',
            borderRadius: '32px',
            boxShadow: '0 0 70px rgba(245, 158, 11, 0.65), 0 0 120px rgba(245, 158, 11, 0.35)',
            textAlign: 'center',
            maxWidth: '520px',
            width: '100%',
            marginBottom: '32px'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <CartoonAvatar id={top1?.avatar || 'tiger'} size={120} animate={true} />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              color: '#111827',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '1.1rem',
              marginBottom: '12px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.5)'
            }}>
              🥇 GRAND VAINQUEUR & CHAMPION 🥇
            </div>

            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {top1?.name || 'Champion'}
            </h1>

            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fbbf24', fontFamily: 'var(--font-main)', marginBottom: '8px' }}>
              {top1?.score || 0} POINTS
            </div>

            <div style={{ fontSize: '1.1rem', color: '#34d399', fontWeight: 800 }}>
              🎯 {top1?.accuracy || 100}% de Précision ({top1?.correctCount || 20}/20)
            </div>
          </div>

          {/* Ceremony Controls */}
          <div style={{ display: 'flex', gap: '14px' }}>
            <button
              onClick={handleReplay}
              className="btn-secondary"
              style={{ padding: '14px 24px', fontSize: '1rem', fontWeight: 800 }}
            >
              <RotateCcw size={18} /> {lang === 'fr' ? 'Rejouer la Cérémonie' : 'Replay Ceremony'}
            </button>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: 800 }}
            >
              {lang === 'fr' ? 'Terminer & Retour au Tableau de Bord' : 'Finish & Return to Dashboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
