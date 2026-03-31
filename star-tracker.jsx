import { useState, useEffect, useCallback, useRef } from "react";

// Pixel font
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// --- Particle explosion for stars ---
function Particle({ x, y, color, angle, speed, size, delay }) {
  const [style, setStyle] = useState({
    position: "absolute",
    left: x,
    top: y,
    width: size,
    height: size,
    background: color,
    opacity: 1,
    transform: "scale(1)",
    transition: "none",
    pointerEvents: "none",
    zIndex: 100,
    imageRendering: "pixelated",
  });

  useEffect(() => {
    const t = setTimeout(() => {
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      setStyle((s) => ({
        ...s,
        left: x + dx,
        top: y + dy,
        opacity: 0,
        transform: "scale(0)",
        transition: "all 0.7s cubic-bezier(.15,.8,.3,1)",
      }));
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return <div style={style} />;
}

// --- Pixel Star ---
function PixelStar({ filled, onClick, exploding }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (exploding) {
      const cx = 24;
      const cy = 24;
      const colors = ["#FFD700", "#FF6B35", "#FF1493", "#00FFFF", "#7FFF00", "#FFE135", "#FFF"];
      const np = [];
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        np.push({
          id: Date.now() + i,
          x: cx - 3, y: cy - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle, speed: 25 + Math.random() * 40,
          size: 3 + Math.floor(Math.random() * 5),
          delay: Math.random() * 80,
        });
      }
      setParticles(np);
      setTimeout(() => setParticles([]), 900);
    }
  }, [exploding]);

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: 48,
        height: 48,
        cursor: "pointer",
        transition: "transform 0.15s",
        transform: filled ? "scale(1)" : "scale(0.8)",
        filter: filled ? "drop-shadow(0 0 6px #FFD700)" : "none",
      }}
    >
      {particles.map((p) => <Particle key={p.id} {...p} />)}
      <svg viewBox="0 0 16 16" width="48" height="48" style={{ imageRendering: "pixelated", display: "block" }}>
        {filled ? (
          <>
            <rect x="7" y="0" width="2" height="2" fill="#FFD700" />
            <rect x="6" y="2" width="4" height="2" fill="#FFD700" />
            <rect x="5" y="4" width="6" height="2" fill="#FFC200" />
            <rect x="0" y="6" width="16" height="2" fill="#FFD700" />
            <rect x="1" y="8" width="14" height="2" fill="#FFC200" />
            <rect x="2" y="10" width="12" height="2" fill="#FFD700" />
            <rect x="3" y="12" width="4" height="2" fill="#FFC200" />
            <rect x="9" y="12" width="4" height="2" fill="#FFC200" />
            <rect x="2" y="14" width="3" height="2" fill="#FFD700" />
            <rect x="11" y="14" width="3" height="2" fill="#FFD700" />
          </>
        ) : (
          <>
            <rect x="7" y="0" width="2" height="2" fill="#3a3a3a" />
            <rect x="6" y="2" width="4" height="2" fill="#333" />
            <rect x="5" y="4" width="6" height="2" fill="#3a3a3a" />
            <rect x="0" y="6" width="16" height="2" fill="#333" />
            <rect x="1" y="8" width="14" height="2" fill="#3a3a3a" />
            <rect x="2" y="10" width="12" height="2" fill="#333" />
            <rect x="3" y="12" width="4" height="2" fill="#3a3a3a" />
            <rect x="9" y="12" width="4" height="2" fill="#3a3a3a" />
            <rect x="2" y="14" width="3" height="2" fill="#333" />
            <rect x="11" y="14" width="3" height="2" fill="#333" />
          </>
        )}
      </svg>
    </div>
  );
}

