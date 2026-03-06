import { useState, useEffect, useRef } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400&display=swap";
document.head.appendChild(fontLink);

// ── Data ──────────────────────────────────────────────────────────────────────
const MOODS = [
  { id: "happy",      emoji: "😊", label: "Happy",        color: "#FFF3CD", accent: "#F9A825" },
  { id: "sad",        emoji: "😢", label: "Sad",           color: "#E8EAF6", accent: "#7986CB" },
  { id: "angry",      emoji: "😠", label: "Angry",         color: "#FCE4EC", accent: "#E57373" },
  { id: "tired",      emoji: "😴", label: "Tired",         color: "#F3E5F5", accent: "#BA68C8" },
  { id: "stressed",   emoji: "😰", label: "Stressed",      color: "#E0F2F1", accent: "#4DB6AC" },
  { id: "missing",    emoji: "💔", label: "Missing You",   color: "#FBE9E7", accent: "#FF8A65" },
  { id: "low",        emoji: "🌧", label: "Feeling Low",   color: "#E3F2FD", accent: "#64B5F6" },
  { id: "celebrate",  emoji: "🎉", label: "Celebrating",   color: "#F9FBE7", accent: "#AED581" },
];

const DEFAULT_LETTERS = {
  happy: [
    {
      id: "happy-1",
      title: "Open when you're absolutely glowing ✨",
      content: `Hey [Name]! 🌻\n\nI hope you're reading this with the biggest smile on your face — the kind that makes your cheeks sore. That kind of happy looks so good on you.\n\nYou deserve every bit of joy that's found its way to you today. Hold onto this feeling. Bookmark it in your memory. Because you've worked hard for good days like this, and they are YOURS.\n\nI'm genuinely so happy for you. Go celebrate — loudly, proudly, without apology.\n\nYour friend who is cheering like crazy from here,\n– Soham 🎉`,
    },
    {
      id: "happy-2",
      title: "Open when something wonderful just happened 🌟",
      content: `[Name]!! 🎊\n\nOkay — I need every single detail. Don't leave anything out.\n\nYou know what's amazing about you? When good things happen to you, you don't take them for granted. You actually feel it. That's rare and it's one of the things I really admire about you.\n\nTonight is yours. Get the dessert you've been eyeing. Watch your comfort show. Do whatever makes this moment stretch a little longer.\n\nBeing your friend means I get to be happy FOR you — and right now, I really, really am.\n\n– Soham 🙌`,
    },
  ],
  sad: [
    {
      id: "sad-1",
      title: "Open when you need to cry it out 💧",
      content: `Hey [Name],\n\nCry. As much as you need to. This letter will wait.\n\n...\n\nStill there? Good.\n\nI want you to know something: the fact that you feel things this deeply is not a weakness. It means you're fully alive, fully present, fully human. There is nothing wrong with you for hurting.\n\nWhen you're ready — wash your face, drink some water, maybe wrap yourself in a blanket. And know that if I could be there with you right now, I absolutely would be.\n\nYou are not going through this alone, even when it feels that way.\n\n– Soham 💙`,
    },
    {
      id: "sad-2",
      title: "Open when you feel like nobody understands you 🌙",
      content: `[Name],\n\nI hear you. And I see you — even from here.\n\nFeeling misunderstood is one of the loneliest feelings in the world. When words come out wrong, or people don't get it, or you can't even explain what's heavy — it's exhausting.\n\nBut I want you to know: you don't have to have the right words with me. You never have to perform being okay or explain yourself perfectly. You can just be exactly where you are.\n\nThis feeling won't last forever. And for what it's worth — I think you make a lot of sense.\n\n– Soham 🫂`,
    },
  ],
  angry: [
    {
      id: "angry-1",
      title: "Open when you want to scream into a pillow 😤",
      content: `[Name],\n\nFirst: go scream into a pillow. Seriously. I'll be here when you get back.\n\n...\n\nBetter? Good.\n\nYou're allowed to be angry. Completely, fully, no-apologies angry. You don't have to rush past this feeling or package it neatly for anyone else's comfort.\n\nThe thing about you is — you get angry because you care. Because you have values. Because you know what you deserve. That's not a flaw. That's integrity.\n\nVent to me whenever you're ready. I've got time and zero judgment.\n\n– Soham 🔥`,
    },
    {
      id: "angry-2",
      title: "Open when someone really got on your nerves 🌪",
      content: `Oh [Name],\n\nOkay, tell me everything. I'm already on your side — no context needed.\n\n*nodding aggressively and making very supportive noises*\n\nRight. Yep. They were absolutely out of line.\n\nFor real though — your reaction is not "too much." You know yourself. You know when a line has been crossed. Don't let anyone gaslight you into thinking your feelings are the problem here.\n\nTake your time to cool down, and then go do something that's purely for you. You've earned it.\n\n– Soham ⚖️`,
    },
  ],
  tired: [
    {
      id: "tired-1",
      title: "Open when your body just can't anymore 🛌",
      content: `Hey [Name],\n\nStop. Whatever you're doing right now — just stop for a second.\n\nYou have been going and going and going. I've watched you push through on empty more times than I can count. And while I think you're incredibly capable — you are also a person who needs rest. Not as a reward. Just as a basic right.\n\nTonight, let yourself be done. No guilt about the to-do list. No "I should be doing something." Just rest.\n\nYou matter more than your productivity. I really need you to believe that.\n\n– Soham 🌙`,
    },
    {
      id: "tired-2",
      title: "Open when you're emotionally exhausted 🌫",
      content: `[Name],\n\nEmotional tiredness is real. Please don't brush past this.\n\nYou carry a lot. You show up for people, you process things deeply, you hold space for others even when you're running low. That takes an enormous amount out of a person.\n\nYou're allowed to put things down for a little while. You're allowed to have a day — or a week — where you just exist without giving, fixing, or figuring anything out.\n\nI'm here if you need to talk, or if you just need company in the quiet.\n\n– Soham 💛`,
    },
  ],
  stressed: [
    {
      id: "stressed-1",
      title: "Open when everything feels overwhelming 🌊",
      content: `[Name], breathe.\n\nJust one breath first. In through the nose, out through the mouth. Do it.\n\nNow: one thing at a time. Not all of it — just one thing. Pick the smallest item on the list and start there. You don't have to solve everything today.\n\nHere's something I know for certain about you: you have navigated hard, overwhelming seasons before. Every single time, you found a way through. Not because it was easy — but because you are genuinely, stubbornly capable.\n\nI believe in you. Not blindly — but based on evidence.\n\n– Soham ☁️`,
    },
    {
      id: "stressed-2",
      title: "Open when deadlines are eating you alive ⏰",
      content: `Hey [Name],\n\nBreathe first. Email second. I mean it.\n\nI know it feels like stopping for even 60 seconds is a luxury you can't afford. But those 60 seconds of breathing will do more for you than 60 seconds of staring at the screen in a spiral.\n\nYou have done hard things before with less time and less energy. You have a track record of pulling through when it counts. Trust that track record right now.\n\nAnd when this is over — we're celebrating. Properly. You deserve it.\n\n– Soham 📣`,
    },
  ],
  missing: [
    {
      id: "missing-1",
      title: "Open when you miss your people 💌",
      content: `[Name],\n\nMissing someone is honestly one of the harder feelings — it's just love with nowhere to go right now.\n\nI want you to know: the people who matter to you feel it too. Connection doesn't just disappear because of distance or time zones or busy schedules. The thread is still there.\n\nAnd hey — I'm here. Maybe not physically, but I'm here in this letter, thinking about you, glad you exist in my life.\n\nReach out to the people you're missing. You might be surprised how much they've been thinking about you too.\n\n– Soham 🫶🏼`,
    },
    {
      id: "missing-2",
      title: "Open when you feel far from everyone 🌍",
      content: `Hey [Name],\n\nFeeling far from the people you care about is genuinely hard. It doesn't matter whether the distance is physical or just circumstantial — that longing is real.\n\nBut I want to say this: you are thought about. You are missed back. Friendship doesn't require being in the same room every day to be real.\n\nIf you're feeling isolated, please reach out to someone — me included. Sometimes just saying "hey, I'm having a lonely day" out loud to a friend is enough to make it feel a little smaller.\n\nYou are never as alone as the feeling tells you.\n\n– Soham 🌟`,
    },
  ],
  low: [
    {
      id: "low-1",
      title: "Open when the grey won't lift 🌧",
      content: `[Name],\n\nSome days are just grey. And that's okay.\n\nYou don't have to find the silver lining today. You don't have to be productive or positive or explain yourself. Some days you just need to exist quietly, and that is a perfectly valid way to spend a day.\n\nI'm thinking of you on this grey day. Sending warmth through this screen, through this letter, hoping something today makes things feel even 1% softer.\n\nThe grey doesn't last forever. And you don't have to get through it alone.\n\n– Soham ☁️`,
    },
    {
      id: "low-2",
      title: "Open when you're doubting yourself 🪞",
      content: `Hey [Name],\n\nCan I tell you what I see when I look at you from the outside?\n\nSomeone who keeps showing up, even on hard days. Who thinks carefully. Who cares about doing things right. Who is stronger and more resilient than they give themselves credit for.\n\nThe doubt is loud right now, I know. But the doubt is not the truth. It's just fear talking — and fear has a habit of being very convincing and very wrong.\n\nYou are more capable than you feel in this moment. That's not a pep talk. That's just the truth.\n\n– Soham 🫂`,
    },
  ],
  celebrate: [
    {
      id: "celebrate-1",
      title: "Open when you achieved something amazing 🏆",
      content: `[Name]!!! 🎉\n\nI KNEW IT. I said it from the beginning — I knew you could do this.\n\nPlease don't immediately move on to the next goal. Stay here for a moment. Let yourself feel the full size of what you just accomplished. You worked for this. You showed up for this. This didn't just happen — YOU made it happen.\n\nBeing your friend means getting to witness moments like this one. And honestly? It's one of the best parts.\n\nI am so genuinely, ridiculously proud of you.\n\n– Soham 🙌`,
    },
    {
      id: "celebrate-2",
      title: "Open on a day worth celebrating 🥂",
      content: `[Name]! 🌸\n\nToday is a good day. And good days deserve to be honoured.\n\nDo something today that's purely for you — something that makes you smile, something indulgent, something you've been putting off because "it's not the right time." Today is the right time.\n\nYou don't need a massive milestone to celebrate. Sometimes just having a genuinely good day after a hard stretch is worth marking.\n\nEnjoy every bit of it. You've more than earned a good day.\n\n– Soham 🎊`,
    },
  ],
};

