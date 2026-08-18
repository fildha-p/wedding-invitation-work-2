import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const events = [
  {
    name: "Haldi",
    date: "September 1, 2026 · 4:00 PM onwards",
    note: "At Groom's Residence",
    swatches: ["#F4C542", "#F48FB1", "#FF8C42"],
    swatchLabel: "Yellow · Pink · Orange",
  },
  {
    name: "Sangeet",
    date: "September 2, 2026 · 6:00 PM onwards",
    note: "Venue TBD",
    swatches: ["#1A237E", "#212121"],
    swatchLabel: "Dark Blue · Black",
  },
  {
    name: "Wedding Ceremony",
    date: "September 5, 2026 · [Time TBD]",
    note: "CIAL Convention Centre, Nedumbassery",
    swatches: [],
    swatchLabel: "Dress code to be announced",
  },
];

export default function ProgramTimeline() {
  return (
    <section className="px-6 py-24 text-center" style={{ background: "#fff" }}>
      <h2
        className="font-serif font-light italic"
        style={{ color: "#2D5016", fontSize: "clamp(28px,5vw,44px)" }}
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
              <div className="mt-1 h-3.5 w-3.5 rounded-full" style={{ background: "#2D5016" }} />
              {i < events.length - 1 && (
                <div
                  className="mt-1 flex-1"
                  style={{ width: 1.5, background: "#C9A84C", minHeight: 48 }}
                />
              )}
            </div>
            <div>
              <h3
                className="font-serif font-light"
                style={{ color: "#2D5016", fontSize: 22 }}
              >
                {ev.name}
              </h3>
              <p className="mt-0.5 text-sm" style={{ color: "#888" }}>
                {ev.date}
              </p>
              <p className="mt-0.5 text-sm italic" style={{ color: "#aaa" }}>
                {ev.note}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {ev.swatches.map((c) => (
                  <div
                    key={c}
                    className="h-5 w-5 rounded-full border border-black/10"
                    style={{ background: c }}
                  />
                ))}
                <span className="text-xs" style={{ color: "#999" }}>
                  {ev.swatchLabel}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