// --- Pixel Charizard with fire ---
function PixelCharizard({ active }) {
  const [fireFrame, setFireFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setFireFrame((f) => (f + 1) % 4), 200);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  const fireOffsets = [
    [{ x: 38, y: 8 }, { x: 42, y: 4 }, { x: 40, y: 0 }],
    [{ x: 40, y: 6 }, { x: 44, y: 2 }, { x: 38, y: 0 }],
    [{ x: 36, y: 7 }, { x: 42, y: 3 }, { x: 44, y: 0 }],
    [{ x: 40, y: 9 }, { x: 38, y: 4 }, { x: 42, y: 1 }],
  ];
  const fireColors = ["#FF4500", "#FF6B35", "#FFD700", "#FF1500"];

  return (
    <div style={{ position: "relative", width: 64, height: 56, margin: "0 auto" }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: "pixelated" }}>
        {/* Body */}
        <rect x="10" y="10" width="10" height="10" fill="#E86830" />
        <rect x="8" y="12" width="2" height="6" fill="#E86830" />
        <rect x="20" y="12" width="2" height="6" fill="#E86830" />
        {/* Belly */}
        <rect x="12" y="14" width="6" height="4" fill="#F4C878" />
        {/* Head */}
        <rect x="12" y="4" width="8" height="8" fill="#E86830" />
        <rect x="10" y="6" width="2" height="4" fill="#E86830" />
        {/* Horns */}
        <rect x="12" y="2" width="2" height="2" fill="#E86830" />
        <rect x="18" y="2" width="2" height="2" fill="#E86830" />
        {/* Eyes */}
        <rect x="14" y="6" width="2" height="2" fill="#FFF" />
        <rect x="18" y="6" width="2" height="2" fill="#FFF" />
        <rect x="15" y="7" width="1" height="1" fill="#222" />
        <rect x="19" y="7" width="1" height="1" fill="#222" />
        {/* Mouth open */}
        <rect x="20" y="8" width="4" height="3" fill="#8B0000" />
        <rect x="20" y="8" width="1" height="1" fill="#FFF" />
        <rect x="23" y="10" width="1" height="1" fill="#FFF" />
        {/* Wings */}
        <rect x="4" y="8" width="4" height="2" fill="#48A0D8" />
        <rect x="2" y="6" width="4" height="2" fill="#48A0D8" />
        <rect x="0" y="4" width="4" height="2" fill="#48A0D8" />
        {/* Tail with flame */}
        <rect x="10" y="20" width="2" height="4" fill="#E86830" />
        <rect x="8" y="24" width="2" height="2" fill="#FF6B35" />
        <rect x="8" y="22" width="2" height="2" fill="#FFD700" />
        {/* Legs */}
        <rect x="12" y="20" width="3" height="4" fill="#E86830" />
        <rect x="17" y="20" width="3" height="4" fill="#E86830" />
        <rect x="11" y="24" width="4" height="2" fill="#E86830" />
        <rect x="16" y="24" width="4" height="2" fill="#E86830" />
      </svg>
      {/* Animated fire breath */}
      {fireOffsets[fireFrame].map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            width: 6 + i * 2,
            height: 6 + i * 2,
            background: fireColors[(fireFrame + i) % fireColors.length],
            imageRendering: "pixelated",
            opacity: 0.9 - i * 0.15,
            boxShadow: `0 0 ${4 + i * 2}px ${fireColors[(fireFrame + i) % fireColors.length]}`,
          }}
        />
      ))}
    </div>
  );
}

// --- Pixel Unicorn with rainbows ---
function PixelUnicorn({ active }) {
  const [rainbowFrame, setRainbowFrame] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setRainbowFrame((f) => (f + 1) % 4), 250);
    return () => clearInterval(i);
  }, [active]);

  if (!active) return null;

  const rainbowColors = ["#FF0000", "#FF8800", "#FFFF00", "#00FF00", "#0088FF", "#8800FF"];

  return (
    <div style={{ position: "relative", width: 64, height: 56, margin: "0 auto" }}>
      <svg viewBox="0 0 32 28" width="64" height="56" style={{ imageRendering: "pixelated" }}>
        {/* Body */}
        <rect x="8" y="12" width="14" height="8" fill="#F0F0F0" />
        <rect x="6" y="14" width="2" height="4" fill="#F0F0F0" />
        {/* Head */}
        <rect x="20" y="6" width="8" height="8" fill="#F0F0F0" />
        <rect x="22" y="4" width="4" height="2" fill="#F0F0F0" />
        {/* Horn */}
        <rect x="25" y="0" width="2" height="4" fill="#FFD700" />
        <rect x="26" y="0" width="1" height="2" fill="#FFC200" />
        {/* Eye */}
        <rect x="24" y="8" width="2" height="2" fill="#222" />
        <rect x="25" y="8" width="1" height="1" fill="#FFF" />
        {/* Mane */}
        <rect x="18" y="6" width="2" height="8" fill="#FF69B4" />
        <rect x="16" y="8" width="2" height="4" fill="#DA70D6" />
        {/* Legs */}
        <rect x="10" y="20" width="3" height="6" fill="#F0F0F0" />
        <rect x="17" y="20" width="3" height="6" fill="#F0F0F0" />
        <rect x="9" y="24" width="4" height="2" fill="#E8E8E8" />
        <rect x="16" y="24" width="4" height="2" fill="#E8E8E8" />
        {/* Tail */}
        <rect x="4" y="12" width="4" height="2" fill="#FF69B4" />
        <rect x="2" y="14" width="4" height="2" fill="#DA70D6" />
        <rect x="4" y="16" width="4" height="2" fill="#87CEEB" />
      </svg>
      {/* Rainbow particles from horn */}
      {rainbowColors.map((c, i) => {
        const offsetY = ((rainbowFrame + i) % 6) * 3;
        const offsetX = 30 + i * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: offsetX - (rainbowFrame % 2),
              top: offsetY - 4 + (rainbowFrame % 2) * 2,
              width: 5,
              height: 5,
              background: c,
              imageRendering: "pixelated",
              opacity: 0.85,
              boxShadow: `0 0 4px ${c}`,
              transition: "all 0.2s",
            }}
          />
        );
      })}
    </div>
  );
}

