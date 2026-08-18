import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft() {
  const target = new Date("2026-09-05T00:00:00+05:30").getTime();
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
        style={{ color: "#2D5016", fontSize: "clamp(18px,3vw,28px)" }}
      >
        Counting Down to Forever
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {boxes.map((b, i) => (
          <motion.div
            key={b.label}
            className="text-center"
            style={{
              background: "#fff",
              border: "1.5px solid #2D5016",
              borderRadius: 12,
              padding: "16px 24px",
              minWidth: 80,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="font-serif font-light"
              style={{
                color: "#C9A84C",
                fontSize: "clamp(36px,6vw,56px)",
                lineHeight: 1,
              }}
            >
              {pad(b.val)}
            </div>
            <div className="mt-1 text-xs tracking-widest" style={{ color: "#aaa" }}>
              {b.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
