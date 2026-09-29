import React from 'react';

export const AVATAR_LIST = [
  { id: 'pengiun', name: 'Penguin', nameFr: 'Manchot', emoji: '🐧', color: '#0ea5e9', bg: 'linear-gradient(135deg, #0284c7, #38bdf8)' },
  { id: 'deer', name: 'Deer', nameFr: 'Cerf', emoji: '🦌', color: '#d97706', bg: 'linear-gradient(135deg, #b45309, #fbbf24)' },
  { id: 'tiger', name: 'Tiger', nameFr: 'Tigre', emoji: '🐯', color: '#ea580c', bg: 'linear-gradient(135deg, #c2410c, #f97316)' },
  { id: 'dog', name: 'Dog', nameFr: 'Chien', emoji: '🐶', color: '#ca8a04', bg: 'linear-gradient(135deg, #854d0e, #eab308)' },
  { id: 'cat', name: 'Cat', nameFr: 'Chat', emoji: '🐱', color: '#db2777', bg: 'linear-gradient(135deg, #9d174d, #f472b6)' },
  { id: 'snake', name: 'Snake', nameFr: 'Serpent', emoji: '🐍', color: '#059669', bg: 'linear-gradient(135deg, #047857, #34d399)' },
  { id: 'rabbit', name: 'Rabbit', nameFr: 'Lapin', emoji: '🐰', color: '#8b5cf6', bg: 'linear-gradient(135deg, #6d28d9, #c084fc)' },
  { id: 'turtle', name: 'Turtle', nameFr: 'Tortue', emoji: '🐢', color: '#16a34a', bg: 'linear-gradient(135deg, #15803d, #4ade80)' },
  { id: 'chick', name: 'Chick', nameFr: 'Poussin', emoji: '🐥', color: '#eab308', bg: 'linear-gradient(135deg, #ca8a04, #fde047)' },
  { id: 'hamaster', name: 'Hamster', nameFr: 'Hamster', emoji: '🐹', color: '#f97316', bg: 'linear-gradient(135deg, #ea580c, #fed7aa)' }
];