// --- Retro CRT TV ---
function RetroTV({ active, character, onReset }) {
  const [scanline, setScanline] = useState(0);
  useEffect(() => {
    if (!active) return;
    const i = setInterval(() => setScanline((s) => (s + 1) % 24), 100);
    return () => clearInterval(i);
  }, [active]);

  return (
    <div style={{ position: "relative", width: 160, height: 152, margin: "0 auto" }}>
      {/* V-Antenna */}
      <svg width="80" height="30" style={{ position: "absolute", top: -26, left: 40, zIndex: 1 }}>
        <line x1="40" y1="28" x2="10" y2="2" stroke="#777" strokeWidth="3" />
        <line x1="40" y1="28" x2="70" y2="2" stroke="#777" strokeWidth="3" />
        <circle cx="10" cy="2" r="4" fill={active ? "#00ff88" : "#555"} />
        <circle cx="70" cy="2" r="4" fill={active ? "#00ff88" : "#555"} />
        {active && (
          <>
            <circle cx="10" cy="2" r="4" fill="#00ff88" style={{ filter: "blur(3px)", opacity: 0.6 }} />
            <circle cx="70" cy="2" r="4" fill="#00ff88" style={{ filter: "blur(3px)", opacity: 0.6 }} />
          </>
        )}
      </svg>

      {/* TV Shell */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 160, height: 130,
        background: "linear-gradient(180deg, #4a4a4a 0%, #333 60%, #2a2a2a 100%)",
        borderRadius: "10px 10px 6px 6px",
        border: "3px solid #555",
        boxShadow: active ? "0 0 20px rgba(0,255,136,0.2), inset 0 1px 0 #666" : "0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 #666",
        display: "flex", overflow: "hidden",
      }}>
        {/* Screen area */}
        <div style={{ flex: 1, padding: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 108, height: 90,
            background: active ? "#0a1a0f" : "#0a0a0a",
            borderRadius: 8,
            border: "3px solid #222",
            position: "relative", overflow: "hidden",
            boxShadow: active ? "inset 0 0 20px rgba(0,255,136,0.1), 0 0 8px rgba(0,255,136,0.15)" : "inset 0 0 10px rgba(0,0,0,0.8)",
          }}>
            {/* Screen curvature */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 8,
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
              pointerEvents: "none", zIndex: 10,
            }} />
            {active && (
              <>
                <div style={{
                  position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                }} />
                <div style={{
                  position: "absolute", left: 0, right: 0,
                  top: `${(scanline / 24) * 100}%`, height: 3,
                  background: "rgba(0,255,136,0.08)", zIndex: 6, pointerEvents: "none",
                }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                  {character === "charizard" ? <PixelCharizard active /> : <PixelUnicorn active />}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Control panel */}
        <div style={{
          width: 28, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10, paddingRight: 4,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #888, #444)",
            border: "2px solid #333",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)",
          }}>
            <div style={{ width: 2, height: 6, background: "#222", margin: "2px auto 0" }} />
          </div>
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #777, #3a3a3a)",
            border: "2px solid #333",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.4)",
          }}>
            <div style={{ width: 1.5, height: 4, background: "#222", margin: "1.5px auto 0" }} />
          </div>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: active ? "#00ff44" : "#440000",
            boxShadow: active ? "0 0 6px #00ff44" : "none",
          }} />
        </div>
      </div>

      {/* Woodgrain bottom */}
      <div style={{
        position: "absolute", top: 126, left: 4, width: 152, height: 14,
        background: "linear-gradient(90deg, #5C3A1E, #7A4E2D, #5C3A1E, #6B4423, #5C3A1E)",
        borderRadius: "0 0 6px 6px",
        border: "2px solid #4a3015", borderTop: "none",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 3, paddingTop: 3 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: 8, height: 1.5, background: "#3a2010", borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* TV feet */}
      <div style={{ position: "absolute", bottom: -4, left: 25, width: 14, height: 6, background: "#3a3a3a", borderRadius: "0 0 3px 3px" }} />
      <div style={{ position: "absolute", bottom: -4, right: 25, width: 14, height: 6, background: "#3a3a3a", borderRadius: "0 0 3px 3px" }} />

      {/* Reset */}
      {active && (
        <button
          onClick={onReset}
          style={{
            position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Press Start 2P', monospace", fontSize: 6,
            background: "#2a2a2a", color: "#888",
            border: "2px solid #444", padding: "3px 10px", cursor: "pointer",
          }}
        >
          RESET
        </button>
      )}
    </div>
  );
}

