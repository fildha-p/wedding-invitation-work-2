import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft() {
  const target = new Date("2026-09-19T19:00:00+04:00").getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const boxes = [
    { label: "DAYS", val: time.d },
    { label: "HOURS", val: time.h },
    { label: "MINUTES", val: time.m },
    { label: "SECONDS", val: time.s },
  ];

  return (
    <section className="px-6 py-16 text-center" style={{ background: "#FAF7F2" }}>
      <p
        className="mb-2 font-serif font-light italic"
        style={{
          color: "#D9C48F",
          fontSize: "clamp(18px,3vw,28px)",
          textShadow: "0 2px 16px rgba(20,15,10,0.68)",
        }}
      >
        Counting Down to the Reception
      </p>
      <div className="mt-6 flex flex-nowrap justify-center gap-2 sm:gap-3">
        {boxes.map((b, i) => (
          <motion.div
            key={b.label}
            className="countdown-card text-center"
            style={{
              background: "rgba(20,15,10,0.52)",
              border: "1.5px solid rgba(217,196,143,0.58)",
              borderRadius: 12,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              key={`${b.label}-${b.val}`}
              className="font-serif font-light"
              style={{
                color: "#D9C48F",
                fontSize: "clamp(26px,8vw,56px)",
                lineHeight: 1,
              }}
              initial={{ rotateX: -28, opacity: 0.75, y: -4 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {pad(b.val)}
            </motion.div>
            <div className="countdown-label mt-1 text-xs tracking-widest" style={{ color: "#E6DDC3" }}>
              {b.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