// Meme data with placeholder descriptions (using emoji-based text cards since we can't load external images)
const DEFAULT_MEMES = {
  happy: [
    { id: "h1", caption: "When everything is going right and you know it 😊", emoji: "🥳", text: "Me walking into today like...\n\nNOTHING CAN STOP ME" },
    { id: "h2", caption: "That warm fuzzy feeling ✨", emoji: "☀️", text: "My heart right now:\n\n*aggressively happy noises*" },
  ],
  sad: [
    { id: "s1", caption: "It's fine. Everything is fine. 🐶🔥", emoji: "🐕", text: "This is fine.\n\n*sitting in burning room*\nThis. Is. Fine." },
    { id: "s2", caption: "Crying but make it a vibe", emoji: "😭", text: "Me: I'm okay\nAlso me at 2am:\n\n*full orchestral breakdown*" },
  ],
  angry: [
    { id: "a1", caption: "When someone tests your patience for the last time", emoji: "😤", text: "Me: I'm a patient person\n\nAlso me:\n\nSECONDS LATER 💥" },
    { id: "a2", caption: "Deep breaths... deep breaths...", emoji: "🌪", text: "Counting to ten:\n\n1... 2... 3...\nOKAY I CANNOT" },
  ],
  tired: [
    { id: "t1", caption: "Me vs. my bed: the eternal love story", emoji: "🛌", text: "Bed: come back\nMe: I have responsibilities\nBed: but...\nMe: ...okay fine" },
    { id: "t2", caption: "Running on love and caffeine", emoji: "☕", text: "Current status:\n\n5% battery\n95% just vibing" },
  ],
  stressed: [
    { id: "st1", caption: "The todo list is winning", emoji: "📋", text: "Me: I'll do it all!\n\nThe list:\n\n*grows by 3 more things*\n\nMe: 👁️👄👁️" },
    { id: "st2", caption: "It's giving: too much, too fast", emoji: "🌊", text: "Task 1: ✓\nTask 2: ✓\nTask 3: ✓\nNew task appears:\nTask 4: 😭" },
  ],
  missing: [
    { id: "m1", caption: "Long distance is just delayed hugs", emoji: "💌", text: "Distance be like:\n\n*makes the heart grow fonder*\n\nalso me: STOP GROWING I MISS THEM" },
    { id: "m2", caption: "Sending love across the miles 💙", emoji: "🌍", text: "Me: misses you\nPhone: delivers message\nHeart: still misses you\n\nScience has gone too far." },
  ],
  low: [
    { id: "l1", caption: "On the grey days, grace", emoji: "☁️", text: "Low days be like:\n\nexist\n\nthat's it\nthat's the whole goal" },
    { id: "l2", caption: "You are doing better than you think 🌱", emoji: "🌻", text: "Brain: you're not enough\nHeart: *sends receipts*\nHeart: would like to disagree" },
  ],
  celebrate: [
    { id: "c1", caption: "YOU DID THAT 🏆", emoji: "🎉", text: "Me yesterday: I can't do it\nMe today: I DID IT\n\nPast me was lying." },
    { id: "c2", caption: "Celebrating you, always 🥂", emoji: "✨", text: "Achievement unlocked:\n\nBEING ABSOLUTELY\nAMAZING TODAY" },
  ],
};