// --- Kid Panel ---
function KidPanel({ name, nameColors, accentColor, character }) {
  const [filledStars, setFilledStars] = useState(new Set());
  const [explodingIndex, setExplodingIndex] = useState(-1);
  const [tvUnlocked, setTvUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const storageKey = `stars:${name.toLowerCase()}`;

  // Load saved stars on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(storageKey);
        if (result && result.value) {
          const data = JSON.parse(result.value);
          const restored = new Set(data.stars || []);
          setFilledStars(restored);
          if (restored.size === 5) {
            setTvUnlocked(true);
          }
        }
      } catch (e) {
        // No saved data yet, start fresh
      }
      setLoaded(true);
    })();
  }, []);

  // Save whenever stars change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set(storageKey, JSON.stringify({ stars: [...filledStars] }));
      } catch (e) {
        console.error("Save failed:", e);
      }
    })();
  }, [filledStars, loaded]);

  const handleStarClick = (i) => {
    if (tvUnlocked) return;
    setFilledStars((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
        setExplodingIndex(i);
        setTimeout(() => setExplodingIndex(-1), 800);
      }
      if (next.size === 5) {
        setTimeout(() => {
          setTvUnlocked(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }, 500);
      }
      return next;
    });
  };

  const handleReset = () => {
    setFilledStars(new Set());
    setTvUnlocked(false);
    setShowConfetti(false);
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", padding: "12px 4px 40px", position: "relative",
    }}>
      {showConfetti && (
        <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none", overflow: "hidden" }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 5 + Math.random() * 6, height: 5 + Math.random() * 6,
              background: ["#FFD700", "#FF6B35", "#FF1493", "#00FFFF", "#7FFF00", "#FFF"][i % 6],
              left: `${Math.random() * 100}%`, top: -10,
              animation: `confettiFall ${1.5 + Math.random() * 2}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.8}s`,
              imageRendering: "pixelated",
            }} />
          ))}
        </div>
      )}

      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 11,
        background: `linear-gradient(90deg, ${nameColors[0]}, ${nameColors[1]})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: `drop-shadow(0 0 6px ${nameColors[0]}55)`,
        marginBottom: 14, letterSpacing: 1,
      }}>
        {name.toUpperCase()}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <PixelStar key={i} filled={filledStars.has(i)} onClick={() => handleStarClick(i)} exploding={explodingIndex === i} />
        ))}
      </div>

      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 7,
        color: tvUnlocked ? "#FFD700" : "#555", marginBottom: 14,
      }}>
        {tvUnlocked ? "★ TV TIME! ★" : `${filledStars.size}/5`}
      </div>

      <RetroTV active={tvUnlocked} character={character} onReset={handleReset} />
    </div>
  );
}

// --- Main App ---
export default function StarTracker() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      backgroundImage: "radial-gradient(circle at 30% 20%, #1a0a2e22 0%, transparent 50%), radial-gradient(circle at 70% 80%, #0a1a2e22 0%, transparent 50%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "24px 4px 20px",
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes confettiFall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(300px) rotate(720deg);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>

      <div style={{
        fontSize: 18, color: "#FFD700",
        textShadow: "0 0 14px #FFD70055, 2px 2px 0 #442200",
        marginBottom: 20, letterSpacing: 3, textAlign: "center",
        animation: "float 3s ease-in-out infinite",
      }}>
        ★ STAR TRACKER ★
      </div>

      <div style={{
        width: "90%", maxWidth: 450, height: 2, marginBottom: 8,
        background: "linear-gradient(90deg, transparent, #FFD70033, transparent)",
      }} />

      <div style={{ display: "flex", width: "100%", maxWidth: 420, gap: 4 }}>
        <KidPanel name="Emerson" nameColors={["#FF2222", "#4488FF"]} accentColor="#00CCFF" character="charizard" />
        <div style={{ width: 2, background: "linear-gradient(180deg, transparent, #ffffff11, transparent)", alignSelf: "stretch" }} />
        <KidPanel name="Avery" nameColors={["#FF69B4", "#AA44FF"]} accentColor="#FF69B4" character="unicorn" />
      </div>
    </div>
  );
}
