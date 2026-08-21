import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const events = [
  {
    name: "Haldi",
    date: "September 1, 2026 · 4:00 PM onwards",
    note: "Manadiyil House",
  },
  {
    name: "Sangeet",
    date: "September 2, 2026 · 6:00 PM onwards",
    note: "Manadiyil House",
  },
  {
    name: "Wedding Ceremony",
    date: "5 September 2026",
    malayalamDate: "1202 Chingam 20",
    time: "Muhurtham · 10:30 to 11:30 AM",
    note: "CIAL Convention Centre, Nedumbassery",
  },
];

export default function ProgramTimeline() {
  return (
    <section className="px-6 py-24 text-center" style={{ background: "#fff" }}>
      <h2
        className="font-serif font-light italic"
        style={{
          color: "#D9C48F",
          fontSize: "clamp(28px,5vw,44px)",
          textShadow: "0 2px 16px rgba(20,15,10,0.68)",
        }}
      >
        Program Timeline
      </h2>
      <SectionDivider />
      <div className="mx-auto max-w-lg text-left">
        {events.map((ev, i) => (
          <motion.div
            key={ev.name}
            className="mb-10 flex gap-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <div className="flex flex-shrink-0 flex-col items-center">
              <motion.div
                className="mt-1 h-3.5 w-3.5 rounded-full"
                style={{
                  background: "#B8924A",
                  boxShadow: "0 0 14px rgba(217,196,143,0.45)",
                }}
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
              />
              {i < events.length - 1 && (
                <motion.div
                  className="mt-1 flex-1 origin-top"
                  style={{
                    width: 1.5,
                    background: "linear-gradient(to bottom, #D9C48F, rgba(217,196,143,0.28))",
                    minHeight: 48,
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 + 0.2 }}
                />
              )}
            </div>
            <div>
              <h3
                className="font-serif font-light"
                style={{ color: "#D9C48F", fontSize: 22, textShadow: "0 2px 10px rgba(20,15,10,0.6)" }}
              >
                {ev.name}
              </h3>
              <p className="mt-0.5 text-sm" style={{ color: "#E6DDC3" }}>
                {ev.date}
              </p>
              {"malayalamDate" in ev && (
                <p className="mt-0.5 text-sm" style={{ color: "#E6DDC3" }}>
                  {ev.malayalamDate}
                </p>
              )}
              {"time" in ev && (
                <p className="mt-0.5 text-sm" style={{ color: "#F1E4B8" }}>
                  {ev.time}
                </p>
              )}
              <p className="mt-0.5 text-sm italic" style={{ color: "#E6DDC3" }}>
                {ev.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