export const CartoonAvatar = ({ id, size = 64, className = '', animate = false, showBackground = true }) => {
  const avatar = AVATAR_LIST.find(a => a.id === id) || AVATAR_LIST[0];

  const renderSvg = () => {
    switch (id) {
      case 'pengiun':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            {/* Background Aura */}
            <circle cx="60" cy="60" r="54" fill="#0284c7" opacity="0.25" />
            
            {/* Body / Shoulders */}
            <path d="M26,115 C26,82 36,68 60,68 C84,68 94,82 94,115 Z" fill="#0f172a" />
            <path d="M40,115 C40,82 48,74 60,74 C72,74 80,82 80,115 Z" fill="#ffffff" />
            
            {/* Striped Sailor Scarf (French Marinière) */}
            <path d="M38,76 C46,84 74,84 82,76 L85,86 C74,94 46,94 35,86 Z" fill="#ef4444" />
            <line x1="45" y1="78" x2="45" y2="88" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="55" y1="80" x2="55" y2="90" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="65" y1="80" x2="65" y2="90" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="75" y1="78" x2="75" y2="88" stroke="#ffffff" strokeWidth="2.5" />
            
            {/* Head */}
            <ellipse cx="60" cy="46" rx="30" ry="28" fill="#1e293b" />
            {/* White face heart mask */}
            <ellipse cx="49" cy="48" rx="13" ry="17" fill="#ffffff" />
            <ellipse cx="71" cy="48" rx="13" ry="17" fill="#ffffff" />
            
            {/* Big Sparkly Eyes */}
            <ellipse cx="48" cy="44" rx="6.5" ry="8" fill="#0f172a" />
            <ellipse cx="72" cy="44" rx="6.5" ry="8" fill="#0f172a" />
            <circle cx="50" cy="41" r="2.8" fill="#ffffff" />
            <circle cx="74" cy="41" r="2.8" fill="#ffffff" />
            <circle cx="46" cy="47" r="1.2" fill="#ffffff" />
            <circle cx="70" cy="47" r="1.2" fill="#ffffff" />
            
            {/* Cute Rosy Cheeks */}
            <ellipse cx="36" cy="53" rx="5" ry="3.5" fill="#f43f5e" opacity="0.6" />
            <ellipse cx="84" cy="53" rx="5" ry="3.5" fill="#f43f5e" opacity="0.6" />
            
            {/* Cute Beak */}
            <polygon points="52,49 68,49 60,63" fill="#f97316" />
            <polygon points="54,50 66,50 60,54" fill="#fb923c" />

            {/* Parisian French Red Beret */}
            <ellipse cx="60" cy="22" rx="28" ry="11" fill="#dc2626" transform="rotate(-8 60 22)" />
            <circle cx="60" cy="20" r="18" fill="#ef4444" transform="rotate(-8 60 20)" />
            <line x1="60" y1="12" x2="60" y2="7" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'deer':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            {/* Background Aura */}
            <circle cx="60" cy="60" r="54" fill="#d97706" opacity="0.25" />
            
            {/* Antlers with little floral leaves */}
            <path d="M36,28 Q30,12 20,16 M28,20 Q18,20 16,30 M84,28 Q90,12 100,16 M92,20 Q102,20 104,30" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <circle cx="18" cy="15" r="3.5" fill="#22c55e" />
            <circle cx="102" cy="15" r="3.5" fill="#22c55e" />
            <circle cx="28" cy="19" r="2.5" fill="#f43f5e" />
            <circle cx="92" cy="19" r="2.5" fill="#f43f5e" />
            
            {/* Ears */}
            <ellipse cx="30" cy="44" rx="14" ry="8" transform="rotate(-30 30 44)" fill="#b45309" />
            <ellipse cx="30" cy="44" rx="9" ry="5" transform="rotate(-30 30 44)" fill="#fef3c7" />
            <ellipse cx="90" cy="44" rx="14" ry="8" transform="rotate(30 90 44)" fill="#b45309" />
            <ellipse cx="90" cy="44" rx="9" ry="5" transform="rotate(30 90 44)" fill="#fef3c7" />
            
            {/* Body / Knit Collar */}
            <path d="M30,115 C30,84 40,74 60,74 C80,74 90,84 90,115 Z" fill="#b45309" />
            <rect x="42" y="78" width="36" height="12" rx="6" fill="#059669" />
            <line x1="48" y1="78" x2="48" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="54" y1="78" x2="54" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="60" y1="78" x2="60" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="66" y1="78" x2="66" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="72" y1="78" x2="72" y2="90" stroke="#10b981" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="60" cy="56" rx="30" ry="26" fill="#d97706" />
            <ellipse cx="60" cy="64" rx="20" ry="16" fill="#fef3c7" />
            
            {/* Spots */}
            <circle cx="48" cy="38" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="72" cy="38" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="60" cy="34" r="2.5" fill="#ffffff" opacity="0.9" />

            {/* Big Shiny Eyes */}
            <ellipse cx="46" cy="52" rx="6.5" ry="7.5" fill="#291404" />
            <ellipse cx="74" cy="52" rx="6.5" ry="7.5" fill="#291404" />
            <circle cx="48" cy="49" r="2.8" fill="#ffffff" />
            <circle cx="76" cy="49" r="2.8" fill="#ffffff" />
            <circle cx="44" cy="54" r="1.2" fill="#ffffff" />
            <circle cx="72" cy="54" r="1.2" fill="#ffffff" />

            {/* Nose & Smile */}
            <ellipse cx="60" cy="62" rx="5.5" ry="4" fill="#291404" />
            <path d="M57,67 Q60,71 63,67" stroke="#291404" strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="37" cy="58" rx="4.5" ry="3" fill="#f87171" opacity="0.5" />
            <ellipse cx="83" cy="58" rx="4.5" ry="3" fill="#f87171" opacity="0.5" />
          </svg>
        );

      case 'tiger':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            {/* Background Aura */}
            <circle cx="60" cy="60" r="54" fill="#ea580c" opacity="0.25" />

            {/* Ears */}
            <circle cx="30" cy="32" r="14" fill="#ea580c" />
            <circle cx="30" cy="32" r="8" fill="#fed7aa" />
            <circle cx="90" cy="32" r="14" fill="#ea580c" />
            <circle cx="90" cy="32" r="8" fill="#fed7aa" />

            {/* Body */}
            <path d="M28,115 C28,84 38,72 60,72 C82,72 92,84 92,115 Z" fill="#ea580c" />
            <path d="M44,115 C44,88 50,82 60,82 C70,82 76,88 76,115 Z" fill="#ffffff" />

            {/* Champion Gold Medal */}
            <polygon points="53,82 67,82 60,94" fill="#3b82f6" />
            <circle cx="60" cy="94" r="7" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5" />
            <polygon points="60,89 62,93 66,93 63,95 64,99 60,96 56,99 57,95 54,93 58,93" fill="#ffffff" />

            {/* Head */}
            <circle cx="60" cy="54" r="32" fill="#f97316" />

            {/* Tiger Stripes */}
            <polygon points="60,24 56,34 64,34" fill="#1c1917" />
            <polygon points="28,52 40,49 40,55" fill="#1c1917" />
            <polygon points="92,52 80,49 80,55" fill="#1c1917" />
            <polygon points="30,62 42,60 42,65" fill="#1c1917" />
            <polygon points="90,62 78,60 78,65" fill="#1c1917" />

            {/* Chubby Muzzle */}
            <ellipse cx="51" cy="65" rx="11" ry="9" fill="#ffffff" />
            <ellipse cx="69" cy="65" rx="11" ry="9" fill="#ffffff" />
            <polygon points="55,58 65,58 60,65" fill="#ea580c" />

            {/* Eyes */}
            <ellipse cx="46" cy="46" rx="6.5" ry="7.5" fill="#18181b" />
            <ellipse cx="74" cy="46" rx="6.5" ry="7.5" fill="#18181b" />
            <circle cx="48" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="76" cy="43" r="2.8" fill="#ffffff" />
            <circle cx="44" cy="48" r="1.2" fill="#ffffff" />
            <circle cx="72" cy="48" r="1.2" fill="#ffffff" />

            {/* Whiskers & Smile */}
            <line x1="28" y1="65" x2="42" y2="65" stroke="#1c1917" strokeWidth="1.8" />
            <line x1="28" y1="70" x2="42" y2="68" stroke="#1c1917" strokeWidth="1.8" />
            <line x1="92" y1="65" x2="78" y2="65" stroke="#1c1917" strokeWidth="1.8" />
            <line x1="92" y1="70" x2="78" y2="68" stroke="#1c1917" strokeWidth="1.8" />
            <path d="M56,68 Q60,73 64,68" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'dog':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#ca8a04" opacity="0.25" />

            {/* Floppy Ears */}
            <ellipse cx="22" cy="48" rx="13" ry="24" fill="#854d0e" transform="rotate(18 22 48)" />
            <ellipse cx="98" cy="48" rx="13" ry="24" fill="#854d0e" transform="rotate(-18 98 48)" />

            {/* Body */}
            <path d="M28,115 C28,84 38,72 60,72 C82,72 92,84 92,115 Z" fill="#ca8a04" />
            {/* Red Bandana Scarf */}
            <path d="M38,76 L82,76 L60,98 Z" fill="#ef4444" />
            <circle cx="54" cy="82" r="2" fill="#ffffff" />
            <circle cx="66" cy="82" r="2" fill="#ffffff" />
            <circle cx="60" cy="89" r="2" fill="#ffffff" />

            {/* Head */}
            <ellipse cx="60" cy="52" rx="32" ry="28" fill="#eab308" />
            <ellipse cx="60" cy="63" rx="22" ry="17" fill="#fef08a" />

            {/* Big Puppy Eyes */}
            <circle cx="45" cy="46" r="7" fill="#18181b" />
            <circle cx="75" cy="46" r="7" fill="#18181b" />
            <circle cx="48" cy="43" r="3" fill="#ffffff" />
            <circle cx="78" cy="43" r="3" fill="#ffffff" />
            <circle cx="43" cy="49" r="1.3" fill="#ffffff" />
            <circle cx="73" cy="49" r="1.3" fill="#ffffff" />

            {/* Nose & Happy Tongue */}
            <ellipse cx="60" cy="58" rx="7" ry="5" fill="#18181b" />
            <path d="M57,63 Q60,67 63,63" stroke="#18181b" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M57,64 Q60,76 65,74 Q68,64 63,64" fill="#f43f5e" />
            <line x1="61" y1="65" x2="61" y2="72" stroke="#be123c" strokeWidth="1.2" />

            {/* Cheeks */}
            <ellipse cx="36" cy="57" rx="5" ry="3.5" fill="#f87171" opacity="0.6" />
            <ellipse cx="84" cy="57" rx="5" ry="3.5" fill="#f87171" opacity="0.6" />
          </svg>
        );

      case 'cat':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#db2777" opacity="0.25" />

            {/* Pointy Ears */}
            <polygon points="24,20 48,44 20,54" fill="#be185d" />
            <polygon points="28,26 44,44 24,50" fill="#fbcfe8" />
            <polygon points="96,20 72,44 100,54" fill="#be185d" />
            <polygon points="92,26 76,44 96,50" fill="#fbcfe8" />

            {/* French Lavender Beret */}
            <ellipse cx="60" cy="24" rx="26" ry="10" fill="#8b5cf6" transform="rotate(10 60 24)" />
            <circle cx="60" cy="22" r="16" fill="#a78bfa" transform="rotate(10 60 22)" />
            <line x1="60" y1="12" x2="60" y2="6" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />

            {/* Body */}
            <path d="M28,115 C28,84 38,72 60,72 C82,72 92,84 92,115 Z" fill="#db2777" />
            {/* Cute Bow-tie */}
            <polygon points="50,78 60,83 50,88" fill="#f43f5e" />
            <polygon points="70,78 60,83 70,88" fill="#f43f5e" />
            <circle cx="60" cy="83" r="3.5" fill="#fbbf24" />

            {/* Face */}
            <circle cx="60" cy="55" r="32" fill="#f472b6" />

            {/* Whiskers */}
            <line x1="18" y1="57" x2="38" y2="59" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="16" y1="65" x2="38" y2="64" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="102" y1="57" x2="82" y2="59" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="104" y1="65" x2="82" y2="64" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />

            {/* Large Anime Eyes */}
            <ellipse cx="44" cy="49" rx="7" ry="8.5" fill="#0f172a" />
            <ellipse cx="76" cy="49" rx="7" ry="8.5" fill="#0f172a" />
            <circle cx="46" cy="46" r="3.2" fill="#ffffff" />
            <circle cx="78" cy="46" r="3.2" fill="#ffffff" />
            <circle cx="42" cy="52" r="1.5" fill="#ffffff" />
            <circle cx="74" cy="52" r="1.5" fill="#ffffff" />

            {/* Heart Nose & Mouth */}
            <polygon points="56,60 64,60 60,65" fill="#881337" />
            <path d="M55,66 Q60,70 65,66" stroke="#881337" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'snake':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#059669" opacity="0.25" />

            {/* Coiled Body */}
            <path d="M26,88 C28,110 92,110 94,88 C96,68 76,60 60,60 C44,60 26,50 32,36 C38,20 82,20 88,34" fill="none" stroke="#10b981" strokeWidth="18" strokeLinecap="round" />
            <path d="M26,88 C28,110 92,110 94,88 C96,68 76,60 60,60" fill="none" stroke="#34d399" strokeWidth="8" strokeLinecap="round" />

            {/* Pattern Dots */}
            <circle cx="42" cy="98" r="3.5" fill="#047857" />
            <circle cx="60" cy="100" r="3.5" fill="#047857" />
            <circle cx="78" cy="98" r="3.5" fill="#047857" />

            {/* Head */}
            <ellipse cx="88" cy="36" rx="16" ry="14" fill="#34d399" />

            {/* Tiny Party Hat */}
            <polygon points="82,24 94,24 88,10" fill="#f59e0b" />
            <circle cx="88" cy="10" r="2.5" fill="#ef4444" />

            {/* Big Friendly Eyes */}
            <circle cx="90" cy="32" r="5.5" fill="#ffffff" />
            <circle cx="91" cy="32" r="3.5" fill="#0f172a" />
            <circle cx="92" cy="30" r="1.5" fill="#ffffff" />

            {/* Forked Red Tongue */}
            <path d="M104,38 L114,38 M114,38 L118,34 M114,38 L118,42" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <ellipse cx="80" cy="40" rx="3.5" ry="2.5" fill="#f43f5e" opacity="0.6" />
          </svg>
        );

      case 'rabbit':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#8b5cf6" opacity="0.25" />

            {/* Long Floppy Ears */}
            <ellipse cx="42" cy="26" rx="10" ry="24" fill="#f3e8ff" transform="rotate(-12 42 26)" />
            <ellipse cx="42" cy="26" rx="5" ry="16" fill="#f472b6" transform="rotate(-12 42 26)" />
            
            {/* Folded Right Ear (Cute!) */}
            <ellipse cx="78" cy="28" rx="10" ry="24" fill="#f3e8ff" transform="rotate(15 78 28)" />
            <ellipse cx="78" cy="28" rx="5" ry="16" fill="#f472b6" transform="rotate(15 78 28)" />

            {/* Body */}
            <path d="M30,115 C30,84 40,74 60,74 C80,74 90,84 90,115 Z" fill="#8b5cf6" />
            {/* Pink Bow */}
            <polygon points="50,78 60,83 50,88" fill="#ec4899" />
            <polygon points="70,78 60,83 70,88" fill="#ec4899" />
            <circle cx="60" cy="83" r="3.5" fill="#ffffff" />

            {/* Face */}
            <circle cx="60" cy="58" r="32" fill="#f3e8ff" />

            {/* Eyes */}
            <circle cx="45" cy="52" r="6.5" fill="#4c1d95" />
            <circle cx="75" cy="52" r="6.5" fill="#4c1d95" />
            <circle cx="47" cy="49" r="2.8" fill="#ffffff" />
            <circle cx="77" cy="49" r="2.8" fill="#ffffff" />
            <circle cx="43" cy="54" r="1.2" fill="#ffffff" />
            <circle cx="73" cy="54" r="1.2" fill="#ffffff" />

            {/* Nose & Buck Teeth */}
            <polygon points="56,60 64,60 60,65" fill="#f43f5e" />
            <path d="M55,67 Q60,71 65,67" stroke="#4c1d95" strokeWidth="1.5" fill="none" />
            <rect x="56" y="69" width="8" height="6" rx="1" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
            <line x1="60" y1="69" x2="60" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />

            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="60" rx="6" ry="4" fill="#fbcfe8" />
            <ellipse cx="86" cy="60" rx="6" ry="4" fill="#fbcfe8" />
          </svg>
        );

      case 'turtle':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#16a34a" opacity="0.25" />

            {/* Flippers */}
            <ellipse cx="26" cy="42" rx="11" ry="8" fill="#4ade80" transform="rotate(-30 26 42)" />
            <ellipse cx="94" cy="42" rx="11" ry="8" fill="#4ade80" transform="rotate(30 94 42)" />
            <ellipse cx="30" cy="85" rx="10" ry="7" fill="#4ade80" transform="rotate(30 30 85)" />
            <ellipse cx="90" cy="85" rx="10" ry="7" fill="#4ade80" transform="rotate(-30 90 85)" />

            {/* Body / Shell */}
            <ellipse cx="60" cy="68" rx="36" ry="32" fill="#15803d" />
            <ellipse cx="60" cy="68" rx="30" ry="26" fill="#22c55e" />

            {/* Shell Hexagon Pattern */}
            <polygon points="60,50 72,58 72,72 60,80 48,72 48,58" fill="#166534" stroke="#15803d" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="60" cy="30" rx="18" ry="15" fill="#4ade80" />

            {/* Professor Glasses (Super Cute) */}
            <circle cx="53" cy="28" r="6.5" fill="none" stroke="#1e293b" strokeWidth="2" />
            <circle cx="67" cy="28" r="6.5" fill="none" stroke="#1e293b" strokeWidth="2" />
            <line x1="59.5" y1="28" x2="60.5" y2="28" stroke="#1e293b" strokeWidth="2" />

            {/* Eyes */}
            <circle cx="53" cy="28" r="3" fill="#0f172a" />
            <circle cx="67" cy="28" r="3" fill="#0f172a" />
            <circle cx="54" cy="27" r="1" fill="#ffffff" />
            <circle cx="68" cy="27" r="1" fill="#ffffff" />

            {/* Smile */}
            <path d="M56,36 Q60,40 64,36" stroke="#15803d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'chick':
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#eab308" opacity="0.25" />

            {/* Eggshell Hat on Top */}
            <path d="M38,30 Q60,10 82,30 L76,38 L68,32 L60,38 L52,32 L44,38 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Body */}
            <circle cx="60" cy="64" r="36" fill="#facc15" />

            {/* Flapping Wings */}
            <ellipse cx="24" cy="68" rx="10" ry="14" fill="#eab308" transform="rotate(25 24 68)" />
            <ellipse cx="96" cy="68" rx="10" ry="14" fill="#eab308" transform="rotate(-25 96 68)" />

            {/* Giant Sparkle Eyes */}
            <circle cx="45" cy="56" r="7.5" fill="#1e293b" />
            <circle cx="75" cy="56" r="7.5" fill="#1e293b" />
            <circle cx="48" cy="53" r="3.2" fill="#ffffff" />
            <circle cx="78" cy="53" r="3.2" fill="#ffffff" />
            <circle cx="43" cy="59" r="1.4" fill="#ffffff" />
            <circle cx="73" cy="59" r="1.4" fill="#ffffff" />

            {/* Cute Orange Beak */}
            <polygon points="52,64 68,64 60,76" fill="#ea580c" />
            <polygon points="54,65 66,65 60,69" fill="#f97316" />

            {/* Rosy Cheeks */}
            <ellipse cx="34" cy="67" rx="6" ry="4" fill="#f87171" opacity="0.7" />
            <ellipse cx="86" cy="67" rx="6" ry="4" fill="#f87171" opacity="0.7" />
          </svg>
        );

      case 'hamaster':
      default:
        return (
          <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
            <circle cx="60" cy="60" r="54" fill="#f97316" opacity="0.25" />

            {/* Chubby Ears */}
            <circle cx="28" cy="34" r="12" fill="#fb923c" />
            <circle cx="28" cy="34" r="7" fill="#fed7aa" />
            <circle cx="92" cy="34" r="12" fill="#fb923c" />
            <circle cx="92" cy="34" r="7" fill="#fed7aa" />

            {/* French Chef Toque / Mini Beret */}
            <ellipse cx="60" cy="24" rx="18" ry="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="54" cy="18" r="9" fill="#ffffff" />
            <circle cx="66" cy="18" r="9" fill="#ffffff" />
            <circle cx="60" cy="14" r="9" fill="#ffffff" />

            {/* Chubby Face & Body */}
            <ellipse cx="60" cy="64" rx="38" ry="34" fill="#fb923c" />
            <ellipse cx="60" cy="72" rx="26" ry="24" fill="#fff7ed" />

            {/* Big Shiny Eyes */}
            <circle cx="44" cy="54" r="6.5" fill="#1c1917" />
            <circle cx="76" cy="54" r="6.5" fill="#1c1917" />
            <circle cx="46" cy="51" r="2.8" fill="#ffffff" />
            <circle cx="78" cy="51" r="2.8" fill="#ffffff" />
            <circle cx="42" cy="56" r="1.2" fill="#ffffff" />
            <circle cx="74" cy="56" r="1.2" fill="#ffffff" />

            {/* Nose & Mouth */}
            <polygon points="56,62 64,62 60,67" fill="#f43f5e" />
            <path d="M55,68 Q60,72 65,68" stroke="#7c2d12" strokeWidth="1.5" fill="none" />

            {/* Giant Chubby Rosy Cheeks */}
            <ellipse cx="32" cy="66" rx="8" ry="6" fill="#fb7185" opacity="0.65" />
            <ellipse cx="88" cy="66" rx="8" ry="6" fill="#fb7185" opacity="0.65" />

            {/* Little Paws Holding a French Croissant */}
            <path d="M46,88 Q60,78 74,88 Q60,84 46,88 Z" fill="#d97706" />
            <ellipse cx="44" cy="85" rx="5" ry="6" fill="#fed7aa" />
            <ellipse cx="76" cy="85" rx="5" ry="6" fill="#fed7aa" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`cartoon-avatar-wrapper ${animate ? 'animate-bounce-slight' : ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: showBackground ? avatar.bg : 'transparent',
        boxShadow: showBackground ? `0 8px 24px rgba(0,0,0,0.35), 0 0 15px ${avatar.color}40` : 'none',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        padding: '2px',
        flexShrink: 0
      }}
    >
      {renderSvg()}
    </div>
  );
};
