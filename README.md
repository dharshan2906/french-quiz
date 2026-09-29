# 🇫🇷 French Quiz Platform - Passé Composé Master

A vibrant, real-time multiplayer French grammar quiz application built with **React**, **Vite**, **Express**, and **Socket.IO**.

---

## ✨ Features

### 🎭 10 Cartoon Avatars (Mascots)
Players select their favorite cartoon mascot upon logging in:
1. 🐧 **Penguin**
2. 🦌 **Deer**
3. 🐯 **Tiger**
4. 🐶 **Dog**
5. 🐱 **Cat**
6. 🐍 **Snake**
7. 🐰 **Rabbit**
8. 🐢 **Turtle**
9. 🐥 **Chick**
10. 🐹 **Hamster**

---

### 👥 2 Distinct Roles

1. **Participant / Joueur**:
   - Enters custom name and chooses cartoon avatar.
   - Waits in the live **Lobby** with synchronized participant rosters until the Admin starts the game.
   - Can view the **French Grammar Cheat Sheet** and **Live Leaderboard** while waiting.
   - Once Admin starts, enters the **5-Minute Quiz** with active timer countdown, progress bar, 20 questions, choice of interactive options or virtual French accent keyboard (`é`, `è`, `ê`, `à`, `ç`, `(e)s`).
   - Enforces **1 Single Attempt**.
   - Submits automatically when timer expires or manually with validation modal.
   - Celebrates with **Confetti**, score breakdown (+ speed bonus), rank badge, and full review of all 20 questions with grammar explanations.

2. **Admin / Enseignant**:
   - Live control room with real-time roster of connected participants.
   - 🚀 **"START GAME FOR EVERYONE"** button (synchronously launches the quiz for all players).
   - 🔄 **"RESET GAME"** button (resets round and brings all players back to lobby).
   - 🏆 **"VIEW LEADERBOARD"** button (opens live podium and full ranking).
   - 🤖 **"+ Add Demo Bot"** feature for easy one-click testing of multiplayer dynamics.

---

### 🏆 Real-Time Leaderboard & Podium
- **Top 3 Animated Podium** (🥇 Gold Champion with 👑 Crown, 🥈 Silver, 🥉 Bronze).
- Full table with rank, avatar, player name, accuracy (%), score (pts), and time taken (MM:SS).
- Search and filter by player name.

---

### 📝 20 Passé Composé Questions Included
1. `Tu (manger) ______ une pomme.` ➔ **Tu as mangé une pomme.** ✅
2. `Elle (finir) ______ son travail.` ➔ **Elle a fini son travail.** ✅
3. `Nous (faire) ______ nos devoirs.` ➔ **Nous avons fait nos devoirs.** ✅
4. `Ils (prendre) ______ le train.` ➔ **Ils ont pris le train.** ✅
5. `Vous (lire) ______ le livre.` ➔ **Vous avez lu le livre.** ✅
6. `Il (écrire) ______ une lettre.` ➔ **Il a écrit une lettre.** ✅
7. `J’(acheter) ______ un nouveau sac.` ➔ **J’ai acheté un nouveau sac.** ✅
8. `Tu (boire) ______ du lait.` ➔ **Tu as bu du lait.** ✅
9. `Elle (voir) ______ un film.` ➔ **Elle a vu un film.** ✅
10. `Nous (jouer) ______ au football.` ➔ **Nous avons joué au football.** ✅
11. `Vous (avoir) ______ un examen.` ➔ **Vous avez eu un examen.** ✅
12. `Ils (être) ______ très heureux.` ➔ **Ils ont été très heureux.** ✅
13. `Je (aller) ______ au cinéma.` ➔ **Je suis allé(e) au cinéma.** ✅
14. `Elle (venir) ______ chez moi.` ➔ **Elle est venue chez moi.** ✅
15. `Nous (arriver) ______ à Paris.` ➔ **Nous sommes arrivé(e)s à Paris.** ✅
16. `Il (partir) ______ à huit heures.` ➔ **Il est parti à huit heures.** ✅
17. `Tu (dormir) ______ pendant deux heures.` ➔ **Tu as dormi pendant deux heures.** ✅
18. `Ils (courir) ______ dans le parc.` ➔ **Ils ont couru dans le parc.** ✅
19. `Elle (naître) ______ en France.` ➔ **Elle est née en France.** ✅
20. `Nous (regarder) ______ la télévision.` ➔ **Nous avons regardé la télévision.** ✅

---

## 🚀 How to Run Locally

### 1. Start Backend Server
```bash
cd server
npm install
npm start
# Running on http://localhost:5000
```

### 2. Start Frontend App
```bash
cd client
npm install
npm run dev
# Running on http://localhost:5173
```

Open `http://localhost:5173` in your browser. Open multiple tabs to test Participant vs Admin live synchronization!
