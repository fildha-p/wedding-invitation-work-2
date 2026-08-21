import { type CSSProperties, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "exterior" | "door" | "fly" | "arrival";

interface Props {
  onComplete: () => void;
}

interface BronzeUmberOverlayProps {
  strong?: boolean;
}

const introParticles = Array.from({ length: 18 }, (_, index) => ({
  x: 22 + ((index * 17) % 56),
  y: 28 + ((index * 23) % 28),
  delay: index * 0.18,
  size: 3 + (index % 3),
}));

const introPetals = Array.from({ length: 14 }, (_, index) => ({
  left: 4 + ((index * 11) % 92),
  delay: index * -0.7,
  duration: 9 + (index % 5),
  drift: index % 2 === 0 ? 52 : -44,
  size: 10 + (index % 4) * 3,
}));

const dustMotes = Array.from({ length: 20 }, (_, index) => ({
  x: 8 + ((index * 13) % 86),
  y: 14 + ((index * 19) % 72),
  delay: index * 0.24,
  duration: 4.6 + (index % 5) * 0.7,
}));

function BronzeUmberOverlay({ strong = false }: BronzeUmberOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(217,196,143,${strong ? 0.18 : 0.12}) 0%, rgba(217,196,143,0) 58%),
          linear-gradient(to bottom, rgba(20,15,10,${strong ? 0.22 : 0.1}) 0%, rgba(20,15,10,${strong ? 0.36 : 0.18}) 100%),
          linear-gradient(135deg, rgba(58,36,22,${strong ? 0.22 : 0.14}), rgba(123,94,46,${strong ? 0.18 : 0.1}))
        `,
        mixBlendMode: "multiply",
      }}
    />
  );
}

function IntroGoldParticles() {
  return (
    <div className="intro-gold-particles" aria-hidden="true">
      {introParticles.map((particle, index) => (
        <span
          key={index}
          className="intro-gold-particle"
          style={
            {
              "--particle-x": `${particle.x}%`,
              "--particle-y": `${particle.y}%`,
              "--particle-delay": `${particle.delay}s`,
              "--particle-size": `${particle.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function IntroPetalField() {
  return (
    <div className="intro-petal-field" aria-hidden="true">
      {introPetals.map((petal, index) => (
        <span
          key={index}
          className="intro-petal"
          style={
            {
              "--intro-petal-left": `${petal.left}%`,
              "--intro-petal-delay": `${petal.delay}s`,
              "--intro-petal-duration": `${petal.duration}s`,
              "--intro-petal-drift": `${petal.drift}px`,
              "--intro-petal-size": `${petal.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function DoorHandleGlow() {
  return (
    <motion.div
      className="door-handle-glow"
      aria-hidden="true"
      whileHover={{ scale: 1.14, opacity: 1 }}
      whileTap={{ scale: 1.24, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
    />
  );
}

function HallAtmosphere() {
  return (
    <div className="hall-atmosphere" aria-hidden="true">
      <div className="hall-light-ray hall-light-ray-left" />
      <div className="hall-light-ray hall-light-ray-right" />
      {dustMotes.map((mote, index) => (
        <span
          key={index}
          className="hall-dust-mote"
          style={
            {
              "--dust-x": `${mote.x}%`,
              "--dust-y": `${mote.y}%`,
              "--dust-delay": `${mote.delay}s`,
              "--dust-duration": `${mote.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("exterior");
  const [isOpening, setIsOpening] = useState(false);

  function handleTap() {
    if (phase !== "exterior") return;
    setIsOpening(true);
    setTimeout(() => setPhase("door"), 260);
    setTimeout(() => setPhase("fly"), 1200);
    setTimeout(() => setPhase("arrival"), 5000);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <AnimatePresence>
        {phase === "exterior" && (
          <motion.div
            className="absolute inset-0"
            onClick={handleTap}
            initial={{ opacity: 1 }}
            animate={
              isOpening
                ? {
                    scale: [1, 1.012, 1.004],
                    x: [0, -5, 4, -2, 0],
                    y: [0, 2, -1, 0],
                  }
                : { scale: 1, x: 0, y: 0 }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: isOpening ? 0.26 : 0.8 }}
          >
            <motion.img
              src="/assets/couple1.png"
              alt="Exterior"
              className="h-full w-full object-cover object-center"
              style={{ filter: "sepia(0.14) saturate(0.9) contrast(0.98)" }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            <BronzeUmberOverlay />
            <IntroPetalField />
            <DoorHandleGlow />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
              <IntroGoldParticles />
              <p
                className="intro-title-shimmer text-center text-white"
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  fontSize: "clamp(60px, 10vw, 120px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#C8973A",
                  textShadow: "1px 2px 8px rgba(255,255,255,0.6)",
                  letterSpacing: "0.02em",
                }}
              >
                You're Invited
              </p>
            </div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleTap();
              }}
              className="absolute z-10 font-serif italic tracking-widest"
              style={{
                bottom: "54px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(15px, 2vw, 20px)",
                letterSpacing: "3.5px",
                background: "rgba(20,15,10,0.42)",
                border: "1px solid rgba(217,196,143,0.65)",
                borderRadius: "999px",
                padding: "10px 22px",
                cursor: "pointer",
                animation: "pulse 2s infinite",
                color: "#F3E7C0",
                backdropFilter: "blur(6px)",
                boxShadow: "0 8px 28px rgba(20,15,10,0.28)",
                textShadow: "0 2px 10px rgba(20,15,10,0.85)",
                whiteSpace: "nowrap",
              }}
            >
              tap the door to open
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === "door" || phase === "fly") && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/assets/couple2.png"
              alt="Door open"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{ filter: "sepia(0.14) saturate(0.9) contrast(0.98)" }}
            />
            <BronzeUmberOverlay />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "fly" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/assets/couple3.png"
              alt="Grand hall interior"
              className="h-full w-full object-cover object-center"
              style={{ filter: "sepia(0.16) saturate(0.88) contrast(0.98)" }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.8 }}
              transition={{ duration: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <BronzeUmberOverlay />
            <HallAtmosphere />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "arrival" && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/assets/couple4.png"
              alt="Floral arch arrival"
              className="h-full w-full object-cover object-center"
              style={{ filter: "sepia(0.14) saturate(0.9) contrast(0.98)" }}
            />
            <BronzeUmberOverlay strong />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(20,15,10,0.16), rgba(20,15,10,0.34))",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p
                className="mb-4 font-serif italic tracking-widest"
                style={{ color: "#C9A84C", fontSize: "clamp(13px,3vw,18px)" }}
              >
                You're Invited
              </p>
              <h1
                className="arrival-name-shimmer text-center"
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  fontSize: "clamp(60px,10vw,110px)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                  color: "#C8973A",
                  textShadow: "1px 2px 6px rgba(0,0,0,0.25)",
                }}
              >
                Dr Aiswarya
                <br />
                <span>&</span>
                <br />
                Dr Anugrah
              </h1>
              <motion.button
                onClick={onComplete}
                className="mt-10 px-10 py-4 font-serif text-lg italic tracking-widest"
                style={{
                  border: "1.5px solid #C9A84C",
                  color: "#C9A84C",
                  background: "transparent",
                  cursor: "pointer",
                }}
                whileHover={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                Enter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
    </div>
  );
}
