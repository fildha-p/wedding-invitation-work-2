import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "exterior" | "door" | "fly" | "arrival";

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("exterior");

  function handleTap() {
    if (phase !== "exterior") return;
    setPhase("door");
    setTimeout(() => setPhase("fly"), 1200);
    setTimeout(() => setPhase("arrival"), 6000);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <AnimatePresence>
        {phase === "exterior" && (
          <motion.div
            className="absolute inset-0"
            onClick={handleTap}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/assets/couple1.png"
              alt="Exterior"
              className="h-full w-full object-cover object-center"
              animate={{ scale: 1.08 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <p
                className="text-center text-white"
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
              className="absolute font-serif italic tracking-widest"
              style={{
                bottom: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(14px, 2vw, 18px)",
                letterSpacing: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                animation: "pulse 2s infinite",
                color: "#5C1A1A",
                textShadow: "1px 2px 8px rgba(255,255,255,0.9)",
                whiteSpace: "nowrap",
              }}
            >
              ✦ tap the door to open ✦
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
            />
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
              initial={{ scale: 1 }}
              animate={{ scale: 1.8 }}
              transition={{ duration: 4.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
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
            />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p
                className="mb-4 font-serif italic tracking-widest"
                style={{ color: "#C9A84C", fontSize: "clamp(13px,3vw,18px)" }}
              >
                ✦ You're Invited ✦
              </p>
              <h1
                className="text-center"
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
              <p
                className="mt-6 font-serif tracking-widest text-white/90"
                style={{ fontSize: "clamp(13px,2.5vw,18px)" }}
              >
                Saturday · 5 September 2026
              </p>
              <p
                className="mt-1 font-serif tracking-widest"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(12px,2vw,15px)",
                }}
              >
                1202 ചിങ്ങം 20
              </p>
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
                Enter ↓
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
    </div>
  );
}