// ── CSS ────────────────────────────────────────────────────────────────────────
const globalCSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FDF8F4; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-8px); }
  }
  @keyframes envelopeOpen {
    0%   { transform: scale(1) rotate(0deg); }
    30%  { transform: scale(1.1) rotate(-3deg); }
    60%  { transform: scale(1.05) rotate(2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes petals {
    0%  { transform: translateY(0) rotate(0deg); opacity:1; }
    100%{ transform: translateY(100vh) rotate(720deg); opacity:0; }
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.04); }
  }
  .mood-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
  .letter-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15) !important; }
  .admin-tab:hover { background: rgba(255,255,255,0.7) !important; }
`;

// inject CSS
const styleEl = document.createElement("style");
styleEl.textContent = globalCSS;
document.head.appendChild(styleEl);

// ── Helpers ───────────────────────────────────────────────────────────────────
const useLocalStorage = (key, init) => {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
};

// ── Petal particle ────────────────────────────────────────────────────────────
const Petals = () => {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    dur: `${4 + Math.random() * 4}s`,
    size: `${8 + Math.random() * 10}px`,
    color: ["#FFCDD2","#F8BBD0","#E1BEE7","#FFF9C4","#B3E5FC"][Math.floor(Math.random()*5)],
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position:"absolute", top:"-20px", left:p.left,
          width:p.size, height:p.size, borderRadius:"50% 0 50% 0",
          background:p.color, opacity:0.6,
          animation:`petals ${p.dur} ${p.delay} infinite linear`,
        }}/>
      ))}
    </div>
  );
};

// ── Lock Screen ───────────────────────────────────────────────────────────────
const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const CORRECT = "1234";

  const handleDigit = (d) => {
    const next = pin + d;
    setPin(next);
    if (next.length === 4) {
      if (next === CORRECT) { setTimeout(onUnlock, 300); }
      else {
        setShake(true); setError(true);
        setTimeout(() => { setPin(""); setShake(false); setError(false); }, 700);
      }
    }
  };
  const del = () => setPin(p => p.slice(0,-1));

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FDF0F5 0%,#F0EBF8 50%,#EBF4F8 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"'Cormorant Garamond',serif", position:"relative", overflow:"hidden" }}>
      <Petals/>
      <div style={{ position:"relative", zIndex:1, textAlign:"center", animation:"fadeInUp 0.8s ease" }}>
        <div style={{ fontSize:"56px", marginBottom:"8px", animation:"float 3s ease-in-out infinite" }}>🔐</div>
        <h1 style={{ fontSize:"28px", fontWeight:300, color:"#5D4E6D", letterSpacing:"2px", marginBottom:"4px" }}>For Your Eyes Only</h1>
        <p style={{ fontSize:"15px", color:"#9E8FAE", fontWeight:300, marginBottom:"40px" }}>Enter your PIN to continue</p>

        {/* Dots */}
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", marginBottom:"32px" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width:"16px", height:"16px", borderRadius:"50%",
              background: i < pin.length ? "#B39DDB" : "transparent",
              border:"2px solid #B39DDB",
              transition:"all 0.2s ease",
              animation: shake ? "pulse 0.1s ease infinite" : "none",
            }}/>
          ))}
        </div>

        {/* Keypad */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", maxWidth:"240px", margin:"0 auto" }}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((d,i) => (
            <button key={i} onClick={() => d === "⌫" ? del() : d !== "" ? handleDigit(String(d)) : null}
              style={{
                padding:"16px", borderRadius:"50%", border:"none",
                background: d === "" ? "transparent" : "rgba(255,255,255,0.7)",
                backdropFilter:"blur(8px)",
                fontSize:"20px", fontFamily:"'Cormorant Garamond',serif",
                color: error ? "#E57373" : "#5D4E6D",
                cursor: d === "" ? "default" : "pointer",
                boxShadow: d !== "" ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
                transition:"all 0.15s ease",
              }}>{d}</button>
          ))}
        </div>
        <p style={{ marginTop:"20px", fontSize:"12px", color:"#C9BDD8" }}>Default PIN: 1234</p>
      </div>
    </div>
  );
};

// ── Welcome / Name Screen ─────────────────────────────────────────────────────
const WelcomeScreen = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [step, setStep] = useState(0); // 0=splash, 1=name entry

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FDF0F5 0%,#F0EBF8 50%,#EBF4F8 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", padding:"32px", position:"relative", overflow:"hidden" }}>
      <Petals/>
      <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:"340px", width:"100%" }}>
        {step === 0 && (
          <div style={{ animation:"fadeInUp 0.9s ease" }}>
            <div style={{ fontSize:"64px", marginBottom:"16px", animation:"float 2.5s ease-in-out infinite" }}>🫶🏼</div>
            <p style={{ fontSize:"26px", fontWeight:300, color:"#7B5EA7", letterSpacing:"3px", lineHeight:1.5 }}>curated with heart</p>
          </div>
        )}
        {step === 1 && (
          <div style={{ animation:"fadeInUp 0.7s ease" }}>
            <div style={{ fontSize:"48px", marginBottom:"20px" }}>🌸</div>
            <h2 style={{ fontSize:"24px", fontWeight:300, color:"#5D4E6D", marginBottom:"8px", letterSpacing:"1px" }}>A little something for you</h2>
            <p style={{ fontSize:"15px", color:"#9E8FAE", marginBottom:"32px", lineHeight:1.6 }}>Please enter your first name so I can make this space feel personal to you.</p>
            <input value={name} onChange={e=>setName(e.target.value)}
              placeholder="Your name..."
              style={{
                width:"100%", padding:"14px 20px", border:"1.5px solid #D8C8E8",
                borderRadius:"50px", background:"rgba(255,255,255,0.7)",
                fontFamily:"'Cormorant Garamond',serif", fontSize:"18px",
                color:"#5D4E6D", outline:"none", textAlign:"center",
                backdropFilter:"blur(8px)",
              }}
              onKeyDown={e => e.key==="Enter" && name.trim() && onComplete(name.trim())}
            />
            <button onClick={() => name.trim() && onComplete(name.trim())}
              className="btn-primary"
              style={{
                marginTop:"16px", width:"100%", padding:"14px",
                background:"linear-gradient(135deg,#C8A8D4,#A8C4D4)",
                border:"none", borderRadius:"50px", color:"white",
                fontSize:"16px", letterSpacing:"1px", cursor:"pointer",
                fontFamily:"'Cormorant Garamond',serif", transition:"all 0.2s ease",
                boxShadow:"0 4px 16px rgba(180,140,200,0.3)",
              }}>Continue →</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Meme Card ─────────────────────────────────────────────────────────────────
const MemeCard = ({ meme }) => (
  <div style={{
    background:"rgba(255,255,255,0.75)", borderRadius:"20px",
    padding:"24px", textAlign:"center",
    boxShadow:"0 4px 24px rgba(0,0,0,0.07)",
    border:"1px solid rgba(255,255,255,0.9)",
    backdropFilter:"blur(10px)", flex:"1", minWidth:"140px",
  }}>
    {meme.imageData ? (
      <img src={meme.imageData} alt={meme.caption}
        style={{ width:"100%", maxHeight:"140px", objectFit:"cover", borderRadius:"12px", marginBottom:"12px" }}/>
    ) : (
      <div style={{
        width:"100%", minHeight:"100px", borderRadius:"12px", marginBottom:"12px",
        background:"linear-gradient(135deg,#F3E5F5,#E8EAF6)",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:"16px",
      }}>
        <span style={{ fontSize:"40px", marginBottom:"8px" }}>{meme.emoji}</span>
        <p style={{ fontSize:"12px", color:"#7B5EA7", whiteSpace:"pre-line", lineHeight:1.5, fontFamily:"'Lato',sans-serif", fontWeight:300 }}>{meme.text}</p>
      </div>
    )}
    <p style={{ fontSize:"12px", color:"#9E8FAE", fontFamily:"'Lato',sans-serif", fontWeight:300, lineHeight:1.5 }}>{meme.caption}</p>
  </div>
);

// ── Letter Full Screen ────────────────────────────────────────────────────────
const LetterView = ({ letter, moodColor, userName, onClose, isFav, onToggleFav }) => {
  const content = letter.content.replace(/\[Name\]/g, userName);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:100,
      background:"rgba(80,50,100,0.35)", backdropFilter:"blur(8px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"20px", animation:"fadeIn 0.3s ease",
    }} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{
        background:"#FEFCFA", borderRadius:"24px", maxWidth:"480px", width:"100%",
        maxHeight:"88vh", overflow:"auto", padding:"36px 32px",
        boxShadow:"0 32px 80px rgba(0,0,0,0.18)",
        animation: visible ? "slideUp 0.5s cubic-bezier(0.22,1,0.36,1)" : "none",
        fontFamily:"'Cormorant Garamond',serif",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"28px" }}>
          <div style={{ flex:1 }}>
            <div style={{ width:"40px", height:"3px", background:moodColor, borderRadius:"2px", marginBottom:"12px" }}/>
            <h2 style={{ fontSize:"20px", fontWeight:400, color:"#3D2E50", lineHeight:1.4 }}>{letter.title}</h2>
          </div>
          <div style={{ display:"flex", gap:"12px", marginLeft:"16px", flexShrink:0 }}>
            <button onClick={onToggleFav} style={{ background:"none", border:"none", fontSize:"22px", cursor:"pointer", opacity: isFav ? 1 : 0.4, transition:"all 0.2s" }}>🤍</button>
            <button onClick={onClose} style={{ background:"rgba(0,0,0,0.06)", border:"none", borderRadius:"50%", width:"32px", height:"32px", cursor:"pointer", fontSize:"16px" }}>×</button>
          </div>
        </div>
        {/* Content */}
        <div style={{ fontSize:"16px", lineHeight:1.9, color:"#5A4A6A", whiteSpace:"pre-line", fontWeight:300 }}>{content}</div>
        {letter.imageData && (
          <img src={letter.imageData} alt="letter photo"
            style={{ marginTop:"24px", width:"100%", borderRadius:"16px", objectFit:"cover", maxHeight:"200px" }}/>
        )}
        <div style={{ marginTop:"32px", textAlign:"center" }}>
          <button onClick={onClose} className="btn-primary" style={{
            padding:"12px 36px", background:"linear-gradient(135deg,#C8A8D4,#A8C4D4)",
            border:"none", borderRadius:"50px", color:"white", fontSize:"15px",
            cursor:"pointer", fontFamily:"'Cormorant Garamond',serif", letterSpacing:"1px", transition:"all 0.2s",
          }}>Close Letter</button>
        </div>
      </div>
    </div>
  );
};

// ── Mood Screen ───────────────────────────────────────────────────────────────
const MoodScreen = ({ mood, userName, letters, memes, favorites, onToggleFav, onBack }) => {
  const [openLetter, setOpenLetter] = useState(null);
  const [opening, setOpening] = useState(null);

  const handleOpen = (letter) => {
    setOpening(letter.id);
    setTimeout(() => { setOpenLetter(letter); setOpening(null); }, 600);
  };

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${mood.color} 0%,#FDF8F4 60%)`, fontFamily:"'Cormorant Garamond',serif", paddingBottom:"40px" }}>
      {/* Top bar */}
      <div style={{ padding:"20px 24px 0", display:"flex", alignItems:"center", gap:"12px" }}>
        <button onClick={onBack} style={{ background:"rgba(255,255,255,0.6)", border:"none", borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer", fontSize:"16px", backdropFilter:"blur(8px)" }}>←</button>
        <span style={{ fontSize:"28px" }}>{mood.emoji}</span>
        <h2 style={{ fontSize:"22px", fontWeight:300, color:"#4A3860", letterSpacing:"1px" }}>{mood.label}</h2>
      </div>

      <div style={{ padding:"24px" }}>
        {/* Letters */}
        <p style={{ fontSize:"13px", letterSpacing:"2px", color:"#9E8FAE", textTransform:"uppercase", marginBottom:"16px", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>Letters for you</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"32px" }}>
          {letters.map((letter) => (
            <div key={letter.id} className="letter-card" onClick={() => handleOpen(letter)}
              style={{
                background:"rgba(255,255,255,0.75)", borderRadius:"20px", padding:"20px 24px",
                cursor:"pointer", display:"flex", alignItems:"center", gap:"16px",
                boxShadow:"0 4px 20px rgba(0,0,0,0.07)", border:"1px solid rgba(255,255,255,0.9)",
                backdropFilter:"blur(10px)", transition:"all 0.25s ease",
                animation: opening===letter.id ? "envelopeOpen 0.6s ease" : "fadeInUp 0.4s ease",
              }}>
              <span style={{ fontSize:"32px" }}>💌</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:"15px", color:"#4A3860", lineHeight:1.4 }}>{letter.title}</p>
                <p style={{ fontSize:"12px", color:"#B0A0C0", marginTop:"4px", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>Tap to open</p>
              </div>
              <span style={{ fontSize:"18px", opacity: favorites.includes(letter.id) ? 1 : 0.2 }}>🤍</span>
            </div>
          ))}
        </div>

        {/* Memes */}
        <p style={{ fontSize:"13px", letterSpacing:"2px", color:"#9E8FAE", textTransform:"uppercase", marginBottom:"16px", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>A little humor 😄</p>
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
          {memes.map(m => <MemeCard key={m.id} meme={m}/>)}
        </div>
      </div>

      {openLetter && (
        <LetterView letter={openLetter} moodColor={mood.accent} userName={userName}
          onClose={() => setOpenLetter(null)}
          isFav={favorites.includes(openLetter.id)}
          onToggleFav={() => onToggleFav(openLetter.id)}/>
      )}
    </div>
  );
};

// ── Home Screen ───────────────────────────────────────────────────────────────
const HomeScreen = ({ userName, letters, memes, favorites, onToggleFav, onAdmin }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [daily] = useState(() => MOODS[Math.floor((new Date().getDate()) % MOODS.length)]);

  if (selectedMood) {
    const mood = MOODS.find(m => m.id === selectedMood);
    return (
      <MoodScreen mood={mood} userName={userName}
        letters={letters[selectedMood] || []}
        memes={memes[selectedMood] || []}
        favorites={favorites} onToggleFav={onToggleFav}
        onBack={() => setSelectedMood(null)}/>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FDF0F5 0%,#F0EBF8 40%,#EBF4F8 100%)", fontFamily:"'Cormorant Garamond',serif", position:"relative", overflow:"hidden" }}>
      <Petals/>
      <div style={{ position:"relative", zIndex:1, padding:"32px 24px 40px" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"28px" }}>
          <div>
            <p style={{ fontSize:"13px", color:"#B0A0C0", letterSpacing:"2px", textTransform:"uppercase", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>curated with heart 🫶🏼</p>
            <h1 style={{ fontSize:"30px", fontWeight:300, color:"#4A3860", marginTop:"4px", letterSpacing:"0.5px" }}>
              Hey, <span style={{ fontStyle:"italic", color:"#8B6FAE" }}>{userName}</span> ✨
            </h1>
          </div>
          <button onClick={onAdmin} style={{
            background:"rgba(255,255,255,0.6)", border:"1px solid rgba(180,160,200,0.3)",
            borderRadius:"50%", width:"40px", height:"40px", cursor:"pointer", fontSize:"16px",
            backdropFilter:"blur(8px)",
          }}>⚙️</button>
        </div>

        {/* Daily surprise */}
        <div style={{
          background:"rgba(255,255,255,0.65)", borderRadius:"20px", padding:"18px 20px",
          marginBottom:"28px", backdropFilter:"blur(12px)",
          border:"1px solid rgba(255,255,255,0.9)",
          boxShadow:"0 4px 24px rgba(150,120,180,0.12)",
          animation:"fadeInUp 0.5s ease",
        }}>
          <p style={{ fontSize:"11px", letterSpacing:"2px", color:"#B0A0C0", textTransform:"uppercase", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>Today's mood booster 🌙</p>
          <p style={{ fontSize:"17px", color:"#5A4A6A", marginTop:"6px" }}>{daily.emoji} {daily.label} — a letter waiting for you 💌</p>
        </div>

        {/* Mood grid */}
        <p style={{ fontSize:"13px", letterSpacing:"2px", color:"#9E8FAE", textTransform:"uppercase", marginBottom:"16px", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>How are you feeling?</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
          {MOODS.map((mood, i) => (
            <div key={mood.id} className="mood-card" onClick={() => setSelectedMood(mood.id)}
              style={{
                background:`linear-gradient(135deg,${mood.color},rgba(255,255,255,0.8))`,
                borderRadius:"20px", padding:"20px 16px",
                cursor:"pointer", textAlign:"center",
                boxShadow:"0 4px 20px rgba(0,0,0,0.07)",
                border:"1px solid rgba(255,255,255,0.9)",
                backdropFilter:"blur(8px)",
                transition:"all 0.25s ease",
                animation:`fadeInUp ${0.3 + i*0.07}s ease`,
              }}>
              <div style={{ fontSize:"34px", marginBottom:"8px", animation:"float 3s ease-in-out infinite", animationDelay:`${i*0.2}s` }}>{mood.emoji}</div>
              <p style={{ fontSize:"14px", color:"#5A4A6A", letterSpacing:"0.5px" }}>{mood.label}</p>
            </div>
          ))}
        </div>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div style={{ marginTop:"28px" }}>
            <p style={{ fontSize:"13px", letterSpacing:"2px", color:"#9E8FAE", textTransform:"uppercase", marginBottom:"12px", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>Your favourites 🤍</p>
            <p style={{ fontSize:"14px", color:"#B0A0C0" }}>{favorites.length} saved letter{favorites.length>1?"s":""}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Admin Panel ───────────────────────────────────────────────────────────────
const AdminPanel = ({ letters, memes, onSave, onBack, userName, onChangeName }) => {
  const [tab, setTab] = useState("settings");
  const [localLetters, setLocalLetters] = useState(JSON.parse(JSON.stringify(letters)));
  const [localMemes, setLocalMemes] = useState(JSON.parse(JSON.stringify(memes)));
  const [selMood, setSelMood] = useState("happy");
  const [saved, setSaved] = useState(false);
  const [localName, setLocalName] = useState(userName);
  const [nameSaved, setNameSaved] = useState(false);

  const handleSaveName = () => {
    if (localName.trim()) {
      onChangeName(localName.trim());
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    }
  };

  const handleSave = () => {
    onSave(localLetters, localMemes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateLetter = (mood, idx, field, val) => {
    const copy = JSON.parse(JSON.stringify(localLetters));
    copy[mood][idx][field] = val;
    setLocalLetters(copy);
  };

  const uploadMemeImage = (mood, idx, file) => {
    const reader = new FileReader();
    reader.onload = e => {
      const copy = JSON.parse(JSON.stringify(localMemes));
      copy[mood][idx].imageData = e.target.result;
      setLocalMemes(copy);
    };
    reader.readAsDataURL(file);
  };

  const removeMemeImage = (mood, idx) => {
    const copy = JSON.parse(JSON.stringify(localMemes));
    delete copy[mood][idx].imageData;
    setLocalMemes(copy);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#F8F0FF 0%,#F0F4FF 100%)", fontFamily:"'Cormorant Garamond',serif" }}>
      {/* Topbar */}
      <div style={{ padding:"20px 24px", display:"flex", alignItems:"center", gap:"12px", background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(180,160,210,0.2)" }}>
        <button onClick={onBack} style={{ background:"rgba(180,160,210,0.15)", border:"none", borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer", fontSize:"16px" }}>←</button>
        <div>
          <h2 style={{ fontSize:"20px", fontWeight:300, color:"#4A3860" }}>Admin Panel</h2>
          <p style={{ fontSize:"12px", color:"#B0A0C0", fontFamily:"'Lato',sans-serif", fontWeight:300 }}>Customise letters & memes</p>
        </div>
        <div style={{ flex:1 }}/>
        <button onClick={handleSave} className="btn-primary" style={{
          padding:"10px 20px", background: saved ? "#A8D4A8" : "linear-gradient(135deg,#C8A8D4,#A8C4D4)",
          border:"none", borderRadius:"50px", color:"white", fontSize:"14px",
          cursor:"pointer", fontFamily:"'Cormorant Garamond',serif", transition:"all 0.3s",
        }}>{saved ? "Saved ✓" : "Save All"}</button>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:"8px", padding:"16px 24px 0" }}>
        {[["settings","⚙️ Settings"],["letters","✉️ Letters"],["memes","😄 Memes"]].map(([t,label]) => (
          <button key={t} className="admin-tab" onClick={() => setTab(t)}
            style={{
              padding:"8px 20px", borderRadius:"50px", border:"none",
              background: tab===t ? "rgba(255,255,255,0.9)" : "transparent",
              color: tab===t ? "#7B5EA7" : "#9E8FAE", fontSize:"15px",
              cursor:"pointer", fontFamily:"'Cormorant Garamond',serif",
              boxShadow: tab===t ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
              transition:"all 0.2s",
            }}>{label}</button>
        ))}
      </div>

      {/* Mood selector */}
      <div style={{ display:"flex", gap:"8px", padding:"12px 24px", overflowX:"auto" }}>
        {MOODS.map(m => (
          <button key={m.id} onClick={() => setSelMood(m.id)}
            style={{
              padding:"6px 14px", borderRadius:"50px", border:"none", whiteSpace:"nowrap",
              background: selMood===m.id ? m.color : "rgba(255,255,255,0.5)",
              color:"#5A4A6A", fontSize:"13px", cursor:"pointer",
              boxShadow: selMood===m.id ? `0 2px 12px ${m.accent}40` : "none",
              transition:"all 0.2s",
            }}>{m.emoji} {m.label}</button>
        ))}
      </div>

      <div style={{ padding:"0 24px 40px" }}>
        {tab === "settings" && (
          <div style={{
            background:"rgba(255,255,255,0.75)", borderRadius:"20px", padding:"24px",
            marginBottom:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)",
            border:"1px solid rgba(255,255,255,0.9)",
          }}>
            <p style={{ fontSize:"11px", letterSpacing:"2px", color:"#B0A0C0", textTransform:"uppercase", fontFamily:"'Lato',sans-serif", marginBottom:"16px" }}>Change Name</p>
            <p style={{ fontSize:"14px", color:"#9E8FAE", marginBottom:"16px", lineHeight:1.6 }}>
              This is the name that appears throughout the app and inside every letter.
            </p>
            <input
              value={localName}
              onChange={e => setLocalName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSaveName()}
              placeholder="Enter new name..."
              style={{
                width:"100%", padding:"12px 16px",
                border:"1.5px solid #E0D0F0", borderRadius:"12px",
                fontFamily:"'Cormorant Garamond',serif", fontSize:"18px",
                color:"#4A3860", outline:"none", marginBottom:"12px",
                background:"rgba(255,255,255,0.9)", textAlign:"center",
              }}
            />
            <button onClick={handleSaveName} style={{
              width:"100%", padding:"12px",
              background: nameSaved ? "#A8D4A8" : "linear-gradient(135deg,#C8A8D4,#A8C4D4)",
              border:"none", borderRadius:"12px", color:"white",
              fontSize:"15px", cursor:"pointer",
              fontFamily:"'Cormorant Garamond',serif",
              letterSpacing:"1px", transition:"all 0.3s",
            }}>{nameSaved ? "Name Updated ✓" : "Save Name"}</button>
          </div>
        )}

        {tab === "letters" && (localLetters[selMood]||[]).map((letter, idx) => (
          <div key={letter.id} style={{
            background:"rgba(255,255,255,0.75)", borderRadius:"20px", padding:"20px",
            marginBottom:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)",
            border:"1px solid rgba(255,255,255,0.9)",
          }}>
            <p style={{ fontSize:"11px", letterSpacing:"2px", color:"#B0A0C0", textTransform:"uppercase", fontFamily:"'Lato',sans-serif", marginBottom:"10px" }}>Letter {idx+1}</p>
            <input value={letter.title} onChange={e => updateLetter(selMood,idx,"title",e.target.value)}
              style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E0D0F0", borderRadius:"12px", fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:"#4A3860", outline:"none", marginBottom:"10px", background:"rgba(255,255,255,0.8)" }}
              placeholder="Letter title..."/>
            <textarea value={letter.content} onChange={e => updateLetter(selMood,idx,"content",e.target.value)} rows={8}
              style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E0D0F0", borderRadius:"12px", fontFamily:"'Cormorant Garamond',serif", fontSize:"14px", color:"#5A4A6A", outline:"none", resize:"vertical", lineHeight:1.8, background:"rgba(255,255,255,0.8)" }}
              placeholder="Letter content... Use [Name] to insert her name."/>
          </div>
        ))}

        {tab === "memes" && (localMemes[selMood]||[]).map((meme, idx) => (
          <div key={meme.id} style={{
            background:"rgba(255,255,255,0.75)", borderRadius:"20px", padding:"20px",
            marginBottom:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)",
            border:"1px solid rgba(255,255,255,0.9)",
          }}>
            <p style={{ fontSize:"11px", letterSpacing:"2px", color:"#B0A0C0", textTransform:"uppercase", fontFamily:"'Lato',sans-serif", marginBottom:"10px" }}>Meme {idx+1}</p>
            <input value={meme.caption} onChange={e => {
              const copy = JSON.parse(JSON.stringify(localMemes));
              copy[selMood][idx].caption = e.target.value;
              setLocalMemes(copy);
            }} style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E0D0F0", borderRadius:"12px", fontFamily:"'Cormorant Garamond',serif", fontSize:"15px", color:"#4A3860", outline:"none", marginBottom:"12px", background:"rgba(255,255,255,0.8)" }}
              placeholder="Meme caption..."/>

            {meme.imageData ? (
              <div style={{ position:"relative" }}>
                <img src={meme.imageData} alt="meme" style={{ width:"100%", maxHeight:"160px", objectFit:"cover", borderRadius:"12px" }}/>
                <button onClick={() => removeMemeImage(selMood,idx)}
                  style={{ position:"absolute", top:"8px", right:"8px", background:"rgba(255,255,255,0.9)", border:"none", borderRadius:"50%", width:"28px", height:"28px", cursor:"pointer", fontSize:"14px" }}>×</button>
              </div>
            ) : (
              <label style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                padding:"14px", border:"2px dashed #D8C8E8", borderRadius:"12px",
                cursor:"pointer", color:"#B0A0C0", fontSize:"14px",
              }}>
                <span>📷 Upload meme from gallery</span>
                <input type="file" accept="image/*" style={{ display:"none" }}
                  onChange={e => e.target.files[0] && uploadMemeImage(selMood,idx,e.target.files[0])}/>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("lock"); // lock → welcome → home
  const [userName, setUserName] = useLocalStorage("owl_name", "");
  const [letters, setLetters] = useLocalStorage("owl_letters", DEFAULT_LETTERS);
  const [memes, setMemes] = useLocalStorage("owl_memes", DEFAULT_MEMES);
  const [favorites, setFavorites] = useLocalStorage("owl_favs", []);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if returning user
  useEffect(() => {
    if (screen === "lock") return; // always show lock first
  }, []);

  const handleUnlock = () => {
    setScreen(userName ? "home" : "welcome");
  };

  const toggleFav = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSaveAdmin = (newLetters, newMemes) => {
    setLetters(newLetters);
    setMemes(newMemes);
  };

  if (screen === "lock") return <LockScreen onUnlock={handleUnlock}/>;
  if (screen === "welcome") return <WelcomeScreen onComplete={n => { setUserName(n); setScreen("home"); }}/>;
  if (showAdmin) return <AdminPanel letters={letters} memes={memes} onSave={handleSaveAdmin} onBack={() => setShowAdmin(false)} userName={userName} onChangeName={n => { setUserName(n); }}/>;

  return (
    <HomeScreen userName={userName} letters={letters} memes={memes}
      favorites={favorites} onToggleFav={toggleFav}
      onAdmin={() => setShowAdmin(true)}/>
  );
}
